const express = require('express');
const router = express.Router();
const fetchJobs = require('../utils/fetchJobs');
const summarizeJob = require('../utils/summarizeJob');

// Track metrics across all requests
let globalMetrics = {
  totalRuntime: 0,
  totalTokens: 0,
  totalCost: 0,
  requestCount: 0,
  lastRefreshTime: null,
};

/**
 * Main route for fetching jobs with auto-summarization
 * Accepts a keyword parameter for job search
 * Returns jobs with summaries and metrics
 */
router.post('/', async (req, res) => {
  const { keyword } = req.body;
  const startTime = Date.now();
  
  try {
    // Fetch jobs from API
    const jobs = await fetchJobs(keyword);
    
    // Process each job in parallel to generate summaries
    const jobsWithSummaries = await Promise.all(
      jobs.map(async (job) => {
        try {
          // Generate summary for each job
          const { summary, metrics } = await summarizeJob(job);
          
          // Update global metrics
          globalMetrics.totalRuntime += metrics.runtime;
          globalMetrics.totalTokens += metrics.tokensUsed;
          globalMetrics.totalCost += metrics.cost;
          globalMetrics.requestCount++;
          
          // Return job with summary
          return {
            ...job,
            summary,
            metrics,
          };
        } catch (error) {
          console.error(`Error summarizing job ${job.id}:`, error);
          return {
            ...job,
            summary: "Failed to generate summary.",
            metrics: { runtime: 0, tokensUsed: 0, cost: 0 }
          };
        }
      })
    );
    
    // Calculate total operation metrics
    const endTime = Date.now();
    const operationRuntime = endTime - startTime;
    globalMetrics.lastRefreshTime = new Date().toISOString();
    
    res.json({
      jobs: jobsWithSummaries,
      metrics: {
        operationRuntime,
        globalMetrics,
      },
    });
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

/**
 * Route to get current job metrics
 * Returns runtime, tokens used, and cost metrics for job operations
 */
router.get('/metrics', (req, res) => {
  res.json({ metrics: globalMetrics });
});

module.exports = router;

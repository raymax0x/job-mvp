const express = require('express');
const router = express.Router();
const summarizeJob = require('../utils/summarizeJob');

// Track metrics across all requests
let globalMetrics = {
  totalRuntime: 0,
  totalTokens: 0,
  totalCost: 0,
  requestCount: 0,
};

/**
 * Route to summarize a job posting
 * Accepts a job object in request body
 * Returns the summary and metrics
 */
router.post('/', async (req, res) => {
  console.log('POST /api/summarize - Request received:', req.body);
  const { job } = req.body;

  if (!job || !job.description) {
    return res
      .status(400)
      .json({ error: 'Job data with description is required' });
  }

  try {
    const { summary, metrics } = await summarizeJob(job);

    // Update global metrics
    globalMetrics.totalRuntime += metrics.runtime;
    globalMetrics.totalTokens += metrics.tokensUsed;
    globalMetrics.totalCost += metrics.cost;
    globalMetrics.requestCount++;

    res.json({
      summary,
      metrics,
      globalMetrics,
    });
  } catch (err) {
    console.error('Error in summarize route:', err.message);
    res.status(500).json({ error: 'Failed to summarize job' });
  }
});

/**
 * Route to get current metrics
 * Returns runtime, tokens used, and cost metrics
 */
router.get('/metrics', (req, res) => {
  res.json({ metrics: globalMetrics });
});

module.exports = router;

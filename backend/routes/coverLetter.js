const express = require('express');
const router = express.Router();
const generateCoverLetter = require('../utils/generateCoverLetter');

// Track metrics across all requests
let globalMetrics = {
  totalRuntime: 0,
  totalTokens: 0,
  totalCost: 0,
  requestCount: 0,
};

/**
 * Main route for generating cover letters
 * Accepts job data to create a personalized cover letter paragraph
 * Returns cover letter and metrics
 */
router.post('/', async (req, res) => {
  const { job } = req.body;
  
  if (!job || !job.title || !job.summary) {
    return res
      .status(400)
      .json({ error: 'Job data with title and summary is required' });
  }

  try {
    // Generate cover letter for the job
    const { coverLetter, metrics } = await generateCoverLetter(job);
    
    // Update global metrics
    globalMetrics.totalRuntime += metrics.runtime;
    globalMetrics.totalTokens += metrics.tokensUsed;
    globalMetrics.totalCost += metrics.cost;
    globalMetrics.requestCount++;
    
    res.json({
      coverLetter,
      metrics,
      globalMetrics,
    });
  } catch (err) {
    console.error('Error in cover letter route:', err.message);
    res.status(500).json({ error: 'Failed to generate cover letter' });
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

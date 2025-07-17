const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

/**
 * Main route for fetching jobs with auto-summarization
 * Accepts a keyword parameter for job search
 * Returns jobs with summaries and metrics
 */
router.post('/', jobController.getJobs);

/**
 * Route to get current job metrics
 * Returns runtime, tokens used, and cost metrics for job operations
 */
router.get('/metrics', jobController.getMetrics);

/**
 * Route to reset all metrics
 * Clears all accumulated metrics and returns the reset metrics
 */
router.post('/reset-metrics', jobController.resetMetrics);

module.exports = router;

const express = require('express');
const router = express.Router();
const summarizeController = require('../controllers/summarizeController');

/**
 * Route to summarize a job posting
 * Accepts a job object in request body
 * Returns the summary and metrics
 */
router.post('/', summarizeController.generateSummary);

/**
 * Route to get current metrics
 * Returns runtime, tokens used, and cost metrics
 */
router.get('/metrics', summarizeController.getMetrics);

module.exports = router;

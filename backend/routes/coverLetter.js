const express = require('express');
const router = express.Router();
const coverLetterController = require('../controllers/coverLetterController');

/**
 * Main route for generating cover letters
 * Accepts job data to create a personalized cover letter paragraph
 * Returns cover letter and metrics
 */
router.post('/', coverLetterController.generateCoverLetter);

/**
 * Route to get current metrics
 * Returns runtime, tokens used, and cost metrics
 */
router.get('/metrics', coverLetterController.getMetrics);

module.exports = router;

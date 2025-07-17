/**
 * Summarize Controller
 * Handles HTTP requests for job summarization
 */
const summarizeService = require('../services/summarizeService');

/**
 * Generate a summary for a job
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function generateSummary(req, res) {
  console.log('Summarize controller - Request received:', req.body);
  const { job } = req.body;
  
  if (!job || !job.description) {
    return res
      .status(400)
      .json({ error: 'Missing job data or job description' });
  }
  
  try {
    const result = await summarizeService.generateSummary(job);
    res.json(result);
  } catch (err) {
    console.error('Error in summarize controller:', err.message);
    res.status(500).json({ error: 'Failed to summarize job' });
  }
}

/**
 * Get summarization metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function getMetrics(req, res) {
  res.json(summarizeService.getMetrics());
}

module.exports = {
  generateSummary,
  getMetrics,
};

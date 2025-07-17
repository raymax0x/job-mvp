/**
 * Cover Letter Controller
 * Handles HTTP requests for cover letter generation
 */
const coverLetterService = require('../services/coverLetterService');

/**
 * Generate a cover letter for a job
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function generateCoverLetter(req, res) {
  const { job } = req.body;
  
  if (!job || !job.title || !job.summary) {
    return res
      .status(400)
      .json({ error: 'Missing job data, title, or summary' });
  }
  
  try {
    const result = await coverLetterService.createCoverLetter(job);
    res.json(result);
  } catch (err) {
    console.error('Error in cover letter controller:', err.message);
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
}

/**
 * Get cover letter generation metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function getMetrics(req, res) {
  res.json(coverLetterService.getMetrics());
}

module.exports = {
  generateCoverLetter,
  getMetrics,
};

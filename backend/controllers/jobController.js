/**
 * Job Controller
 * Handles HTTP requests for job-related operations
 */
const jobService = require('../services/jobService');

/**
 * Get jobs based on keyword search
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getJobs(req, res) {
  const { keyword } = req.body;
  
  try {
    const result = await jobService.getJobs(keyword);
    res.json(result);
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

/**
 * Get job metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function getMetrics(req, res) {
  res.json(jobService.getMetrics());
}

/**
 * Reset job metrics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function resetMetrics(req, res) {
  res.json(jobService.resetMetrics());
}

module.exports = {
  getJobs,
  getMetrics,
  resetMetrics,
};

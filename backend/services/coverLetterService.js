/**
 * Cover Letter Service
 * Handles business logic for cover letter generation
 */
const generateCoverLetter = require('../utils/generateCoverLetter');

// Track metrics across all requests
let globalMetrics = {
  totalRuntime: 0,
  totalTokens: 0,
  totalCost: 0,
  requestCount: 0,
};

/**
 * Generate a cover letter for a job
 * @param {Object} job - Job to generate cover letter for
 * @returns {Object} Cover letter and metrics
 */
async function createCoverLetter(job) {
  try {
    const { coverLetter, metrics } = await generateCoverLetter(job);
    
    // Update global metrics
    globalMetrics.totalRuntime += metrics.runtime;
    globalMetrics.totalTokens += metrics.tokensUsed;
    globalMetrics.totalCost += metrics.cost;
    globalMetrics.requestCount++;
    
    return {
      coverLetter,
      metrics,
      globalMetrics,
    };
  } catch (err) {
    console.error('Error in cover letter service:', err.message);
    throw new Error('Failed to generate cover letter');
  }
}

/**
 * Get current metrics
 * @returns {Object} Current metrics
 */
function getMetrics() {
  return { metrics: globalMetrics };
}

module.exports = {
  createCoverLetter,
  getMetrics,
};

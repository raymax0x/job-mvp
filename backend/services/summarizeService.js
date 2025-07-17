/**
 * Summarize Service
 * Handles business logic for job summarization operations
 */
const summarizeJob = require('../utils/summarizeJob');

// Track metrics across all requests
let globalMetrics = {
  totalRuntime: 0,
  totalTokens: 0,
  totalCost: 0,
  requestCount: 0,
};

/**
 * Generate summary for a job
 * @param {Object} job - Job to summarize
 * @returns {Object} Summary and metrics
 */
async function generateSummary(job) {
  try {
    const { summary, metrics } = await summarizeJob(job);
    
    // Update global metrics
    globalMetrics.totalRuntime += metrics.runtime;
    globalMetrics.totalTokens += metrics.tokensUsed;
    globalMetrics.totalCost += metrics.cost;
    globalMetrics.requestCount++;
    
    return {
      summary,
      metrics,
      globalMetrics,
    };
  } catch (err) {
    console.error('Error in summarize service:', err.message);
    throw new Error('Failed to summarize job');
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
  generateSummary,
  getMetrics,
};

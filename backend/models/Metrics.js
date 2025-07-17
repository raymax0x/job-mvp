/**
 * Metrics Model
 * Defines data structures for application metrics
 */

/**
 * Create a new metrics object with default values
 * @param {Object} initialValues - Optional initial values
 * @returns {Object} New metrics object
 */
function createMetrics(initialValues = {}) {
  return {
    totalRuntime: initialValues.totalRuntime || 0,
    totalTokens: initialValues.totalTokens || 0,
    totalCost: initialValues.totalCost || 0,
    requestCount: initialValues.requestCount || 0,
    lastRefreshTime: initialValues.lastRefreshTime || null,
  };
}

module.exports = {
  createMetrics,
};

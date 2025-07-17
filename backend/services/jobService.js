/**
 * Job Service
 * Handles business logic for job-related operations
 */
const fetchJobs = require('../utils/fetchJobs');
const summarizeJob = require('../utils/summarizeJob');

// Global cache for job summaries
const summaryCache = new Map();

// Track metrics across all requests
let globalMetrics = {
  totalRuntime: 0,
  totalTokens: 0,
  totalCost: 0,
  requestCount: 0,
  lastRefreshTime: null,
};

/**
 * Fetches and processes jobs with summaries
 * @param {string} keyword - Search keyword
 * @returns {Object} Jobs and metrics
 */
async function getJobs(keyword) {
  const startTime = Date.now();
  
  // Fetch jobs from API
  const jobs = await fetchJobs(keyword);
  
  // Process jobs in batches to control concurrency
  const batchSize = 5; // Process 5 jobs concurrently
  const jobsWithSummaries = [];
  
  // Process in smaller batches for controlled parallelization
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);
    
    // Process this batch in parallel
    const batchResults = await Promise.all(
      batch.map(async (job) => {
        try {
          // Check cache first
          const cacheKey = `${job.id}-summary`;
          if (summaryCache.has(cacheKey)) {
            // Use cached result
            const cachedResult = summaryCache.get(cacheKey);
            globalMetrics.requestCount++; // Still count as a request for metrics
            return cachedResult;
          }
          
          // Generate summary for job
          const { summary, metrics } = await summarizeJob(job);
          
          // Update global metrics
          globalMetrics.totalRuntime += metrics.runtime;
          globalMetrics.totalTokens += metrics.tokensUsed;
          globalMetrics.totalCost += metrics.cost;
          globalMetrics.requestCount++;
          
          // Prepare result
          const result = {
            id: job.id,
            title: job.title,
            description: job.description,
            company: job.company
              ? { display_name: job.company.display_name }
              : null,
            location: job.location
              ? { display_name: job.location.display_name }
              : null,
            created: job.created,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            url: job.redirect_url,
            summary,
            metrics,
          };
          
          // Cache result for future use
          summaryCache.set(cacheKey, result);
          
          return result;
        } catch (error) {
          console.error(`Error summarizing job ${job.id}:`, error);
          return {
            id: job.id,
            title: job.title,
            description: job.description,
            company: job.company
              ? { display_name: job.company.display_name }
              : null,
            location: job.location
              ? { display_name: job.location.display_name }
              : null,
            created: job.created,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            url: job.redirect_url,
            summary: 'Failed to generate summary.',
            metrics: { runtime: 0, tokensUsed: 0, cost: 0 },
          };
        }
      })
    );
    
    // Add batch results to main array
    jobsWithSummaries.push(...batchResults);
  }
  
  // Calculate total operation metrics
  const endTime = Date.now();
  const operationRuntime = endTime - startTime;
  globalMetrics.lastRefreshTime = new Date().toISOString();
  
  return {
    jobs: jobsWithSummaries,
    metrics: {
      operationRuntime,
      globalMetrics,
    },
  };
}

/**
 * Get current job metrics
 * @returns {Object} Current metrics
 */
function getMetrics() {
  return { metrics: globalMetrics };
}

/**
 * Reset all metrics to zero
 * @returns {Object} Reset metrics
 */
function resetMetrics() {
  // Reset all metrics to zero
  globalMetrics = {
    totalRuntime: 0,
    totalTokens: 0,
    totalCost: 0,
    requestCount: 0,
    lastRefreshTime: new Date().toISOString(),
  };
  
  summaryCache.clear();
  
  return {
    success: true,
    message: 'Metrics reset successfully',
    metrics: globalMetrics,
  };
}

module.exports = {
  getJobs,
  getMetrics,
  resetMetrics,
};

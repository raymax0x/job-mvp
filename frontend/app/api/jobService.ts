/**
 * Job Service for interacting with the backend API
 */

// Adjust the API URL based on your environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

/**
 * Fetch jobs with summaries from the API
 * @param keyword - Search keyword for jobs
 */
export async function fetchJobs(keyword: string = 'Full-Stack Engineer') {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keyword }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching jobs: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw error;
  }
}

/**
 * Generate a cover letter for a specific job
 * @param job - Job object with title, company, and summary
 */
export async function generateCoverLetter(job: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/cover-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job }),
    });

    if (!response.ok) {
      throw new Error(`Error generating cover letter: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to generate cover letter:', error);
    throw error;
  }
}

/**
 * Get metrics for job operations
 */
export async function getJobMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/metrics`);

    if (!response.ok) {
      throw new Error(`Error fetching metrics: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch job metrics:', error);
    throw error;
  }
}

/**
 * Get metrics for cover letter operations
 */
export async function getCoverLetterMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/cover-letter/metrics`);

    if (!response.ok) {
      throw new Error(
        `Error fetching cover letter metrics: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch cover letter metrics:', error);
    throw error;
  }
}

/**
 * Reset all job metrics
 * This will clear all accumulated metrics data
 */
export async function resetMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/reset-metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error resetting metrics: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to reset metrics:', error);
    throw error;
  }
}

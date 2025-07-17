/**
 * Centralized type definitions for Job-MVP application
 */

/**
 * Job data structure returned from the API
 */
export interface Job {
  id: string;
  title: string;
  description: string;
  company: { display_name: string } | null;
  location: { display_name: string } | null;
  created: string;
  salary_min: number;
  salary_max: number;
  summary: string;
  url: string;
}

/**
 * Props for the JobTable component
 */
export interface JobTableProps {
  jobs: Job[];
  loading: boolean;
}

/**
 * Global metrics collected during job operations
 */
export interface Metrics {
  totalRuntime?: number;
  totalTokens?: number;
  totalCost?: number;
  requestCount?: number;
  lastRefreshTime?: string;
}

/**
 * Application metrics structure
 */
export interface AppMetrics {
  totalJobs?: number;
  summarizedJobs?: number;
  apiCalls?: number;
  tokensUsed?: number;
  costIncurred?: number;
  operationRuntime?: number;
  globalMetrics?: Metrics;
}

/**
 * Props for the MetricsDisplay component
 */
export interface MetricsDisplayProps {
  metrics: AppMetrics;
}

/**
 * Response structure for the jobs API
 */
export interface JobsApiResponse {
  jobs: Job[];
  metrics: AppMetrics;
}

/**
 * Response structure for the cover letter API
 */
export interface CoverLetterApiResponse {
  coverLetter: string;
  metrics?: {
    tokensUsed: number;
    processingTime: number;
    costIncurred: number;
  };
}

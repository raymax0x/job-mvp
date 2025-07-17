import { create } from 'zustand';
import { Job, AppMetrics } from '../types';
import { fetchJobs, resetMetrics } from '../api/jobService';

interface JobState {
  // Data states
  jobs: Job[];
  metrics: AppMetrics;
  
  // UI states
  loading: boolean;
  error: string;
  searchKeyword: string;
  location: string;
  
  // Actions
  setSearchKeyword: (keyword: string) => void;
  setLocation: (location: string) => void;
  searchJobs: () => Promise<void>;
  resetJobMetrics: () => Promise<void>;
}

export const useJobStore = create<JobState>((set, get) => ({
  // Initial state
  jobs: [],
  metrics: {},
  loading: false,
  error: '',
  searchKeyword: 'Full-Stack Engineer',
  location: '',
  
  // Action methods
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setLocation: (location) => set({ location }),
  
  searchJobs: async () => {
    set({ loading: true, error: '' });
    try {
      const response = await fetchJobs(get().searchKeyword);
      set({
        jobs: response.jobs || [],
        metrics: response.metrics || {},
        loading: false
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      set({ error: 'Error fetching jobs. Please try again.', loading: false });
    }
  },
  
  resetJobMetrics: async () => {
    try {
      await resetMetrics();
      set(state => ({
        metrics: {
          ...state.metrics,
          globalMetrics: {
            totalRuntime: 0,
            totalTokens: 0,
            totalCost: 0,
            requestCount: 0,
            lastRefreshTime: new Date().toISOString()
          }
        }
      }));
    } catch (error: unknown) {
      console.error('Error resetting metrics:', error);
      set({ error: 'Error resetting metrics. Please try again.' });
    }
  }
}));

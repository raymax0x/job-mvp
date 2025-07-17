import { create } from 'zustand';
import { Job } from '../types';
import { generateCoverLetter } from '../api/jobService';

interface JobTableState {
  // Table state
  expandedJobId: string | null;
  coverLetters: Record<string, string>;
  generatingCoverLetter: Record<string, boolean>;
  currentPage: number;
  jobsPerPage: number;
  
  // Actions
  toggleExpand: (jobId: string) => void;
  generateCoverLetterForJob: (job: Job) => Promise<void>;
  setPage: (page: number) => void;
}

export const useJobTableStore = create<JobTableState>((set, get) => ({
  // Initial state
  expandedJobId: null,
  coverLetters: {},
  generatingCoverLetter: {},
  currentPage: 1,
  jobsPerPage: 5,
  
  // Actions
  toggleExpand: (jobId: string) => set(state => ({
    expandedJobId: state.expandedJobId === jobId ? null : jobId
  })),
  
  generateCoverLetterForJob: async (job: Job) => {
    try {
      set(state => ({
        generatingCoverLetter: { 
          ...state.generatingCoverLetter, 
          [job.id]: true 
        }
      }));
      
      const response = await generateCoverLetter(job);
      
      set(state => ({
        coverLetters: {
          ...state.coverLetters,
          [job.id]: response.coverLetter
        },
        generatingCoverLetter: { 
          ...state.generatingCoverLetter, 
          [job.id]: false 
        }
      }));
    } catch (error: unknown) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter. Please try again.');
      
      set(state => ({
        generatingCoverLetter: { 
          ...state.generatingCoverLetter, 
          [job.id]: false 
        }
      }));
    }
  },
  
  setPage: (page: number) => set({ currentPage: page })
}));

'use client';

import { useState, useEffect } from 'react';
import JobTable from './components/JobTable';
import MetricsDisplay from './components/MetricsDisplay';
import { fetchJobs, resetMetrics } from './api/jobService';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [metrics, setMetrics] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('Full-Stack Engineer');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async (keyword = searchKeyword) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetchJobs(keyword);
      setJobs(response.jobs || []);
      setMetrics(response.metrics || {});
    } catch (error) {
      console.error('Error loading jobs:', error);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadJobs();
  };

  const handleRefresh = async () => {
    try {
      // First reset the metrics
      await resetMetrics();
      // Then load the jobs
      loadJobs();
    } catch (error) {
      console.error('Error refreshing data:', error);
      setError('Failed to refresh data. Please try again.');
    }
  };

  return (
    <main className='min-h-screen p-6 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with title and search form */}
        <div className='mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>Job Insights</h1>
              <p className='text-black  mt-1'>
                Find and analyze jobs that match your skills
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <button
                type='button'
                onClick={handleRefresh}
                className='px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 flex items-center gap-2 border border-blue-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.44-4.5M22 12.5a10 10 0 0 1-18.44 4.5' />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className='flex flex-col sm:flex-row gap-3'
          >
            <div className='relative flex-grow'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-gray-400'
                >
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.3-4.3' />
                </svg>
              </div>
              <input
                type='text'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className='text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Search for job titles, skills, or companies...'
              />
            </div>
            <button
              type='submit'
              className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm'
            >
              Search Jobs
            </button>
          </form>
        </div>

        {/* Display metrics if available */}
        {metrics && <MetricsDisplay metrics={metrics} />}

        {/* Error message */}
        {error && (
          <div className='bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm flex items-start'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 mt-0.5 flex-shrink-0'
            >
              <circle cx='12' cy='12' r='10' />
              <line x1='12' y1='8' x2='12' y2='12' />
              <line x1='12' y1='16' x2='12' y2='16' />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Jobs list */}
        <div className='mb-4'>
          <p className='text-gray-600'>
            {loading
              ? 'Loading jobs...'
              : jobs.length > 0
              ? `Found ${jobs.length} jobs matching "${searchKeyword}"`
              : 'No jobs found'}
          </p>
        </div>

        {/* Job Table */}
        <JobTable jobs={jobs} loading={loading} />

        {/* Attribution */}
        <div className='mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500'>
          <p>Powered by OpenAI GPT-3.5 and Adzuna Jobs API</p>
        </div>
      </div>
    </main>
  );
}

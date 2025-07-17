'use client';

import React, { useState } from 'react';
import Toast from './Toast';
import { Job, JobTableProps } from '../types';
import { useJobTableStore } from '../store/jobTableStore';

const JobTable: React.FC<JobTableProps> = ({ jobs, loading }) => {
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Use Zustand store instead of local state
  const {
    expandedJobId,
    coverLetters,
    generatingCoverLetter,
    currentPage,
    jobsPerPage,
    toggleExpand,
    generateCoverLetterForJob,
    setPage,
  } = useJobTableStore();

  // Calculate pagination info
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } catch (_error) {
      return dateString;
    }
  };

  // Format salary to readable format
  const formatSalary = (min: number, max: number) => {
    if (min === max) {
      return min ? `$${Math.round(min).toLocaleString()}` : 'Not specified';
    }
    return min && max
      ? `$${Math.round(min).toLocaleString()} - $${Math.round(
          max
        ).toLocaleString()}`
      : 'Not specified';
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center p-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto w-full'>
      {/* Toast notification */}
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type='success'
      />

      <div className='space-y-6'>
        <div className='grid gap-4'>
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'
            >
              <div
                className='p-5 cursor-pointer hover:bg-gray-50'
                onClick={() => toggleExpand(job.id)}
              >
                <div className='flex flex-wrap md:flex-nowrap justify-between'>
                  {/* Left: Job info */}
                  <div className='w-full md:w-3/5 pr-4'>
                    <div className='flex items-center space-x-3 mb-3'>
                      <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold'>
                        {job.company?.display_name?.[0] || 'J'}
                      </div>
                      <h3 className='text-lg font-semibold text-gray-800'>
                        {job.title}
                      </h3>
                    </div>

                    <div className='text-sm text-gray-600 mb-3'>
                      {job.company?.display_name || 'Unknown Company'} •{' '}
                      {job.location?.display_name || 'Unknown Location'}
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        {formatSalary(job.salary_min, job.salary_max)}
                      </span>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                        Posted {formatDate(job.created)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Metrics and button */}
                  <div className='w-full md:w-2/5 flex flex-col items-end justify-between mt-4 md:mt-0'>
                    <div className='mt-4'>
                      <a
                        href={job.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700'
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Job
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedJobId === job.id && (
                <div className='border-t border-gray-200 bg-gray-50 p-5'>
                  <div className='space-y-4'>
                    {/* Description section */}
                    <div>
                      <h4 className='font-semibold mb-2 text-gray-800'>
                        Description
                      </h4>
                      <p className='text-gray-700 whitespace-pre-wrap'>
                        {job.description}
                      </p>
                    </div>

                    {/* Summary section if available */}
                    {job.summary && (
                      <div>
                        <h4 className='font-semibold mb-2 text-gray-800'>
                          Summary
                        </h4>
                        <p className='text-gray-700'>{job.summary}</p>
                      </div>
                    )}

                    {/* Cover Letter section */}
                    <div>
                      {coverLetters[job.id] ? (
                        <div className='text-gray-700 p-4 border border-green-200 rounded-md mt-4'>
                          <div className='flex justify-between items-center mb-2'>
                            <h4 className='font-bold text-md'>Cover Letter:</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(
                                  coverLetters[job.id]
                                );
                                setToastMessage(
                                  'Cover letter copied to clipboard!'
                                );
                                setShowToast(true);
                              }}
                              className='px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 flex items-center gap-1'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                />
                              </svg>
                              Copy
                            </button>
                          </div>
                          <div className='bg-gray-50 p-4 rounded whitespace-pre-wrap'>
                            {coverLetters[job.id]}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            generateCoverLetterForJob(job);
                          }}
                          disabled={generatingCoverLetter[job.id]}
                          className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 flex items-center'
                        >
                          {generatingCoverLetter[job.id] ? (
                            <>
                              <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2'></div>
                              Generating...
                            </>
                          ) : (
                            'Generate Cover Letter'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className='flex justify-center my-6'>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='px-4 py-2 mx-1 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50'
              >
                Previous
              </button>
              <span className='px-4 py-2 mx-1 font-medium text-gray-800'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className='px-4 py-2 mx-1 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTable;

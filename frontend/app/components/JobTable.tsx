'use client';

import React, { useState } from 'react';
import { generateCoverLetter } from '../api/jobService';
// Using native Date formatting instead of date-fns

interface Job {
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

interface JobTableProps {
  jobs: Job[];
  loading: boolean;
}

const JobTable: React.FC<JobTableProps> = ({ jobs, loading }) => {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [coverLetters, setCoverLetters] = useState<Record<string, string>>({});
  const [generatingCoverLetter, setGeneratingCoverLetter] = useState<
    Record<string, boolean>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Calculate pagination info
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Toggle expanded row
  const toggleExpand = (jobId: string) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
    }
  };

  // Handle cover letter generation
  const handleGenerateCoverLetter = async (job: Job) => {
    try {
      setGeneratingCoverLetter({ ...generatingCoverLetter, [job.id]: true });
      const response = await generateCoverLetter(job);
      setCoverLetters({
        ...coverLetters,
        [job.id]: response.coverLetter,
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      alert('Failed to generate cover letter. Please try again.');
    } finally {
      setGeneratingCoverLetter({ ...generatingCoverLetter, [job.id]: false });
    }
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } catch (error) {
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
                      <div className='bg-white p-4 border border-green-200 rounded-md'>
                        <h4 className='font-semibold mb-2 text-gray-800'>
                          Cover Letter
                        </h4>
                        <p className='text-gray-700 whitespace-pre-wrap'>
                          {coverLetters[job.id]}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateCoverLetter(job);
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
        <div className='flex justify-center mt-6'>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className='px-4 py-2 mx-1 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50'
          >
            Previous
          </button>
          <span className='px-4 py-2 mx-1 font-medium text-gray-800'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className='px-4 py-2 mx-1 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobTable;

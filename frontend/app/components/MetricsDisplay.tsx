'use client';

import React from 'react';

interface Metrics {
  totalRuntime: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  lastRefreshTime?: string;
}

interface MetricsDisplayProps {
  metrics: {
    operationRuntime?: number;
    globalMetrics?: Metrics;
  };
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  const { operationRuntime, globalMetrics } = metrics || {};

  if (!globalMetrics) {
    return null;
  }

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatCost = (cost: number) => {
    return `$${cost.toFixed(4)}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Performance Metrics</h2>
        <div className="text-sm text-gray-500">
          Last updated: {formatDate(globalMetrics.lastRefreshTime)}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Requests</div>
          <div className="font-bold text-2xl text-gray-800">{globalMetrics.requestCount}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Runtime</div>
          <div className="font-bold text-2xl text-gray-800">{formatTime(globalMetrics.totalRuntime)}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Tokens</div>
          <div className="font-bold text-2xl text-gray-800">{globalMetrics.totalTokens.toLocaleString()}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Cost</div>
          <div className="font-bold text-2xl text-gray-800">{formatCost(globalMetrics.totalCost)}</div>
        </div>
      </div>

      {operationRuntime && (
        <div className="mt-4 text-sm text-gray-600">
          Last operation took {formatTime(operationRuntime)}
        </div>
      )}

      {globalMetrics.lastRefreshTime && (
        <div className="mt-2 text-sm text-gray-600">
          Last refreshed: {formatDate(globalMetrics.lastRefreshTime)}
        </div>
      )}
    </div>
  );
};

export default MetricsDisplay;

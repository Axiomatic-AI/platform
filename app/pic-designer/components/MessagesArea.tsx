import { ErrorMessage } from './ErrorMessage';
import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Loading } from './Loading';

interface Query {
  query: string;
  response: string | null;
  isLoading: boolean;
  isError: boolean;
}

interface MessagesAreaProps {
  queries: Query[];
  currentQueryIndex: number;
  setCurrentQueryIndex: (cb: (prev: number) => number) => void;
}

export function MessagesArea({ queries, currentQueryIndex, setCurrentQueryIndex }: MessagesAreaProps) {

  const goBack = () => {
    setCurrentQueryIndex(prev => Math.max(0, prev - 1));
  };

  const goForward = () => {
    setCurrentQueryIndex(prev => Math.min(queries.length - 1, prev + 1));
  };

  const currentQuery = queries[currentQueryIndex];

  if (queries.length === 0 || currentQueryIndex < 0 || !currentQuery) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <button
          onClick={goBack}
          disabled={currentQueryIndex === 0}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center text-gray-600 dark:text-gray-400">
          <h4 className="text-xs font-bold mb-1">
            Query {currentQueryIndex + 1} of {queries.length}
          </h4>
          <h3 className="text-sm">
            {currentQuery.query.length > 50 
              ? `${currentQuery.query.slice(0, 50)}...` 
              : currentQuery.query}
          </h3>
        </div>
        <button
          onClick={goForward}
          disabled={currentQueryIndex === queries.length - 1}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full h-full p-4">
        {currentQuery.isLoading && <Loading />}
        {currentQuery.isError && <ErrorMessage />}
          {!currentQuery.isLoading && !currentQuery.isError && currentQuery.response && (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
              <div className="w-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Query:</div>
                <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-gray-900 dark:text-gray-100">{currentQuery.query}</div>
                </div>
              </div>
              <div className="w-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Response:</div>
                <CodeBlock code={currentQuery.response} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
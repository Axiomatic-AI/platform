import { ThreadWithQueries } from '../types';

interface QuerySelectorProps {
  thread: ThreadWithQueries;
  currentQueryIndex: number;
  onBack: () => void;
  onForward: () => void;
}

export function QuerySelector({ thread, currentQueryIndex, onBack, onForward }: QuerySelectorProps) {
  const currentQuery = thread.queries[currentQueryIndex];

  return (
    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
      <button
        onClick={onBack}
        disabled={currentQueryIndex === 0}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="text-center text-gray-600 dark:text-gray-400">
        <h4 className="text-xs font-bold mb-1">
          Query {currentQueryIndex + 1} of {thread.queries.length}
        </h4>
        <h3 className="text-sm">
          {currentQuery.content.length > 50 
            ? `${currentQuery.content.slice(0, 50)}...` 
            : currentQuery.content}
        </h3>
      </div>
      <button
        onClick={onForward}
        disabled={currentQueryIndex === thread.queries.length - 1}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 
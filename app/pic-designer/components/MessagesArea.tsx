import { ErrorMessage } from './ErrorMessage';
import { CodeBlock } from './CodeBlock';
import { Loading } from './Loading';
import { ThreadWithQueries } from '../types';

interface MessagesAreaProps {
  thread: ThreadWithQueries;
  isLoading: boolean;
  currentQueryIndex: number;
  setCurrentQueryIndex: (index: number) => void;
}

export function MessagesArea({ thread, isLoading, currentQueryIndex, setCurrentQueryIndex }: MessagesAreaProps) {
  const goBack = () => {
    setCurrentQueryIndex(Math.max(0, currentQueryIndex - 1));
  };

  const goForward = () => {
    setCurrentQueryIndex(Math.min(thread.queries.length - 1, currentQueryIndex + 1));
  };

  const currentQuery = thread.queries[currentQueryIndex];

  if (isLoading || thread.queries.length === 0 || currentQueryIndex < 0 || !currentQuery) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  const isCurrentQueryLoading = !currentQuery || (currentQuery.code === undefined && currentQuery.error === undefined);
  const isCurrentQueryError = currentQuery.error !== undefined;

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
            Query {currentQueryIndex + 1} of {thread.queries.length}
          </h4>
          <h3 className="text-sm">
            {currentQuery.content.length > 50 
              ? `${currentQuery.content.slice(0, 50)}...` 
              : currentQuery.content}
          </h3>
        </div>
        <button
          onClick={goForward}
          disabled={currentQueryIndex === thread.queries.length - 1}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full h-full p-4">
          {isCurrentQueryLoading && <Loading />}
          {isCurrentQueryError && <ErrorMessage />}
          {currentQuery.code && (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
              <div className="w-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Query:</div>
                <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-gray-900 dark:text-gray-100">{currentQuery.content}</div>
                </div>
              </div>
              <div className="w-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Response:</div>
                <CodeBlock code={currentQuery.code} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
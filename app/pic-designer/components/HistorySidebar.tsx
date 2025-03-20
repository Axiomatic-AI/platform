'use client';

import { ThreadWithQueries } from '../types';

interface HistorySidebarProps {
  onThreadSelect: (thread: ThreadWithQueries) => void;
  currentThreadId?: string;
  threads: ThreadWithQueries[];
  isLoading: boolean;
}

export function HistorySidebar({ onThreadSelect, threads, currentThreadId, isLoading }: HistorySidebarProps) {

  if (isLoading) {
    return (
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">History</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {threads.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
            No history yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => onThreadSelect(thread)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentThreadId === thread.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {thread.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(thread.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
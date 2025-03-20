'use client';

import { ThreadWithQueries } from '../types';
import { TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface HistorySidebarProps {
  onThreadSelect: (thread: ThreadWithQueries) => void;
  currentThreadId?: string;
  threads: ThreadWithQueries[];
  isLoading: boolean;
  onDeleteAll: () => void;
}

export function HistorySidebar({ onThreadSelect, threads, currentThreadId, isLoading, onDeleteAll }: HistorySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if(isCollapsed) {
    return (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-white mt-5 ml-4 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shadow-sm hover:shadow-md transition-all duration-300 z-10"
          title="Expand sidebar"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      
    )
  }

  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-64'}`}>
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
    <div className="relative">
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-3 top-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shadow-sm hover:shadow-md transition-all duration-300 z-10"
          title="Expand sidebar"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          {!isCollapsed && (
            <>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Collapse sidebar"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">History</h2>
              {threads.length > 0 && (
                <button
                  onClick={onDeleteAll}
                  className="ml-auto text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                  title="Clear all history"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
        {!isCollapsed && (
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
        )}
      </div>
    </div>
  );
} 
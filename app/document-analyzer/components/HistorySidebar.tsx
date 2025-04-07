'use client';

import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Document } from '@prisma/client';

interface HistorySidebarProps {
  onDocumentSelect: (document: Document) => void;
  currentDocumentId?: string;
  documents: Document[];
  isLoading: boolean;
  onDeleteAll: () => void;
  isDeleting: boolean;
}

export function HistorySidebar({ onDocumentSelect, currentDocumentId, documents, isLoading, onDeleteAll, isDeleting }: HistorySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="bg-white mt-5 ml-4 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shadow-sm hover:shadow-md transition-all duration-300 z-10"
        title="Expand sidebar"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 h-full">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Collapse sidebar"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">History</h2>
        </div>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 h-full overflow-y-scroll '>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          title="Collapse sidebar"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">History</h2>
        {documents.length > 0 && (
          <button
            onClick={onDeleteAll}
            disabled={isDeleting}
            className="ml-auto text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 disabled:opacity-50"
            title="Clear all history"
          >
            {isDeleting ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin-slow text-red-600 dark:text-red-400" />
            ) : (
              <TrashIcon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      
      <div className="overflow-y-auto">
        {documents.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
            No history yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {documents.map((document) => (
              <button
                key={document.id}
                onClick={() => onDocumentSelect(document)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  currentDocumentId === document.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
              >
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {document.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(document.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
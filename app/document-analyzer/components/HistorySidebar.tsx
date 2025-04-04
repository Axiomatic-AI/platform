'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Document } from '@prisma/client';

interface HistorySidebarProps {
  onDocumentSelect: (document: Document) => void;
  currentDocumentId?: string;
  documents: Document[];
  isLoading: boolean;
}

export function HistorySidebar({ onDocumentSelect, currentDocumentId, documents, isLoading }: HistorySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="w-64 h-full border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">History</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4">Loading...</div>
        ) : documents.length === 0 ? (
          <div className="p-4 text-gray-500">No documents yet</div>
        ) : (
          <ul>
            {documents.map((document) => (
              <li key={document.id}>
                <button
                  onClick={() => onDocumentSelect(document)}
                  className={`w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    currentDocumentId === document.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                >
                  {document.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 
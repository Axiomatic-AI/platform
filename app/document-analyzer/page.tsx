import React from 'react'
import DocumentIcon from '../../components/icons/DocumentIcon'

export default function DocumentAnalyzerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <DocumentIcon className="h-16 w-16 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Document Analyzer</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Coming Soon
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We're working on something exciting. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  )
} 
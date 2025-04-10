import React, { useCallback } from 'react'
import DocumentIcon from '../../../components/icons/DocumentIcon'
import { Error } from './Error'

interface FileUploadProps {
  file: File | null
  isDragging: boolean
  onFileSelect: (file: File) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  error: Error | null
  isLoading: boolean
  handleAnalyze: () => void
}

export function FileUpload({
  file,
  isDragging,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
  error,
  isLoading,
  handleAnalyze,
}: FileUploadProps) {
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }, [onFileSelect])

  return (
    <div className="flex-1 flex flex-col h-full items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-6">
            <DocumentIcon className="h-16 w-16 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Document Analyzer</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Upload your document to analyze
          </p>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 mb-6 transition-colors duration-200 ${
              isDragging
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
            }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="text-gray-600 dark:text-gray-300 mb-2">
                {file ? (
                  <span className="font-medium">{file.name}</span>
                ) : (
                  <>
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PDF files only
              </p>
            </label>
          </div>
        </div>

        {error && <Error message={error.message} />}

        {file && (
          <button
            className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            Analyze Document
          </button>
        )}
      </div>
    </div>
  )
} 
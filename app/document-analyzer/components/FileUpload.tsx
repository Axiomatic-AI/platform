import React, { useCallback } from 'react'
import DocumentIcon from '../../../components/icons/DocumentIcon'

interface FileUploadProps {
  file: File | null
  isDragging: boolean
  onFileSelect: (file: File) => void
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
}

export function FileUpload({
  file,
  isDragging,
  onFileSelect,
  onDragOver,
  onDragLeave,
  onDrop,
}: FileUploadProps) {
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile)
    }
  }, [onFileSelect])

  return (
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
  )
} 
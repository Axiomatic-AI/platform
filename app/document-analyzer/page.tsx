"use client"

import React, { useState, useCallback } from 'react'
import DocumentIcon from '../../components/icons/DocumentIcon'
import { useParseDocument } from '../../hooks/useParseDocument'

export default function DocumentAnalyzerPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { parseDocument, isLoading, error, result } = useParseDocument()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (file) {
      await parseDocument(file)
    }
  }, [file, parseDocument])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
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
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
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
                PDF, DOC, DOCX, or TXT files
              </p>
            </label>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          {file && (
            <button
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Document'}
            </button>
          )}

          {result && (
            <div className="mt-6 text-left">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Analysis Result</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                  {result.content}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 
"use client"

import React, { useState, useCallback } from 'react'
import { useParseDocument } from '../../hooks/useParseDocument'
import { FileUpload } from './components/FileUpload'
import { Error } from './components/Error'
import { Loading } from './components/Loading'
import { Result } from './components/Result'

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

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile)
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
          <FileUpload
            file={file}
            isDragging={isDragging}
            onFileSelect={handleFileSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          {error && <Error message={error} />}

          {file && (
            <button
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAnalyze}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Document'}
            </button>
          )}

          {isLoading && <Loading />}

          {result && <Result content={result.content} />}
        </div>
      </div>
    </div>
  )
} 
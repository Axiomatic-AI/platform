"use client"

import React, { useState, useCallback } from 'react'
import { usePostParseDocument } from './hooks/usePostParseDocument'
import { FileUpload } from './components/FileUpload'
import { Error } from './components/Error'
import { Loading } from './components/Loading'
import { Result } from './components/Result'
import { HistorySidebar } from './components/HistorySidebar'
import { getDocument } from './actions'
import { useGetDocuments } from './hooks/useGetDocuments'
import { Document } from '@prisma/client'

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

export default function DocumentAnalyzerPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const { data: documents, isLoading: isLoadingDocuments } = useGetDocuments()
  const { mutateAsync: postParseDocument, isPending: isLoading, error } = usePostParseDocument()

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
      if (droppedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file')
        return
      }
      if (droppedFile.size > MAX_FILE_SIZE) {
        alert('File size must be less than 100MB')
        return
      }
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      alert('Please upload a PDF file')
      return
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert('File size must be less than 100MB')
      return
    }
    setFile(selectedFile)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (file) {
      const document = await postParseDocument({ file })
      setCurrentDocument(document)
    }
  }, [file, postParseDocument])

  const handleDocumentSelect = useCallback((document: Document) => {
    setCurrentDocument(document)
  }, [])

  return (
    <div className="flex h-full w-full">
      <div className="flex-0 flex flex-col">
        <HistorySidebar
          documents={documents ?? []}
          currentDocumentId={currentDocument?.id}
          onDocumentSelect={handleDocumentSelect}
          isLoading={isLoadingDocuments}
        />
      </div>
      {!currentDocument ? (
        <div className="flex-1 flex flex-col h-full items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
            <FileUpload
              file={file}
              isDragging={isDragging}
              onFileSelect={handleFileSelect}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />

            {error && <Error message={error.message} />}

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
          </div>
        </div>
      ) : (
        <div className="flex-1 h-full overflow-y-scroll">
          <Result 
            markdown={currentDocument.markdown} 
            images={currentDocument.images as Record<string, string>} 
            interline_equations={currentDocument.interlineEquations} 
            inline_equations={currentDocument.inlineEquations} 
          />
        </div>
      )}
    </div>
  )
} 
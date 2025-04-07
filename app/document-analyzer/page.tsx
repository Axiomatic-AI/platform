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
import { PlusIcon } from '@heroicons/react/24/outline'
import { useDeleteAllDocuments } from './hooks/useDeleteAllDocuments'

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

export default function DocumentAnalyzerPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null)
  const { data: documents, isLoading: isLoadingDocuments } = useGetDocuments()
  const { mutateAsync: postParseDocument, isPending: isLoading, error } = usePostParseDocument()
  const { mutateAsync: deleteAllDocuments, isPending: isDeleting } = useDeleteAllDocuments()

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

  const handleDeleteAll = useCallback(async () => {
    await deleteAllDocuments()
    setCurrentDocument(null)
  }, [deleteAllDocuments])

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
          onDeleteAll={handleDeleteAll}
          isDeleting={isDeleting}
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
          <div className="fixed right-4 bottom-4 z-10">
            <button
              className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center group relative"
              onClick={() => setCurrentDocument(null)}
            >
              <PlusIcon className="h-6 w-6" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                New document
              </span>
            </button>
          </div>
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
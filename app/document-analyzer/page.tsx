"use client"

import React, { useState, useCallback } from 'react'
import { usePostParseDocument } from './hooks/usePostParseDocument'
import { FileUpload } from './components/FileUpload'
import { Error } from './components/Error'
import { Loading } from '../../components/Loading'
import { Result } from './components/Result'
import { HistorySidebar } from './components/HistorySidebar'
import { useGetDocuments } from './hooks/useGetDocuments'
import { Document } from '@prisma/client'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useDeleteAllDocuments } from './hooks/useDeleteAllDocuments'
import { useGetDocument } from './hooks/useGetDocument'

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes

export default function DocumentAnalyzerPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null)
  const { data: currentDocument, isLoading: isLoadingDocument } = useGetDocument(currentDocumentId);
  const { data: documents, isLoading: isLoadingDocuments } = useGetDocuments()
  const { mutateAsync: postParseDocument, isPending: isParsing, error } = usePostParseDocument()
  const { mutateAsync: deleteAllDocuments, isPending: isDeleting } = useDeleteAllDocuments()

  const isLoading = isLoadingDocument || isParsing

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
    setCurrentDocumentId(null)
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
      setCurrentDocumentId(document.id)
    }
  }, [file, postParseDocument])

  const handleDocumentSelect = useCallback((document: Document) => {
    setCurrentDocumentId(document.id)
  }, [])


  return (
    <div className="flex h-full w-full">
      <div className="flex-0 flex flex-col">
        <HistorySidebar
          documents={documents ?? []}
          currentDocumentId={currentDocumentId ?? undefined}
          onDocumentSelect={handleDocumentSelect}
          isLoading={isLoadingDocuments}
          onDeleteAll={handleDeleteAll}
          isDeleting={isDeleting}
        />
      </div>
      <div className="flex-1 h-full overflow-y-scroll">
        {isLoading && (
          <div className="h-full max-w-5xl mx-auto"><Loading /></div> 
        )}

        {!currentDocumentId && !isLoading && (
          <FileUpload
            file={file}
            isDragging={isDragging}
            onFileSelect={handleFileSelect}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            error={error}
            isLoading={isLoading}
            handleAnalyze={handleAnalyze}
          />
        )}

      {currentDocument && !isLoading && (
        <>
          <Result document={currentDocument} />
          <div className="fixed right-4 bottom-4 z-10">
            <button
              className="bg-primary-500 text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center group relative"
              onClick={() => setCurrentDocumentId(null)}
            >
              <PlusIcon className="h-6 w-6" />
              <span className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                New document
              </span>
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  )
} 
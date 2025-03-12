'use client'

import React, { useState, useEffect, ReactNode, ReactElement } from 'react'
import { useTheme } from 'next-themes'
import TopBar from './TopBar'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement | null {
  const [mounted, setMounted] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  
  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-dark-800 transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  )
} 
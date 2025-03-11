import Head from 'next/head'
import type { NextPage } from 'next'

const Analytics: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Analytics - Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analytics Dashboard</h2>
              <p className="text-gray-600 dark:text-gray-300">
                This is the analytics page. You can add charts, graphs, and other data visualization components here.
              </p>
              
              {/* Sample chart placeholder */}
              <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-64 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Charts and analytics data will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics 
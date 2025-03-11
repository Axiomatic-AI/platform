import Head from 'next/head'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import type { NextPage } from 'next'

const Settings: NextPage = () => {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState<boolean>(true)
  const [emailUpdates, setEmailUpdates] = useState<boolean>(false)
  
  return (
    <div>
      <Head>
        <title>Settings - Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Account Settings
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Manage your account preferences and settings.
                </p>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  {/* Theme Setting */}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Theme
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setTheme('light')}
                          className={`px-3 py-2 rounded-md ${
                            theme === 'light' 
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          Light
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`px-3 py-2 rounded-md ${
                            theme === 'dark' 
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          Dark
                        </button>
                        <button
                          onClick={() => setTheme('system')}
                          className={`px-3 py-2 rounded-md ${
                            theme === 'system' 
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100' 
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          System
                        </button>
                      </div>
                    </dd>
                  </div>
                  
                  {/* Notification Settings */}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Notifications
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => setNotifications(!notifications)}
                          className={`${
                            notifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          role="switch"
                          aria-checked={notifications}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              notifications ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                        <span className="ml-3">Enable push notifications</span>
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <button
                          type="button"
                          onClick={() => setEmailUpdates(!emailUpdates)}
                          className={`${
                            emailUpdates ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                          } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                          role="switch"
                          aria-checked={emailUpdates}
                        >
                          <span className="sr-only">Enable email updates</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              emailUpdates ? 'translate-x-5' : 'translate-x-0'
                            } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                          ></span>
                        </button>
                        <span className="ml-3">Receive email updates</span>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 
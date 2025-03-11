import Head from 'next/head'
import type { NextPage } from 'next'

interface Project {
  id: number;
  name: string;
  status: 'Completed' | 'In Progress' | 'Planning' | 'Not Started';
  progress: number;
}

const Projects: NextPage = () => {
  // Sample project data
  const projects: Project[] = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 75 },
    { id: 2, name: 'Mobile App Development', status: 'Planning', progress: 25 },
    { id: 3, name: 'Marketing Campaign', status: 'Completed', progress: 100 },
    { id: 4, name: 'Database Migration', status: 'In Progress', progress: 60 },
    { id: 5, name: 'API Integration', status: 'Not Started', progress: 0 },
  ]

  return (
    <div>
      <Head>
        <title>Projects - Platform</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h1>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {projects.map((project) => (
                  <li key={project.id}>
                    <a href="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                              {project.name}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                                  project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : 
                                  project.status === 'Planning' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 
                                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                {project.status}
                              </p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{project.progress}%</span>
                          </div>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              project.progress === 100 ? 'bg-green-500' : 
                              project.progress > 50 ? 'bg-blue-500' : 
                              project.progress > 0 ? 'bg-yellow-500' : 'bg-gray-500'
                            }`} 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects 
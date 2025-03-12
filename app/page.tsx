export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Axiomatic
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Your intelligent platform for building and managing AI-powered applications.
        </p>
        <div className="mt-8">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started →
          </a>
        </div>
      </div>
    </div>
  )
} 
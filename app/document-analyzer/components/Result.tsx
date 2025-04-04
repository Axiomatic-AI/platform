interface ResultProps {
  content: string
}

export function Result({ content }: ResultProps) {
  return (
    <div className="mt-6 text-left">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Analysis Result</h2>
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
          {content}
        </pre>
      </div>
    </div>
  )
} 
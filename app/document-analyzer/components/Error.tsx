interface ErrorProps {
  message: string
}

export function Error({ message }: ErrorProps) {
  return (
    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
      {message}
    </div>
  )
} 
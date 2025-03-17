interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-red-500 dark:text-red-400 text-sm text-center">
      {message}
    </div>
  );
} 
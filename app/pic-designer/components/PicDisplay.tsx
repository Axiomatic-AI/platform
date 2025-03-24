import { ErrorMessage } from './ErrorMessage';

interface PicDisplayProps {
  base64Image?: string;
  error?: string;
  isLoading?: boolean;
}

export function PicDisplay({ base64Image, error, isLoading }: PicDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <img 
      src={`data:image/png;base64,${base64Image}`} 
      alt="Generated circuit" 
      className="w-full rounded-lg shadow-sm"
    />
  );
} 
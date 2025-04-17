import { useEffect, useState } from 'react';

type SnackbarLevel = 'info' | 'success' | 'error';

interface SnackbarProps {
  message: string;
  onClose: () => void;
  duration?: number;
  level?: SnackbarLevel;
}

const levelStyles: Record<SnackbarLevel, { bg: string; text: string }> = {
  info: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300'
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300'
  },
  error: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300'
  }
};

const slideInRight = {
  '0%': { transform: 'translateX(100%)' },
  '60%': { transform: 'translateX(-10%)' },
  '80%': { transform: 'translateX(5%)' },
  '100%': { transform: 'translateX(0%)' }
};

export function Snackbar({ 
  message, 
  onClose, 
  duration = 5000,
  level = 'error'
}: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const styles = levelStyles[level];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'translate-x-0 opacity-100 animate-[slide-in-right_0.3s_ease-in-out_1]' 
          : 'translate-x-full opacity-0'
      }`}
      style={{
        animation: isVisible ? 'slide-in-right 0.3s ease-in-out 1' : undefined
      }}
    >
      <style jsx>{`
        @keyframes slide-in-right {
          0% { transform: translateX(100%); }
          60% { transform: translateX(-10%); }
          80% { transform: translateX(5%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
      <div className={`${styles.bg} ${styles.text} px-4 py-3 rounded-lg shadow-lg`}>
        {message}
      </div>
    </div>
  );
} 
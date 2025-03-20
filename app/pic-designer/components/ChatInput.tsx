'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, isLoading, placeholder = 'Describe your PIC circuit requirements...' }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center pl-0 pr-3 py-2 rounded-lg bg-white dark:border-none border border-gray-200 dark:bg-gray-700">
        <textarea 
          className="block resize-none mx-2 p-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder={placeholder}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
          <button
            className="inline-flex justify-center p-2 disabled:opacity-50 text-primary-500 rounded-lg cursor-pointer hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-600"
            onClick={handleSubmit}
            disabled={isLoading || !message.trim()}
          >
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
        </button>
      </div>
    </div>
  );
} 
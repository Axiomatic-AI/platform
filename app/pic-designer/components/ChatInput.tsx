'use client';

import { useState, KeyboardEvent, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, isLoading, placeholder = 'Describe your PIC circuit requirements...' }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fullText = "Build me a MZI";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTyping && message.length < fullText.length) {
      timeout = setTimeout(() => {
        setMessage(prev => prev + fullText[prev.length]);
      }, 50);
    } else if (message.length === fullText.length) {
      timeout = setTimeout(() => {
        onSendMessage(message);
        setMessage('');
        setIsTyping(false);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [isTyping, message, fullText, onSendMessage]);

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

  const handleFeelingLucky = () => {
    setIsTyping(true);
    setMessage('');
  };

  return (
    <div className="w-full">
      <div className="rounded-lg bg-white dark:border-none border border-gray-200 dark:bg-gray-700 shadow-sm">
        <textarea 
          className="p-2 block resize-none w-full text-sm text-gray-900 bg-transparent dark:placeholder-gray-400 dark:text-white focus:outline-none" 
          placeholder={placeholder}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isTyping}
        />
        <div className="p-1 flex justify-between items-center mt-2 px-2 bg-gray-50 rounded-b-lg dark:bg-gray-800">
          <button
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={handleFeelingLucky}
            disabled={isTyping}
          >
            I'm feeling lucky
          </button>
          <button
            className="inline-flex justify-center p-2 disabled:opacity-50 text-primary-500 rounded-lg cursor-pointer hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-600"
            onClick={handleSubmit}
            disabled={isLoading || !message.trim() || isTyping}
          >
            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
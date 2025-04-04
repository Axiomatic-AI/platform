'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
import { SendIcon } from '@components/icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder: string;
}

export function ChatInput({ 
  onSendMessage, 
  isLoading, 
  placeholder,
}: ChatInputProps) {
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
          <div className="flex items-center gap-2">
            <button
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative group"
              onClick={handleFeelingLucky}
              disabled={isTyping}
            >
              I'm feeling lucky
            </button>
          </div>
          <button
            className="inline-flex justify-center p-2 disabled:opacity-50 text-primary-500 rounded-lg cursor-pointer hover:bg-primary-100 dark:text-primary-500 dark:hover:bg-gray-600 relative group"
            onClick={handleSubmit}
            disabled={isLoading || !message.trim() || isTyping}
          >
            <SendIcon className="rotate-90 rtl:-rotate-90" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Send message
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 
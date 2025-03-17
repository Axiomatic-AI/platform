'use client';

import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import { getClient } from '../../lib/api';
import { MessagesArea } from './components/MessagesArea';
import { FractalTree } from './components/FractalTree';

interface Query {
  query: string;
  response: string;
}

interface GenerateCircuitResponse {
  code: string;
}

export default function PICDesigner() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState(true);

  const handleSendMessage = async (content: string) => {
    if (isInitialState) {
      setIsInitialState(false);
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const data = await getClient().post<GenerateCircuitResponse>('/pic/circuit/generate', { query: content });
      
      // Add new query and response
      const newQuery: Query = {
        query: content,
        response: data.code || 'I apologize, but I encountered an error generating the circuit.',
      };
      setQueries(prev => [...prev, newQuery]);
    } catch (error) {
      console.error('Error:', error);
      setError('I apologize, but I encountered an error processing your request. Please try again.');
      const errorQuery: Query = {
        query: content,
        response: 'I apologize, but I encountered an error processing your request. Please try again.',
      };
      setQueries(prev => [...prev, errorQuery]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {!isInitialState ? (
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <MessagesArea 
              queries={queries}
              isLoading={isLoading}
              error={error}
            />
            {isLoading && (
              <FractalTree />
            )}
          </div>
          <div className="flex-none p-4">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full px-4">
            <h1 className="font-bold text-gray-800 dark:text-white mb-2">
              What PIC would you like to build today?
            </h1>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
} 
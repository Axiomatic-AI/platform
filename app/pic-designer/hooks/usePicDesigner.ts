import { useState } from 'react';
import { getClient } from '../../../lib/api';

interface Query {
  query: string;
  response: string;
}

interface GenerateCircuitResponse {
  code: string;
}

export function usePicDesigner() {
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

  return {
    queries,
    isLoading,
    error,
    isInitialState,
    handleSendMessage,
  };
} 
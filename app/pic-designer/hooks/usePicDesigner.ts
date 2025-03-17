import { useState, useMemo } from 'react';
import { getClient } from '../../../lib/api';

interface Query {
  query: string;
  response: string | null;
  isLoading: boolean;
  isError: boolean;
}

interface GenerateCircuitResponse {
  code: string;
}

export function usePicDesigner() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [isInitialState, setIsInitialState] = useState(true);
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);

  const isLoading = useMemo(() => queries.some(q => q.isLoading), [queries]);

  const handleSendMessage = async (content: string) => {
    if (isInitialState) {
      setIsInitialState(false);
    }

    setCurrentQueryIndex(prev => prev + 1);
    
    const newQuery: Query = {
      query: content,
      response: '',
      isLoading: true,
      isError: false
    };
    setQueries(prev => [...prev, newQuery]);

    try {
      let data;
      if (queries.length > 0) {
        console.log('Refining circuit...');
        const previousCode = queries[queries.length - 1].response;
        data = await getClient().post<GenerateCircuitResponse>('/pic/circuit/refine', { 
          query: content,
          code: previousCode 
        });
      } else {
        data = await getClient().post<GenerateCircuitResponse>('/pic/circuit/generate', { query: content });
      }

      if (!data.code) {
        throw new Error('No code returned from API');
      }
      
      setQueries(prev => prev.map((q, index) => 
        index === prev.length - 1 
          ? { ...q, response: data.code, isLoading: false, isError: false }
          : q
      ));
    } catch (error) {
      console.error('Error:', error);
      setQueries(prev => prev.map((q, index) => 
        index === prev.length - 1 
          ? { 
              ...q, 
              isLoading: false,
              isError: true 
            }
          : q
      ));
    }
  };

  return {
    queries,
    isLoading,
    isInitialState,
    handleSendMessage,
    currentQueryIndex,
    setCurrentQueryIndex
  };
} 
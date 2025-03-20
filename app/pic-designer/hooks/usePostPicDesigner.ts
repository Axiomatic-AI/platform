import { getClient } from '../../../lib/api';
import { useMutation } from '@tanstack/react-query';

interface GenerateCircuitResponse {
  code: string;
}

interface GenerateCircuitParams {
  content: string;
  previousCode?: string;
}

const mocked = false

export function usePostPicDesigner() {
  return useMutation({
    mutationFn: async ({ content, previousCode }: GenerateCircuitParams) => {
      const shouldRefine = previousCode !== undefined;
      if (mocked) {
        return shouldRefine ? "refining" : "test2";
      }
      const endpoint = shouldRefine ? '/pic/circuit/refine' : '/pic/circuit/generate';
      
      const response = await getClient().post<GenerateCircuitResponse>(endpoint, { 
        query: content,
        ...(shouldRefine && { code: previousCode })
      });

      if (!response.code) {
        throw new Error('No code returned from API');
      }

      return response.code;
    }
  });

} 
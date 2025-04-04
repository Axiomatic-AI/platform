import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getClient } from '../../../lib/api';
import { ThreadType } from '@prisma/client';

interface ParseDocumentProps {
  file: File;
}

interface ParseDocumentResponse {
  content: string;
  type: ThreadType;
}

export function usePostParseDocument(): UseMutationResult<ParseDocumentResponse, Error, ParseDocumentProps> {
  return useMutation({
    mutationFn: async ({ file }: ParseDocumentProps) => {
      const formData = new FormData();
      formData.append('file', file);

      const data = await getClient().post<ParseDocumentResponse>('/document/parse', formData, { isFormData: true });

      if (!data.content) {
        throw new Error('No content returned from API');
      }

      return data;
    },
  });
} 
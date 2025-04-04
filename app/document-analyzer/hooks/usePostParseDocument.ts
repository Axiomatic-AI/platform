import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { getClient } from '../../../lib/api';

interface ParseDocumentResponse {
  content: string;
  metadata: {
    fileName: string;
    fileType: string;
    fileSize: number;
    lastModified: Date;
  };
}

interface ParseDocumentProps {
  file: File;
}

export function usePostParseDocument(): UseMutationResult<ParseDocumentResponse, Error, ParseDocumentProps> {
  return useMutation({
    mutationFn: async ({ file }: ParseDocumentProps) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await getClient().post<ParseDocumentResponse>('/document/parse', formData, {
        isFormData: true
      });

      return response;
    },
  });
} 
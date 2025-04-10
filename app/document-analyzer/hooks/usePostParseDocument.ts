import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { getClient } from '../../../lib/api';
import { createDocument } from '../actions';
import { Document } from '@prisma/client';

interface ParseDocumentResponse {
  markdown: string;
  images: Record<string, string>;
  interline_equations: string[];
  inline_equations: string[];
}

interface ParseDocumentProps {
  file: File;
}

function validateParseDocumentResponse(response: ParseDocumentResponse) {
  if (!response) {
    throw new Error('No response received from the server');
  }

  if (!response.markdown) {
    throw new Error('Invalid response format: markdown is required');
  }

  if (!response.images || typeof response.images !== 'object') {
    throw new Error('No images received from the server');
  }

  if (!Array.isArray(response.interline_equations)) {
    throw new Error('Invalid response format: interline_equations is not an array');
  }

  if (!Array.isArray(response.inline_equations)) {
    throw new Error('Invalid response format: inline_equations is not an array');
  }
}

export function usePostParseDocument(): UseMutationResult<Document, Error, ParseDocumentProps> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: ParseDocumentProps) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('method', 'mistral');

      const response = await getClient().post<ParseDocumentResponse>('/document/parse', formData, {
        isFormData: true
      });

      validateParseDocumentResponse(response);

      const document = await createDocument({
        title: file.name,
        markdown: response.markdown,
        images: response.images,
        interlineEquations: response.interline_equations,
        inlineEquations: response.inline_equations,
      });

      if (!document) {
        throw new Error('Failed to create document in database');
      }

      return document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
} 
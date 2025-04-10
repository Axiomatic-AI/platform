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

      try {
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
      } catch (error) {
        console.error('Error creating document:', error);
        throw error;
      }
    },
    onMutate: async ({ file }) => {
      await queryClient.cancelQueries({ queryKey: ['documents'] });

      const previousDocuments = queryClient.getQueryData<Document[]>(['documents']);

      // Create an optimistic document
      const optimisticDocument = {
        id: 'temp',
        userId: 'temp', // This will be replaced with the actual user ID when the document is created
        title: file.name,
        markdown: '',
        images: {},
        interlineEquations: [],
        inlineEquations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Document;

      queryClient.setQueryData<Document[]>(['documents'], (old) => {
        if (!old) return [optimisticDocument];
        return [...old, optimisticDocument];
      });

      return { previousDocuments };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousDocuments) {
        queryClient.setQueryData(['documents'], context.previousDocuments);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
} 
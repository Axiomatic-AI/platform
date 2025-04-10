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

      if (!response) {
        throw new Error('No response received from the server');
      }

      console.log('Parse response:', response);

      // Validate the response structure
      if (!response.markdown) {
        throw new Error('Invalid response format: markdown is required');
      }

      // Ensure images is an object
      if (!response.images || typeof response.images !== 'object') {
        response.images = {};
      }

      // Ensure arrays are arrays
      const interlineEquations = Array.isArray(response.interline_equations) ? response.interline_equations : [];
      const inlineEquations = Array.isArray(response.inline_equations) ? response.inline_equations : [];

      try {
        const document = await createDocument({
          title: file.name,
          markdown: response.markdown,
          images: response.images,
          interlineEquations,
          inlineEquations,
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
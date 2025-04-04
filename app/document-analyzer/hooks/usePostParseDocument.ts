import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { getClient } from '../../../lib/api';
import { createDocument } from '../actions';
import { Document } from '@prisma/client';

interface ParseDocumentResponse {
  markdown: string;
  images: string[];
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

      const response = await getClient().post<ParseDocumentResponse>('/document/parse', formData, {
        isFormData: true
      });

      if (!response) {
        throw new Error('No response received from the server');
      }

      if (!response.markdown || !Array.isArray(response.images) || 
          !Array.isArray(response.interline_equations) || !Array.isArray(response.inline_equations)) {
        throw new Error('Invalid response format from the server');
      }

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
    onMutate: async ({ file }) => {
      await queryClient.cancelQueries({ queryKey: ['documents'] });

      const previousDocuments = queryClient.getQueryData<Document[]>(['documents']);

      // Create an optimistic document
      const optimisticDocument = {
        id: 'temp',
        userId: 'temp', // This will be replaced with the actual user ID when the document is created
        title: file.name,
        markdown: '',
        images: [],
        interlineEquations: [],
        inlineEquations: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Document;

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
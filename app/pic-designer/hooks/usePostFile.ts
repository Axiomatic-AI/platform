import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { postQueryToThread, createThread } from '../actions';
import { usePostPicDesigner } from './usePostPicDesigner';
import { usePostParseDocument } from '../../document-analyzer/hooks/usePostParseDocument';
import { PicDesignerQuery, ThreadWithQueries } from '../types';
import { ThreadType } from '@prisma/client';

interface PostFileProps {
  threadId: string | undefined;
  file: File;
}

export function usePostFile(): UseMutationResult<ThreadWithQueries, Error, PostFileProps> {
  const queryClient = useQueryClient();
  const { mutateAsync: postParseDocument } = usePostParseDocument();
  return useMutation({
    mutationFn: async ({ threadId, file }: PostFileProps) => {
      try {
        const analyzedDocument = await postParseDocument({ file });
        if (!threadId) {
          // First time we're posting a query, we need to create a new thread
          const newThread = await createThread("Testing document", ThreadType.document);
          threadId = newThread.id;
        }
        return await postQueryToThread(threadId, analyzedDocument);
      } catch (error) {
        if (!threadId) {
          // If we don't have a thread ID, we should not persist anything to the DB
          throw new Error("Failed to analyze document");
        }
        return postQueryToThread(threadId, { content: "THIS SHOULD BE THE FILE TITLE", error: "Failed to analyze document" });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
}

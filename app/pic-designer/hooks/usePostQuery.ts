import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { postQueryToThread, createThread } from '../actions';
import { usePostPicDesigner } from './usePostPicDesigner';
import { PicDesignerQuery, ThreadWithQueries } from '../types';

interface PostQueryProps {
  threadId: string | undefined;
  content: string;
  previousCode: string | undefined;
}


export function usePostQuery(): UseMutationResult<ThreadWithQueries, Error, PostQueryProps> {
  const queryClient = useQueryClient();
  const { mutateAsync: postPicDesigner } = usePostPicDesigner();
  return useMutation({
    mutationFn: async ({ threadId, content, previousCode }: PostQueryProps) => {
      try {
        const newCode = await postPicDesigner({ content, previousCode });
        if (!threadId) {
          // First time we're posting a query, we need to create a new thread
          const newThread = await createThread(content);
          threadId = newThread.id;
        }
        return await postQueryToThread({ threadId, content, code: newCode });
      } catch (error) {
        if (!threadId) {
          // If we don't have a thread ID, we should not persist anything to the DB
          throw new Error("Failed to generate circuit");
        }
        return postQueryToThread({ threadId, content, error: "Failed to generate circuit" });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
}

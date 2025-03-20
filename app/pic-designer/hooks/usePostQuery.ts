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
    onMutate: async ({ threadId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['threads'] });

      const previousThreads = queryClient.getQueryData<ThreadWithQueries[]>(['threads']);

      // Create an optimistic query that matches the JsonValue type
      const optimisticQuery = { content } as const;

      if(!previousThreads || !threadId) {
        // No optimistic updates if we are in a new thread
        return { previousThreads: [] };
      }

      queryClient.setQueryData<ThreadWithQueries[]>(['threads'], (old) => {
        if (!old) return old;
        return old.map((thread) => {
          if (thread.id === threadId) {
            return {
              ...thread,
              queries: [...thread.queries, optimisticQuery],
            };
          }
          return thread;
        });
      });

      // Return a context object with the snapshotted value
      return { previousThreads };
    },
    onError: (err, newTodo, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousThreads) {
        queryClient.setQueryData(['threads'], context.previousThreads);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
}

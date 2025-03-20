import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueryToThread } from '../actions';
import { usePostPicDesigner } from './usePostPicDesigner';

interface PostQueryProps {
  threadId: string;
  content: string;
  previousCode: string | undefined;
}

export function usePostQuery() {
  const queryClient = useQueryClient();
  const { mutateAsync: postPicDesigner } = usePostPicDesigner();
  return useMutation({
    mutationFn: async ({ threadId, content, previousCode }: PostQueryProps) => {
      try {
        const newCode = await postPicDesigner({ content, previousCode });
        return postQueryToThread({ threadId, content, code: newCode });
      } catch (error) {
        return postQueryToThread({ threadId, content, error: "Failed to generate circuit" });
      }
    },
    onMutate: async ({ threadId, content }) => {
      console.log('onMutate', threadId, content);
      await queryClient.cancelQueries({ queryKey: ['threads', threadId] });

      const previousThread = queryClient.getQueryData(['threads', threadId]);

      queryClient.setQueryData(['threads', threadId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          queries: [
            ...old.queries,
            {
              id: 'temp-' + Date.now(),
              threadId,
              content,
              code: undefined,
              error: undefined,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });

      // Return a context object with the snapshotted value
      return { previousThread };
    },
    onError: (err, newQuery, context) => {
      console.log('onError', err, newQuery, context);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['threads', data.id] });
    },
  });
}

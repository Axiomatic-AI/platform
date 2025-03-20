import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../actions"
import { ThreadWithQueries } from "../types";

export function usePostThread() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ title }: { title: string }) => createThread(title),
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
}
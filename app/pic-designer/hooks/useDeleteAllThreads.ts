import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllThreads } from "../actions";

export function useDeleteAllThreads() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllThreads,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
}

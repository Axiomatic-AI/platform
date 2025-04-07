import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllDocuments } from "../actions";

export function useDeleteAllDocuments() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => deleteAllDocuments(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}


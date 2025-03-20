import { useMutation } from "@tanstack/react-query";
import { createThread } from "../actions"

export function usePostThread() {
  return useMutation({
    mutationFn: async ({ title }: { title: string }) => createThread(title),
  });
}
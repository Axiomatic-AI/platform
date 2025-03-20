import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getThread } from "../actions";
import { ThreadWithQueries } from "../types";

export function useGetThread(threadId: string | undefined): UseQueryResult<ThreadWithQueries> {
  return useQuery({
    queryKey: ['threads', threadId],
    queryFn: () => getThread(threadId ?? ''),
    enabled: !!threadId,
  });
}

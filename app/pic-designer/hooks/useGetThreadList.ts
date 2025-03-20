import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getThreads } from "../actions";
import { ThreadWithQueries } from "../types";

export function useGetThreadList(): UseQueryResult<ThreadWithQueries[]> {
  return useQuery({
    queryKey: ['thread-list'],
    queryFn: () => getThreads(),
  });
}

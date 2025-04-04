import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDocuments } from "../actions";

export function useGetDocuments(): UseQueryResult<any[]> {
  return useQuery({
    queryKey: ['documents'],
    queryFn: () => getDocuments(),
  });
} 
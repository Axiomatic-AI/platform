import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDocuments } from "../actions";
import { Document } from "@prisma/client";

export function useGetDocuments(): UseQueryResult<Document[]> {
  return useQuery({
    queryKey: ['documents'],
    queryFn: () => getDocuments(),
  });
} 
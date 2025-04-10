import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDocument } from "../actions";
import { Document } from "@prisma/client";

export function useGetDocument(id: string | null): UseQueryResult<Document | null> {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => id ? getDocument(id) : null,
    enabled: !!id,
  });
} 
import { useQuery } from '@tanstack/react-query'
import { getDocument } from '../actions'

export function useGetDocument(id: string | null) {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocument(id!),
    enabled: !!id,
  })
} 
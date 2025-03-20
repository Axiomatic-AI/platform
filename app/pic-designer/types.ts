import { PicDesignerThread } from '@prisma/client';

export interface PicDesignerQuery {
  content: string;
  code?: string;
  error?: string;
}

export type ThreadWithQueries = PicDesignerThread & {
  queries: PicDesignerQuery[];
};
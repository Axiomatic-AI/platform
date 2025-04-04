import { ThreadType } from "@prisma/client";

export interface PicDesignerQuery {
  content?: string;
  code?: string;
  error?: string;
  executionResult?: {
    base64Image: string;
    error?: string;
  };
}

export interface DocumentQuery {
  markdown: string;
  interline_equations: string[];
  inline_equations: string[];
  images: Record<string, string>;
  error?: string;
}

export interface ErrorQuery {
  content: string;
  error: string;
}

export type ThreadQuery = PicDesignerQuery | DocumentQuery | ErrorQuery;

export interface ThreadWithQueries {
  id: string;
  title: string;
  queries: ThreadQuery[];
  type: ThreadType;
  createdAt: Date;
  updatedAt: Date;
}
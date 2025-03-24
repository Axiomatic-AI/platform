
export interface PicDesignerQuery {
  content: string;
  code?: string;
  error?: string;
  executionResult?: {
    base64Image: string;
    error?: string;
  };
}

export interface ThreadWithQueries {
  id: string;
  title: string;
  queries: PicDesignerQuery[];
  createdAt: Date;
  updatedAt: Date;
}
import ReactMarkdown from 'react-markdown';

interface ResultProps {
  markdown: string;
  images: Record<string, string>;
  interline_equations: string[];
  inline_equations: string[];
}

export function Result({ markdown, images, interline_equations, inline_equations }: ResultProps) {
  return (
    <div className="prose dark:prose-invert max-w-none p-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
} 
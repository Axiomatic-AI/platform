import ReactMarkdown from 'react-markdown';

interface ResultProps {
  markdown: string;
  images: string[];
  interline_equations: string[];
  inline_equations: string[];
}

export function Result({ markdown }: ResultProps) {
  return (
    <div className="bg-white text-left dark:bg-gray-700 p-4 prose dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          code: ({ node, ...props }) => (
            <code className="bg-gray-200 dark:bg-gray-600 rounded px-1 py-0.5" {...props} />
          ),
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-200 dark:bg-gray-600 rounded p-4 mb-4 overflow-x-auto" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
} 
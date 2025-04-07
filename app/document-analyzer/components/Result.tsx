import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface ResultProps {
  markdown: string;
  images: Record<string, string>;
  interline_equations: string[];
  inline_equations: string[];
}

function placeImages(markdown: string, images: Record<string, string>) {
  
  Object.entries(images).forEach(([key, value]) => {
    const imgTag = `data:image/png;base64,${value}`;
    const imgInMarkdown = `![](${key})`;
    const newImage = `![test](${imgTag})`;
    markdown = markdown.replace(imgInMarkdown, newImage);
  });
  return markdown;
}

// THIS IS UNSAFE
// TODO: Make it safe
// See: https://github.com/remarkjs/react-markdown/issues/774
function transformUrl(url: string) {
  return url;
}

export function Result({ markdown, images, interline_equations, inline_equations }: ResultProps) {
  const components: Components = {
    code: ({ node, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !className?.includes('language-');
      return !isInline && match ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="prose dark:prose-invert max-w-none p-6">
      <ReactMarkdown components={components} urlTransform={transformUrl}>
        {placeImages(markdown, images)}
      </ReactMarkdown>
    </div>
  );
} 
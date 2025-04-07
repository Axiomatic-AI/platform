import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

interface ResultProps {
  markdown: string;
  images: Record<string, string>;
  interline_equations: string[];
  inline_equations: string[];
}

function placeImages(markdown: string, images: Record<string, string>) {
  Object.entries(images).forEach(([key, value]) => {
    const imgTag = `data:image/png;base64,${value}`;
    // Handle both ![]() and ![alt]() syntax
    const imgInMarkdown = `!\\[([^\\]]*)\\]\\(${key}\\)`;
    const newImage = `![$1](${imgTag})`;
    markdown = markdown.replace(new RegExp(imgInMarkdown, 'g'), newImage);
  });
  return markdown;
}

// THIS IS UNSAFE
// TODO: Make it safe
// See: https://github.com/remarkjs/react-markdown/issues/774
function transformUrl(url: string) {
  return url;
}

const mathjaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
  },
};

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
    img: ({ src, alt, ...props }) => {
      // If the src is a data URL, render it directly
      if (src?.startsWith('data:')) {
        return <img src={src} alt={alt || ''} {...props} />;
      }
      // Otherwise, use the default img component
      return <img src={src} alt={alt || ''} {...props} />;
    },
    p: ({ children, ...props }) => {
      // Check if the paragraph contains math
      const text = React.Children.toArray(children).join('');
      if (text.includes('$')) {
        return (
          <p {...props}>
            <MathJax>{text}</MathJax>
          </p>
        );
      }
      return <p {...props}>{children}</p>;
    },
  };

  const parsedMarkdown = placeImages(markdown, images)

  return (
    <MathJaxContext config={mathjaxConfig}>
      <div className="prose dark:prose-invert max-w-none p-6">
        <ReactMarkdown components={components} urlTransform={transformUrl}>
          {parsedMarkdown}
        </ReactMarkdown>
      </div>
    </MathJaxContext>
  );
} 
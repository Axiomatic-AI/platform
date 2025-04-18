import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Document } from '@prisma/client';
interface ResultProps {
  document: Document;
}

function placeImages(markdown: string, images: Record<string, string>) {
  let newMarkdown = markdown;
  Object.entries(images).forEach(([key, value]) => {
    const imgTag = value;
    const imgInMarkdown = `![${key}](${key})`;
    const newImage = `![${key}](${imgTag})`;
    newMarkdown = newMarkdown.replace(imgInMarkdown, newImage);
  });

  return newMarkdown;
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

export function Result({ document }: ResultProps) {
  const parsedMarkdown = useMemo(() => placeImages(document?.markdown ?? '', document?.images as Record<string, string> ?? {}), [document?.markdown, document?.images]);


  const components: Components = {
    img: ({ src, alt, ...props }) => {
      if (src?.startsWith('data:')) {
        return (
          <span className="flex justify-center my-4 test-123">
            <img src={src} alt={alt || ''} className="max-w-full h-auto" {...props} />
          </span>
        );
      }
      return (
        <span className="flex justify-center my-4 test-123">
          <img src={src} alt={alt || ''} className="max-w-full h-auto" {...props} />
        </span>
      );
    },
  };

  if (!document) {
    return null;
  }
  return (
    <MathJaxContext config={mathjaxConfig}>
      <div className="prose dark:prose-invert p-6 max-w-7xl mx-auto">
        <MathJax dynamic hideUntilTypeset="every">
          <ReactMarkdown components={components} urlTransform={transformUrl}>
              {parsedMarkdown}
          </ReactMarkdown>
        </MathJax>
      </div>
    </MathJaxContext>
  );
} 
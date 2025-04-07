import React, { useMemo } from 'react';
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
  let newMarkdown = markdown;
  Object.entries(images).forEach(([key, value]) => {
    const imgTag = `data:image/png;base64,${value}`;
    const imgInMarkdown = `![](${key})`;
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

export function Result({ markdown, images, interline_equations, inline_equations }: ResultProps) {
  const components: Components = {
    img: ({ src, alt, ...props }) => {
      console.log("alt", alt)
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

  const parsedMarkdown = useMemo(() => placeImages(markdown, images), [markdown, images])

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
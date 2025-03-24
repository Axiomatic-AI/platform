import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import '../styles/prism.css';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      Prism.highlightAll();
    }, 0);
    return () => clearTimeout(timer);
  }, [code]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className={`w-full rounded-xl overflow-hidden shadow-sm ${resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
        <div className="flex justify-end p-2 space-x-2">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="!m-0 p-6 overflow-x-auto">
          <code className={`p-0 language-python text-sm leading-relaxed ${resolvedTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
} 
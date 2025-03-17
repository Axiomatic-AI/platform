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
    <div className={`w-full rounded-xl overflow-hidden shadow-sm ${resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
      <pre className="!m-0 p-6 overflow-x-auto">
        <code className={`p-0 language-python text-sm leading-relaxed ${resolvedTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          {code}
        </code>
      </pre>
      <div className={`flex items-center px-4 py-3 ${resolvedTheme === 'dark' ? 'border-t border-gray-800' : 'border-t border-gray-100'}`}>
        <button
          onClick={handleCopyCode}
          className={`flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
            resolvedTheme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-800'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
          }`}
          title="Copy to clipboard"
        >
          {copySuccess ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
} 
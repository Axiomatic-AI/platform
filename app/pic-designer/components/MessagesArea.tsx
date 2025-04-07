import { ErrorMessage } from './ErrorMessage';
import { CodeBlock } from './CodeBlock';
import { Loading } from './Loading';
import { ThreadWithQueries } from '../types';
import { useExecuteGdsFactoryCode } from '../hooks/useExecuteGdsFactoryCode';
import { useEffect, useState } from 'react';
import { PicDisplay } from './PicDisplay';
import { QuerySelector } from './QuerySelector';
import { guardIsPicOrErrorQuery, guardIsPicQuery } from '../utils';
interface MessagesAreaProps {
  thread: ThreadWithQueries | undefined;
  isLoading: boolean;
  currentQueryIndex: number;
  setCurrentQueryIndex: (index: number) => void;
}

export function MessagesArea({ thread, isLoading, currentQueryIndex, setCurrentQueryIndex }: MessagesAreaProps) {
  const { mutateAsync: executeCode } = useExecuteGdsFactoryCode();
  const [isExecuting, setIsExecuting] = useState(false);

  if (isLoading && !thread) {
    // If we are loading and there is no thread, we are in a new thread
    // Otherwise, we are in an existing thread and should show the thread
    return (
      <div className="flex items-center justify-center h-full max-w-4xl mx-auto">
        <Loading />
      </div>
    );
  }

  if (!thread) {
    return null;
  }

  const goBack = () => {
    setCurrentQueryIndex(Math.max(0, currentQueryIndex - 1));
  };

  const goForward = () => {
    setCurrentQueryIndex(Math.min(thread.queries.length - 1, currentQueryIndex + 1));
  };

  const currentQuery = thread.queries[currentQueryIndex];

  const isCurrentQueryLoading = isLoading;

  useEffect(() => {
    const executeCurrentQuery = async () => {
      if (!guardIsPicQuery(currentQuery)) {
        return;
      }

      if (currentQuery.code && !currentQuery.executionResult) {
        setIsExecuting(true);
        try {
          const result = await executeCode({ code: currentQuery.code });
          thread.queries[currentQueryIndex] = {
            ...currentQuery,
            executionResult: result
          };
        } catch (error) {
          thread.queries[currentQueryIndex] = {
            ...currentQuery,
            executionResult: {
              base64Image: '',
              error: 'Failed to execute code'
            }
          };
        } finally {
          setIsExecuting(false);
        }
      }
    };

    executeCurrentQuery();
  }, [currentQuery, currentQueryIndex, executeCode, thread.queries]);

  return (
    <div className="h-full flex flex-col p">
      <QuerySelector
        thread={thread}
        currentQueryIndex={currentQueryIndex}
        onBack={goBack}
        onForward={goForward}
      />

      <div className="flex-1 overflow-y-auto mt-4">
        <div className="mx-auto w-full h-full p-4">
          {isCurrentQueryLoading && (<div className="flex items-center justify-center h-full max-w-4xl mx-auto"><Loading /></div>)}
          {currentQuery.error && (<ErrorMessage />)}
          {guardIsPicOrErrorQuery(currentQuery) && (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
              <div className="w-full grid grid-cols-2 gap-6 h-[calc(100vh-400px)]">
                <div className="h-full overflow-hidden flex flex-col">
                  {guardIsPicQuery(currentQuery) && currentQuery.code && ( 
                    <div className="flex-1 overflow-y-auto">
                      <CodeBlock code={currentQuery.code} />
                    </div>
                  )}
                </div>
                {guardIsPicQuery(currentQuery) && (
                  <div className="h-full">
                    <PicDisplay 
                      base64Image={currentQuery.executionResult?.base64Image}
                      error={currentQuery.executionResult?.error}
                      isLoading={isExecuting}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
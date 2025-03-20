'use client';

import { ChatInput } from './components/ChatInput';
import { MessagesArea } from './components/MessagesArea';
import { HistorySidebar } from './components/HistorySidebar';
import { useEffect, useState } from 'react';
import { useGetThreadList } from './hooks/useGetThreadList';
import { usePostQuery } from './hooks/usePostQuery';
import { ThreadWithQueries, PicDesignerQuery } from './types';
import { useDeleteAllThreads } from './hooks/useDeleteAllThreads';

export default function PICDesigner() {
  const [currentThreadId, setCurrentThreadId] = useState<string | undefined>();
  const [currentQueryIndex, setCurrentQueryIndex] = useState<number>(0);

  const { data: threadList, isLoading: isThreadListLoading } = useGetThreadList();
  const { mutateAsync: postQuery, isPending: isPostQueryLoading } = usePostQuery();
  const { mutateAsync: deleteAllThreads } = useDeleteAllThreads();

  const thread = threadList?.find(thread => thread.id === currentThreadId);

  const handleDeleteAllThreads = async () => {
    await deleteAllThreads();
    setCurrentThreadId(undefined);
    setCurrentQueryIndex(0);
  };

  const handleThreadSelect = async (thread: ThreadWithQueries) => {
    setCurrentThreadId(thread.id);
    setCurrentQueryIndex(0);
  };

  const getPreviousCode = () => {
    if (!thread?.queries) return undefined;
    
    const previousQueries = (thread.queries as PicDesignerQuery[])
    const lastSuccessfulQuery = previousQueries
      .reverse()
      .find(query => !query.error);
    
    return lastSuccessfulQuery?.code;
  };

  const onSendMessage = async (content: string) => {
    const previousCode = getPreviousCode();
    const thread = await postQuery({ threadId: currentThreadId, content, previousCode });
    setCurrentThreadId(thread.id);
  };

  useEffect(() => {
    if(thread) {
      setCurrentQueryIndex(thread.queries.length - 1);
    }
  }, [thread]);

  return (
    <div className="flex h-full w-full">
      <div className="flex-0">
        <HistorySidebar 
          onDeleteAll={handleDeleteAllThreads}
          onThreadSelect={handleThreadSelect}
          threads={threadList ?? []}
          currentThreadId={currentThreadId}
          isLoading={isThreadListLoading}
        />
      </div>
      <div className="flex-1 flex flex-col max-w-4xl h-full mx-auto">
        {thread || isPostQueryLoading ? (
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MessagesArea thread={thread} isLoading={isPostQueryLoading} currentQueryIndex={currentQueryIndex} setCurrentQueryIndex={setCurrentQueryIndex} />
            </div>
            <div className="flex-none p-4">
              <ChatInput onSendMessage={onSendMessage} isLoading={isPostQueryLoading} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="mx-auto w-full px-4">
              <h1 className="font-bold text-gray-800 dark:text-white mb-2">
                What PIC would you like to build today?
              </h1>
              <ChatInput onSendMessage={onSendMessage} isLoading={isPostQueryLoading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
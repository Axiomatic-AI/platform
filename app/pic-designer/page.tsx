'use client';

import { ChatInput } from './components/ChatInput';
import { MessagesArea } from './components/MessagesArea';
import { HistorySidebar } from './components/HistorySidebar';
import { useState } from 'react';
import { useGetThreadList } from './hooks/useGetThreadList';
import { useGetThread } from './hooks/useGetThread';
import { usePostQuery } from './hooks/usePostQuery';
import { usePostThread } from './hooks/usePostThread';
import { ThreadWithQueries, PicDesignerQuery } from './types';
import { useDeleteAllThreads } from './hooks/useDeleteAllThreads';

export default function PICDesigner() {
  const [currentThreadId, setCurrentThreadId] = useState<string | undefined>();
  const [currentQueryIndex, setCurrentQueryIndex] = useState<number>(0);

  const { data: threadList, isLoading: isThreadListLoading } = useGetThreadList();
  const { data: thread, isLoading: isThreadLoading } = useGetThread(currentThreadId);
  const { mutateAsync: postQuery } = usePostQuery();
  const { mutateAsync: postThread, isPending: isPostThreadLoading } = usePostThread();
  const { mutateAsync: deleteAllThreads } = useDeleteAllThreads();

  const handleDeleteAllThreads = async () => {
    await deleteAllThreads();
  };

  const handleThreadSelect = async (thread: ThreadWithQueries) => {
    setCurrentThreadId(thread.id);
  };

  const getPreviousCode = () => {
    if (!thread?.queries || currentQueryIndex === 0) return undefined;
    
    const previousQueries = (thread.queries as PicDesignerQuery[]).slice(0, currentQueryIndex);
    const lastSuccessfulQuery = previousQueries
      .reverse()
      .find(query => !query.error);
    
    return lastSuccessfulQuery?.code;
  };

  const onSendMessage = async (content: string) => {
    let threadId = currentThreadId;

    if (!threadId) {
      const thread = await postThread({ title: content });
      threadId = thread.id;
      setCurrentThreadId(thread.id);
    };

    const previousCode = getPreviousCode();
    postQuery({ threadId, content, previousCode });

    setCurrentQueryIndex(thread?.queries.length ?? 0);
  };

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
        {thread ? (
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MessagesArea thread={thread} isLoading={isThreadLoading || isPostThreadLoading} currentQueryIndex={currentQueryIndex} setCurrentQueryIndex={setCurrentQueryIndex} />
            </div>
            <div className="flex-none p-4">
              <ChatInput onSendMessage={onSendMessage} isLoading={false} />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="mx-auto w-full px-4">
              <h1 className="font-bold text-gray-800 dark:text-white mb-2">
                What PIC would you like to build today?
              </h1>
              <ChatInput onSendMessage={onSendMessage} isLoading={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
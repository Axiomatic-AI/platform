'use client';

import { ChatInput } from './components/ChatInput';
import { MessagesArea } from './components/MessagesArea';
import { HistorySidebar } from './components/HistorySidebar';
import { useEffect, useMemo, useState } from 'react';
import { useGetThreadList } from './hooks/useGetThreadList';
import { usePostPicQuery } from './hooks/usePostQuery';
import { ThreadWithQueries, PicDesignerQuery } from './types';
import { useDeleteAllThreads } from './hooks/useDeleteAllThreads';
import { ThreadType } from '@prisma/client';


export default function PICDesigner() {
  const [currentThreadId, setCurrentThreadId] = useState<string | undefined>();
  const [currentQueryIndex, setCurrentQueryIndex] = useState<number>(0);

  const { data: threadList, isLoading: isThreadListLoading } = useGetThreadList();
  const { mutateAsync: postQuery, isPending: isPostQueryLoading } = usePostPicQuery();
  const { mutateAsync: deleteAllThreads, isPending: isDeletingThreads } = useDeleteAllThreads();

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

  const handleNewThread = () => {
    setCurrentThreadId(undefined);
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

  const placeholder = useMemo(() => {
    if (!thread) {
      return "Describe your PIC circuit requirements";
    }

    if (thread.type === ThreadType.PIC) {
      return "Refine your design...";
    }

    if (thread.type === ThreadType.document) {
      return "Ask questions about the document...";
    }

    return "Ask me a question";
  }, [thread]);

  return (
    <div className="flex h-full w-full">
      <div className="flex-0 flex flex-col">
        <HistorySidebar 
          onDeleteAll={handleDeleteAllThreads}
          onThreadSelect={handleThreadSelect}
          threads={threadList ?? []}
          currentThreadId={currentThreadId}
          isLoading={isThreadListLoading}
          isDeleting={isDeletingThreads}
        />
      </div>
      <button
        disabled={isPostQueryLoading}
        onClick={handleNewThread}
        className="m-4 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="New Thread"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>
      <div className="flex-1 flex flex-col h-full">
        {thread || isPostQueryLoading ? (
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <MessagesArea thread={thread} isLoading={isPostQueryLoading} currentQueryIndex={currentQueryIndex} setCurrentQueryIndex={setCurrentQueryIndex} />
            </div>
            <div className="flex-none p-4">
              <ChatInput 
                onSendMessage={onSendMessage} 
                isLoading={isPostQueryLoading} 
                placeholder={placeholder}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="mx-auto w-full px-4 max-w-4xl">
              <h1 className="font-bold text-gray-800 dark:text-white mb-2">
                What would you like to do?
              </h1>
              <ChatInput 
                onSendMessage={onSendMessage} 
                isLoading={isPostQueryLoading} 
                placeholder={placeholder}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
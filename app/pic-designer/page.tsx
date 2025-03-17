'use client';

import { ChatInput } from './components/ChatInput';
import { MessagesArea } from './components/MessagesArea';
import { usePicDesigner } from './hooks/usePicDesigner';

export default function PICDesigner() {
  const { queries, isInitialState, isLoading, handleSendMessage, currentQueryIndex, setCurrentQueryIndex } = usePicDesigner();

  return (
    <div className="flex flex-col max-w-4xl w-full h-full">
      {!isInitialState ? (
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <MessagesArea 
              queries={queries}
              currentQueryIndex={currentQueryIndex}
              setCurrentQueryIndex={setCurrentQueryIndex}
            />
          </div>
          <div className="flex-none p-4">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto w-full px-4">
            <h1 className="font-bold text-gray-800 dark:text-white mb-2">
              What PIC would you like to build today?
            </h1>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
} 
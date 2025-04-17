interface InitialStepProps {
    onStartSelection: () => void;
}

export function InitialStep({ onStartSelection }: InitialStepProps) {
    return (
        <div 
            className="absolute inset-0 flex items-center justify-center bg-black/10 cursor-pointer"
            onClick={onStartSelection}
        >
            <div className="bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-lg shadow-lg">
                <span className="text-primary-500 font-medium">Create digital twin</span>
            </div>
        </div>
    );
} 
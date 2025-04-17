interface SelectedPlotAreaProps {
    left: number;
    top: number;
    width: number;
    height: number;
    onReset: () => void;
}

export function SelectedPlotArea({ left, top, width, height, onReset }: SelectedPlotAreaProps) {
    return (
        <>
            <button
                onClick={onReset}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors z-20"
            >
                <span className="text-sm text-gray-700 dark:text-gray-300">Reset</span>
            </button>
            <div 
                className="absolute bg-black/10 dark:bg-white/10"
                style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
        </>
    );
} 
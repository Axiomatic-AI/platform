import { usePostPlotPoints } from '../hooks/usePostPlotPoints';
import { useEffect, useState } from 'react';
import { PlotPointsResponse } from '../types';
import { Plot } from './Plot';
import { Snackbar } from './Snackbar';

interface SelectedPlotAreaProps {
    left: number;
    top: number;
    width: number;
    height: number;
    onReset: () => void;
    selectedImage: string;
}

export function SelectedPlotArea({ left, top, width, height, onReset, selectedImage }: SelectedPlotAreaProps) {
    const { mutate: postPlotPoints, isPending, error } = usePostPlotPoints();
    const [plotData, setPlotData] = useState<PlotPointsResponse | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    useEffect(() => {
        postPlotPoints({
            plotImgBase64: selectedImage,
            coordinates: {
                x: left,
                y: top,
                width,
                height
            }
        }, {
            onSuccess: (data) => {
                setPlotData(data);
            }
        });
    }, [selectedImage, left, top, width, height, postPlotPoints]);

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
            >
                {plotData && <Plot data={plotData} />}
            </div>
            {isPending && (
                <div className="absolute w-full h-full flex justify-center items-center bg-black/10 dark:bg-white/10 z-30">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
            )}
            {showError && (
                <Snackbar 
                    message="Failed to extract plot points. Please try again." 
                    onClose={() => setShowError(false)}
                    level="error"
                />
            )}
        </>
    );
} 
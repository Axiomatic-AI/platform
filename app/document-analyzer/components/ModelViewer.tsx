import { SelectedPlotArea } from "./SelectedPlotArea";
import { ModelViewerSidePanel } from "./ModelViewerSidePanel";
import { usePostPlotPoints } from '../hooks/usePostPlotPoints';
import { useEffect, useState } from 'react';
import { PlotPointsResponse } from '../types';
import { Snackbar } from './Snackbar';

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ModelViewerProps {
    selectedImage: string;
    selectedCoordinates: SelectionCoordinates;
}

export function ModelViewer({ selectedImage, selectedCoordinates }: ModelViewerProps) {
    const { mutate: postPlotPoints, isPending, error } = usePostPlotPoints();
    const [plotData, setPlotData] = useState<PlotPointsResponse | null>(null);
    const [showError, setShowError] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    useEffect(() => {
        postPlotPoints({
            plotImgBase64: selectedImage,
            coordinates: {
                x: selectedCoordinates.x,
                y: selectedCoordinates.y,
                width: selectedCoordinates.width,
                height: selectedCoordinates.height
            }
        }, {
            onSuccess: (data) => {
                setPlotData(data);
                // Select all series by default
                setSelectedSeries(data.extractedSeries.map(series => series.id));
            }
        });
    }, [selectedImage, selectedCoordinates, postPlotPoints]);

    return (
        <div className="flex h-full space-x-6">
            {/* Side Panel */}
            <div className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <ModelViewerSidePanel 
                    plotData={plotData}
                    isPending={isPending}
                    selectedSeries={selectedSeries}
                    onSeriesChange={setSelectedSeries}
                />
            </div>

            {/* Image Area */}
            <div className="flex-1 relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <SelectedPlotArea 
                    left={selectedCoordinates.x}
                    top={selectedCoordinates.y}
                    width={selectedCoordinates.width}
                    height={selectedCoordinates.height}
                    selectedImage={selectedImage}
                    series={plotData?.extractedSeries || []}
                    selectedSeries={selectedSeries}
                    isPending={isPending}
                />
            </div>
            {showError && (
                <Snackbar 
                    message="Failed to extract plot points. Please try again." 
                    onClose={() => setShowError(false)}
                    level="error"
                />
            )}
        </div>
    );
} 
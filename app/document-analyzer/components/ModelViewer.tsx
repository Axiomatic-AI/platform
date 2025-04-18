import { SelectedPlotArea } from "./SelectedPlotArea";
import { ModelViewerSidePanel } from "./ModelViewerSidePanel";
import { PlotPointsResponse, Series } from '../types';

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ModelViewerProps {
    selectedImage: string;
    selectedCoordinates: SelectionCoordinates;
    series: Series[];
    plotData: PlotPointsResponse | null;
    isPending: boolean;
    selectedSeriesIds: string[];
    onSeriesChange: (series: string[]) => void;
}

export function ModelViewer({ 
    selectedImage, 
    selectedCoordinates, 
    series,
    plotData,
    isPending,
    selectedSeriesIds,
    onSeriesChange 
}: ModelViewerProps) {
    return (
        <div className="flex h-full space-x-6">
            {/* Side Panel */}
            <div className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 px-4 py-3">
                <ModelViewerSidePanel 
                    plotData={plotData}
                    isPending={isPending}
                    selectedSeries={selectedSeriesIds}
                    onSeriesChange={onSeriesChange}
                />
            </div>

            {/* Image Area */}
            <div className="flex-1 relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <SelectedPlotArea 
                    selectedImage={selectedImage}
                    series={series}
                    isPending={isPending}
                />
            </div>
        </div>
    );
} 
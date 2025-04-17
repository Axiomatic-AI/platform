import { PlotPointsResponse } from '../types';

interface ModelViewerSidePanelProps {
    plotData: PlotPointsResponse | null;
    isPending: boolean;
    selectedSeries: string[];
    onSeriesChange: (series: string[]) => void;
}

export function ModelViewerSidePanel({ plotData, isPending, selectedSeries, onSeriesChange }: ModelViewerSidePanelProps) {
    const handleSeriesToggle = (seriesName: string) => {
        if (selectedSeries.includes(seriesName)) {
            onSeriesChange(selectedSeries.filter(s => s !== seriesName));
        } else {
            onSeriesChange([...selectedSeries, seriesName]);
        }
    };

    return (
        <div className="space-y-4">
            {isPending ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
            ) : plotData ? (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Series</h3>
                    <div className="space-y-1">
                        {plotData.extractedSeries.map((series) => (
                            <label key={series.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedSeries.includes(series.id)}
                                    onChange={() => handleSeriesToggle(series.id)}
                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{series.id}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    No plot data available
                </div>
            )}
        </div>
    );
} 
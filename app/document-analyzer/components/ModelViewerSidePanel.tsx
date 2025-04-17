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
        <div className="space-y-2">
            {isPending ? (
                <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
                </div>
            ) : plotData ? (
                <div className="space-y-4">
                    <div className="flex items-baseline justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-2 mb-2">Series Selection</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedSeries.length} selected
                        </span>
                    </div>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                        {plotData.extractedSeries.map((series) => (
                            <label 
                                key={series.id} 
                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedSeries.includes(series.id)}
                                    onChange={() => handleSeriesToggle(series.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{series.id}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No plot data available</p>
                </div>
            )}
        </div>
    );
} 
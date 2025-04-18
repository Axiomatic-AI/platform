import { ImageSelector } from "./ImageSelector";
import { ModelViewer } from "./ModelViewer";
import { Snackbar } from "./Snackbar";
import { useModelCreator } from "../hooks/useModelCreator";

interface ModelCreatorProps {
    imageSrc: string;
    documentId: string;
    imageId: string;
    onClose?: () => void;
}

export function ModelCreator({ imageSrc, documentId, imageId, onClose }: ModelCreatorProps) {
    const {
        selectedImage,
        selectedCoordinates,
        currentStep,
        isSaving,
        plotData,
        selectedSeriesIds,
        showError,
        isPending,
        selectedSeries,
        
        handlePlotPoints,
        handleReset,
        handleSave,
        setShowError,
        setSelectedSeriesIds
    } = useModelCreator({ documentId, imageId });

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center space-x-4">
                    {currentStep === 'selecting' ? (
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-sm font-medium">Begin by selecting the plot area</span>
                        </div>
                    ) : (
                        <button
                            onClick={handleReset}
                            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md border border-gray-200 dark:border-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Reset</span>
                        </button>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {currentStep === 'selected' && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Save</span>
                                </>
                            )}
                        </button>
                    )}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden p-6">
                {currentStep === 'selecting' ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <ImageSelector 
                            onSelect={handlePlotPoints}
                            imageSrc={imageSrc}
                        />
                    </div>
                ) : selectedCoordinates && selectedImage && (
                    <ModelViewer 
                        selectedImage={selectedImage}
                        series={selectedSeries}
                        plotData={plotData}
                        isPending={isPending}
                        selectedSeriesIds={selectedSeriesIds}
                        onSeriesChange={setSelectedSeriesIds}
                    />
                )}
            </div>
            {showError && (
                <Snackbar 
                    message="Failed to extract plot points. Please try again." 
                    onClose={() => setShowError(false)}
                    level="error"
                />
            )}
        </div>
    )
} 
import { SelectedPlotArea } from "./SelectedPlotArea";

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
    return (
        <div className="flex h-full space-x-6">
            {/* Side Panel */}
            <div className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <span className="text-sm font-medium">Coming soon</span>
                </div>
            </div>

            {/* Image Area */}
            <div className="flex-1 relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <SelectedPlotArea 
                    left={selectedCoordinates.x}
                    top={selectedCoordinates.y}
                    width={selectedCoordinates.width}
                    height={selectedCoordinates.height}
                    selectedImage={selectedImage}
                />
                <img 
                    src={selectedImage} 
                    alt={'Selected Plot Area'} 
                    className="w-full h-full object-contain" 
                />
            </div>
        </div>
    );
} 
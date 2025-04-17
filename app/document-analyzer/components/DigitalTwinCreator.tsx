import { useState } from "react";
import { ImageSelector } from "./ImageSelector";
import { SelectedPlotArea } from "./SelectedPlotArea";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Step = 'selecting' | 'selected';

interface DigitalTwinCreatorProps {
    imageSrc: string;
    onClose?: () => void;
}

export function DigitalTwinCreator({ imageSrc, onClose }: DigitalTwinCreatorProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState<SelectionCoordinates | null>(null)
    const [currentStep, setCurrentStep] = useState<Step>('selecting')

    const handlePlotPoints = async (selectedImageBase64: string, coordinates: SelectionCoordinates) => {
        setSelectedImage(selectedImageBase64)
        setSelectedCoordinates(coordinates)
        setCurrentStep('selected')
    }

    const handleReset = () => {
        setSelectedCoordinates(null)
        setCurrentStep('selecting')
    }

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
                            <span className="text-sm font-medium">Drag to select the plot area</span>
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

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden p-6">
                <div className="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    {currentStep === 'selecting' && (
                        <ImageSelector 
                            onSelect={handlePlotPoints}
                            imageSrc={imageSrc}
                        />
                    )}
                    
                    {currentStep === 'selected' && selectedCoordinates && selectedImage && (
                        <SelectedPlotArea 
                            left={selectedCoordinates.x}
                            top={selectedCoordinates.y}
                            width={selectedCoordinates.width}
                            height={selectedCoordinates.height}
                            selectedImage={selectedImage}
                        />
                    )}

                    <img 
                        src={imageSrc} 
                        alt={'Plot'} 
                        className="max-w-full max-h-full object-contain" 
                    />
                </div>
            </div>
        </div>
    )
} 
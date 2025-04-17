import { usePostPlotPoints } from "../hooks/usePostPlotPoints";
import { PlotPointsResponse } from "../types";
import { useEffect, useState } from "react";
import { ImageSelector } from "./ImageSelector";
import { ExtractedPlotOverlay } from "./ExtractedPlotOverlay";
import { SelectedPlotArea } from "./SelectedPlotArea";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Step = 'initial' | 'selecting' | 'selected';

export function FigureImage({ plotImgBase64 }: { plotImgBase64: string, imgId: string }) {
    const { mutateAsync: postPlotPoints, isPending: isPlotting } = usePostPlotPoints()
    const [plotData, setPlotData] = useState<PlotPointsResponse | null>(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState<SelectionCoordinates | null>(null)
    const [currentStep, setCurrentStep] = useState<Step>('initial')

    const handlePlotPoints = async (selectedImageBase64: string, coordinates: SelectionCoordinates) => {
        console.log('coordinates', coordinates)
        setSelectedCoordinates(coordinates)
        setCurrentStep('selected')
    }

    const handleStartSelection = () => {
        setCurrentStep('selecting')
    }

    const handleReset = () => {
        setSelectedCoordinates(null)
        setCurrentStep('initial')
    }

    return (
        <div className="relative">
            <span className="flex justify-center my-4 test-123 max-w-full h-auto m-0">
                <span className="relative m-0">
                    {currentStep === 'initial' && (
                        <div 
                            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                            onClick={handleStartSelection}
                        >
                            <div className="bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-lg shadow-lg">
                                <span className="text-primary-500 font-medium">Create digital twin</span>
                            </div>
                        </div>
                    )}
                    
                    {currentStep === 'selecting' && (
                        <ImageSelector 
                            onSelect={handlePlotPoints}
                            imageSrc={plotImgBase64}
                        />
                    )}
                    
                    {currentStep === 'selected' && selectedCoordinates && (
                        <SelectedPlotArea 
                            left={selectedCoordinates.x}
                            top={selectedCoordinates.y}
                            width={selectedCoordinates.width}
                            height={selectedCoordinates.height}
                            onReset={handleReset}
                        />
                    )}

                    <img 
                        src={plotImgBase64} 
                        alt={'Plot'} 
                        className="max-w-full h-auto m-0" 
                    />
                </span>
            </span>
        </div>
    )
}
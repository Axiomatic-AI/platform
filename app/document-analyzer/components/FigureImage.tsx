import { useState } from "react";
import { ImageSelector } from "./ImageSelector";
import { SelectedPlotArea } from "./SelectedPlotArea";
import { InitialStep } from "./InitialStep";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Step = 'initial' | 'selecting' | 'selected';

export function FigureImage({ plotImgBase64 }: { plotImgBase64: string, imgId: string }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState<SelectionCoordinates | null>(null)
    const [currentStep, setCurrentStep] = useState<Step>('initial')

    const handlePlotPoints = async (selectedImageBase64: string, coordinates: SelectionCoordinates) => {
        setSelectedImage(selectedImageBase64)
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
                        <InitialStep onStartSelection={handleStartSelection} />
                    )}
                    
                    {currentStep === 'selecting' && (
                        <ImageSelector 
                            onSelect={handlePlotPoints}
                            imageSrc={plotImgBase64}
                        />
                    )}
                    
                    {currentStep === 'selected' && selectedCoordinates && selectedImage && (
                        <SelectedPlotArea 
                            left={selectedCoordinates.x}
                            top={selectedCoordinates.y}
                            width={selectedCoordinates.width}
                            height={selectedCoordinates.height}
                            onReset={handleReset}
                            selectedImage={selectedImage}
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
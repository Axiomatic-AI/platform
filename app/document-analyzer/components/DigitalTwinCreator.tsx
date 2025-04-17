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
}

export function DigitalTwinCreator({ imageSrc }: DigitalTwinCreatorProps) {
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
        <div className="relative">
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
                    onReset={handleReset}
                    selectedImage={selectedImage}
                />
            )}

            <img 
                src={imageSrc} 
                alt={'Plot'} 
                className="max-w-full h-auto m-0" 
            />
        </div>
    )
} 
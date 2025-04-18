import { useState, useEffect } from "react";
import { Series, PlotPointsResponse } from "../types";
import { usePostPlotPoints } from "./usePostPlotPoints";
import { useSaveModel } from "./useSaveModel";
import { useGetModel } from "./useGetModel";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Step = 'selecting' | 'selected';

interface UseModelCreatorProps {
    documentId: string;
    imageId: string;
}

interface UseModelCreatorReturn {
    // State
    selectedImagePart: string | null;
    selectedCoordinates: SelectionCoordinates | null;
    currentStep: Step;
    plotData: PlotPointsResponse | null;
    selectedSeriesIds: string[];
    errorMessage: string | null;
    isPending: boolean;
    isSaving: boolean;
    isLoading: boolean;
    selectedSeries: Series[];
    
    // Actions
    handlePlotPoints: (selectedImageBase64: string, coordinates: SelectionCoordinates) => void;
    handleReset: () => void;
    handleSave: () => Promise<void>;
    setErrorMessage: (message: string | null) => void;
    setSelectedSeriesIds: (ids: string[]) => void;
}

export function useModelCreator({ documentId, imageId }: UseModelCreatorProps): UseModelCreatorReturn {
    const [selectedImagePart, setSelectedImagePart] = useState<string | null>(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState<SelectionCoordinates | null>(null)
    const [currentStep, setCurrentStep] = useState<Step>('selecting')
    const [plotData, setPlotData] = useState<PlotPointsResponse | null>(null)
    const [selectedSeriesIds, setSelectedSeriesIds] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { mutate: postPlotPoints, isPending } = usePostPlotPoints();
    const { mutate: saveModel, isPending: isSaving } = useSaveModel();
    const { data: savedModel, isLoading } = useGetModel(documentId, imageId);

    useEffect(() => {
        if (savedModel) {
            setSelectedImagePart(savedModel.selectedImage);
            setPlotData({ extractedSeries: savedModel.plotData.series } as PlotPointsResponse);
            setCurrentStep('selected');
        }
    }, [savedModel]);

    useEffect(() => {
        if (selectedImagePart && selectedCoordinates) {
            postPlotPoints({
                plotImgBase64: selectedImagePart,
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
                    setSelectedSeriesIds(data.extractedSeries.map(series => series.id));
                }
            });
        }
    }, [selectedImagePart, selectedCoordinates, postPlotPoints]);

    const handlePlotPoints = async (selectedImageBase64: string, coordinates: SelectionCoordinates) => {
        setSelectedImagePart(selectedImageBase64)
        setSelectedCoordinates(coordinates)
        setCurrentStep('selected')
    }

    const handleReset = () => {
        setSelectedCoordinates(null)
        setPlotData(null)
        setSelectedSeriesIds([])
        setCurrentStep('selecting')
    }

    const handleSave = async () => {
        if (!selectedImagePart || !plotData?.extractedSeries.length) return
        
        saveModel({
            documentId,
            imageId,
            selectedImage: selectedImagePart,
            plotData: { series: plotData.extractedSeries }
        });
    }

    const selectedSeries = plotData?.extractedSeries.filter(series => selectedSeriesIds.includes(series.id)) || [];

    return {
        // State
        selectedImagePart,
        selectedCoordinates,
        currentStep,
        plotData,
        selectedSeriesIds,
        errorMessage,
        isPending,
        isSaving,
        isLoading,
        selectedSeries,
        
        // Actions
        handlePlotPoints,
        handleReset,
        handleSave,
        setErrorMessage,
        setSelectedSeriesIds
    }
} 
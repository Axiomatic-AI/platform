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
    selectedImage: string | null;
    selectedCoordinates: SelectionCoordinates | null;
    currentStep: Step;
    plotData: PlotPointsResponse | null;
    selectedSeriesIds: string[];
    showError: boolean;
    isPending: boolean;
    isSaving: boolean;
    isLoading: boolean;
    selectedSeries: Series[];
    
    // Actions
    handlePlotPoints: (selectedImageBase64: string, coordinates: SelectionCoordinates) => void;
    handleReset: () => void;
    handleSave: () => Promise<void>;
    setShowError: (show: boolean) => void;
    setSelectedSeriesIds: (ids: string[]) => void;
}

export function useModelCreator({ documentId, imageId }: UseModelCreatorProps): UseModelCreatorReturn {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState<SelectionCoordinates | null>(null)
    const [currentStep, setCurrentStep] = useState<Step>('selecting')
    const [plotData, setPlotData] = useState<PlotPointsResponse | null>(null)
    const [selectedSeriesIds, setSelectedSeriesIds] = useState<string[]>([])
    const [showError, setShowError] = useState(false)

    const { mutate: postPlotPoints, isPending } = usePostPlotPoints();
    const { mutate: saveModel, isPending: isSaving } = useSaveModel();
    const { data: savedModel, isLoading } = useGetModel(documentId, imageId);

    useEffect(() => {
        if (savedModel) {
            setSelectedImage(savedModel.selectedImage);
            setPlotData({ extractedSeries: savedModel.plotData.series } as PlotPointsResponse);
            setCurrentStep('selected');
        }
    }, [savedModel]);

    useEffect(() => {
        if (selectedImage && selectedCoordinates) {
            postPlotPoints({
                plotImgBase64: selectedImage,
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
    }, [selectedImage, selectedCoordinates, postPlotPoints]);

    const handlePlotPoints = async (selectedImageBase64: string, coordinates: SelectionCoordinates) => {
        setSelectedImage(selectedImageBase64)
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
        if (!selectedImage || !plotData?.extractedSeries.length) return
        
        saveModel({
            documentId,
            imageId,
            selectedImage,
            plotData: { series: plotData.extractedSeries }
        });
    }

    const selectedSeries = plotData?.extractedSeries.filter(series => selectedSeriesIds.includes(series.id)) || [];

    return {
        // State
        selectedImage,
        selectedCoordinates,
        currentStep,
        plotData,
        selectedSeriesIds,
        showError,
        isPending,
        isSaving,
        isLoading,
        selectedSeries,
        
        // Actions
        handlePlotPoints,
        handleReset,
        handleSave,
        setShowError,
        setSelectedSeriesIds
    }
} 
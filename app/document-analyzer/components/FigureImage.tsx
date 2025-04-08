import { usePostPlotPoints } from "../hooks/usePostPlotPoints";
import { PlotPointsResponse } from "../types";
import { useEffect, useState } from "react";
import { ImageSelector } from "./ImageSelector";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function FigureImage({ plotImgBase64 }: { plotImgBase64: string, imgId: string }) {
    const { mutateAsync: postPlotPoints, isPending: isPlotting } = usePostPlotPoints()
    const [plotData, setPlotData] = useState<PlotPointsResponse | null>(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState<SelectionCoordinates | null>(null)

    const handlePlotPoints = async (imageToAnalyze: string = plotImgBase64, coordinates?: SelectionCoordinates) => {
        const response = await postPlotPoints({ 
            plotImgBase64: imageToAnalyze,
        })
        coordinates && setSelectedCoordinates(coordinates)
        setPlotData(response)
    }

    const originRelativeToSelectedCoordinates = selectedCoordinates && plotData?.axesInfo ? {
        x: selectedCoordinates?.x + plotData?.axesInfo.origin[0],
        y: plotData?.axesInfo.origin[1] + selectedCoordinates?.y - plotData?.axesInfo.yAxisLen
    } : null

    if (plotData) {
        return (
            <span className="flex justify-center my-4 test-123 max-w-full h-auto m-0">
                <span className="relative m-0">
                    <img src={plotImgBase64} alt={'Plot'} className="w-auto h-auto m-0" onClick={() => handlePlotPoints()} />
                    <div 
                        className="absolute border-2 border-primary-500/50 bg-primary-500/10"
                        style={{
                            left: `${originRelativeToSelectedCoordinates?.x}px`,
                            top: `${originRelativeToSelectedCoordinates?.y}px`,
                            width: `${plotData.axesInfo.xAxisLen}px`,
                            height: `${plotData.axesInfo.yAxisLen}px`,
                        }}
                    />
                </span>
            </span>
        )
    }

    return (
        <ImageSelector onSelect={(selectedImage, coordinates) => handlePlotPoints(selectedImage, coordinates)}>
            <span className="relative">
                <img 
                    src={plotImgBase64} 
                    alt={'Plot'} 
                    className="max-w-full h-auto" 
                />
                {isPlotting && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></span>
                    </span>
                )}
            </span>
        </ImageSelector>
    )
}
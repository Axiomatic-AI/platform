import { PlotPointsResponse } from "../types";

interface ExtractedPlotOverlayProps {
    plotData: PlotPointsResponse;
    originRelativeToSelectedCoordinates: {
        x: number;
        y: number;
    };
}

export function ExtractedPlotOverlay({ plotData, originRelativeToSelectedCoordinates }: ExtractedPlotOverlayProps) {
    console.log(plotData)
    return (
        <>
            <span 
                className="absolute border-2 border-primary-500/50 bg-primary-500/10"
                style={{
                    left: `${originRelativeToSelectedCoordinates.x}px`,
                    top: `${originRelativeToSelectedCoordinates.y}px`,
                    width: `${plotData.axesInfo.xAxisLen}px`,
                    height: `${plotData.axesInfo.yAxisLen}px`,
                }}
            />
            {Object.entries(plotData.extractedPoints).map(([seriesName, points]) => (
                <span key={seriesName} className="absolute">
                    {points.map((point, index) => (
                        point.imgCoordX !== undefined && point.imgCoordY !== undefined && (
                            <span
                                key={`${seriesName}-${index}`}
                                className="absolute w-2 h-2 rounded-full bg-red-500 transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: `${originRelativeToSelectedCoordinates.x + point.imgCoordX}px`,
                                    top: `${originRelativeToSelectedCoordinates.y + point.imgCoordY}px`,
                                }}
                            />
                        )
                    ))}
                </span>
            ))}
        </>
    );
} 
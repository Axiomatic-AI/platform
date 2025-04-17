import { PlotPointsResponse } from '../types';

interface PlotProps {
    data: PlotPointsResponse;
}

export function Plot({ data }: PlotProps) {
    const { origin, extractedSeries, xAxisLen, yAxisLen } = data;

    return (
        <div className="relative w-full h-full">
            {extractedSeries.map((series) => (
                series.points.map((point, index) => (
                    <div
                        key={`${series.id}-${index}`}
                        className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${(origin[0] + point.percentageCoordX * xAxisLen) * 100}%`,
                            top: `${(1 - (origin[1] + point.percentageCoordY * yAxisLen)) * 100}%`,
                            backgroundColor: `rgb(${series.color.join(',')})`,
                        }}
                    />
                ))
            ))}
        </div>
    );
} 
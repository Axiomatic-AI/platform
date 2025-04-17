import { PlotPointsResponse } from '../types';

interface PlotProps {
    data: PlotPointsResponse;
}

export function Plot({ data }: PlotProps) {
    const { origin, extractedSeries, xAxisLen, yAxisLen } = data;
    console.log(data);

    return (
        <div className="relative w-full h-full">
            {/* Bounding Box */}
            <div 
                className="absolute border-2 border-dashed border-gray-400 dark:border-gray-600"
                style={{
                    left: `${origin[0] * 100}%`,
                    top: `${(1 - origin[1]) * 100}%`,
                    width: `${xAxisLen * 100}%`,
                    height: `${yAxisLen * 100}%`,
                    transform: 'translateY(-100%)',
                }}
            >
            </div>

            {/* Plot Points */}
            {extractedSeries.map((series) => (
                series.points.map((point, index) => (
                    <div
                        key={`${series.id}-${index}`}
                        className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${point.percentageCoordX * 100}%`,
                            top: `${(1 - point.percentageCoordY) * 100}%`,
                            backgroundColor: `rgb(${series.color.join(',')})`,
                        }}
                    />
                ))
            ))}
        </div>
    );
} 
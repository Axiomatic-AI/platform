import { PlotPointsResponse } from '../types';

interface PlotProps {
    data: PlotPointsResponse;
}

export function Plot({ data }: PlotProps) {
    const { origin, extractedSeries, xAxisLen, yAxisLen } = data;

    return (
        <div className="relative w-full h-full">
            {/* Axes */}
            <div 
                className="absolute bg-gray-800 dark:bg-gray-200"
                style={{
                    left: `${origin[0]}px`,
                    top: `${origin[1]}px`,
                    width: `${xAxisLen}px`,
                    height: '1px',
                }}
            />
            <div 
                className="absolute bg-gray-800 dark:bg-gray-200"
                style={{
                    left: `${origin[0]}px`,
                    top: `${origin[1] - yAxisLen}px`,
                    width: '1px',
                    height: `${yAxisLen}px`,
                }}
            />

            {/* Plot points */}
            {extractedSeries.map((series) => (
                <div key={series.id}>
                    {series.points.map((point, index) => (
                        <div
                            key={`${series.id}-${index}`}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                left: `${point.percentageCoordX}%`,
                                top: `${point.percentageCoordY}%`,
                                backgroundColor: `rgb(${series.colour.join(',')})`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
} 
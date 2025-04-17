import { PlotPointsResponse } from '../types';

interface PlotProps {
    data: PlotPointsResponse;
}

const COLOR_PALETTE = [
    'bg-blue-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-pink-500',
    'bg-gray-500',
    'bg-emerald-500',
    'bg-cyan-500',
];

export function Plot({ data }: PlotProps) {
    const { extractedSeries } = data;

    return (
        <div className="flex">
            {extractedSeries.map((series, seriesIndex) => (
                series.points.map((point, index) => (
                    <div
                        key={`${series.id}-${index}`}
                        className={`absolute w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${COLOR_PALETTE[seriesIndex % COLOR_PALETTE.length]}`}
                        style={{
                            left: `${point.percentageCoordX * 100}%`,
                            bottom: `${point.percentageCoordY * 100}%`,
                        }}
                    />
                ))
            ))}
        </div>
    );
} 
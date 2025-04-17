import { Series } from '../types';

interface PlotProps {
    series: Series[];
    selectedSeries: string[];
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

export function Plot({ series, selectedSeries }: PlotProps) {
    return (
        <div className="flex">
            {series
                .filter(series => selectedSeries.includes(series.id))
                .map((series, seriesIndex) => (
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
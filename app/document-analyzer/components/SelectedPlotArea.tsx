import { Series } from '../types';
import { Plot } from './Plot';

interface SelectedPlotAreaProps {
    selectedImage: string;
    series: Series[];
    isPending: boolean;
}

export function SelectedPlotArea({ selectedImage, series, isPending }: SelectedPlotAreaProps) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative m-0 p-0">
                    <img 
                        src={selectedImage} 
                        alt="Selected Plot Area" 
                        className="w-full h-full object-contain m-0 p-0" 
                    />
                    <Plot series={series} />
                </div>
            </div>
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10 z-30">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
            )}
        </div>
    );
} 
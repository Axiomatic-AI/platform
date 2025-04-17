import { PlotPointsResponse } from "../types";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart } from 'recharts';

interface ExtractedPlotOverlayProps {
    plotData: PlotPointsResponse;
    left: number;
    top: number;
    width: number;
    height: number;
}

export function ExtractedPlotOverlay({ plotData, top, left, width, height }: ExtractedPlotOverlayProps) {
    console.log(plotData);

    return (
        <span className="flex flex-col space-y-4">
            {/* Original overlay */}
            <span 
                className="absolute border-2 border-primary-500/50 bg-primary-500/10"
                style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            />
        </span>
    );
} 
import { getClient } from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { PlotPointsResponse, Point, Series } from "../types";

interface PlotPointsRequest {
    plotImgBase64: string;
    coordinates?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

function mapSeries(series: any): Series[] {
  return series.map(({ id, color, points }: { id: string, color: string[], points: Record<string, any>}) => ({
    id,
    color,
    points: points.map((point: any) => ({ valueX: point.value_x, valueY: point.value_y, percentageCoordX: point.percentage_coord_x, percentageCoordY: point.percentage_coord_y }))
  }));
}

function mapServerResponseToPlotPointsResponse(response: any): PlotPointsResponse {
  return {
    origin: response.origin,
    extractedSeries: mapSeries(response.extracted_series),
    xAxisLen: response.x_axis_len,
    yAxisLen: response.y_axis_len,
  } as PlotPointsResponse
}

async function postPlotPoints({ plotImgBase64, coordinates }: PlotPointsRequest) {
  const base64Response = await fetch(plotImgBase64);
  const blob = await base64Response.blob();
  const file = new File([blob], 'plot.png', { type: 'image/png' });

  const formData = new FormData();
  formData.append('plot_img', file);
  formData.append('get_img_coords', 'true');
  
  if (coordinates) {
    formData.append('x', coordinates.x.toString());
    formData.append('y', coordinates.y.toString());
    formData.append('width', coordinates.width.toString());
    formData.append('height', coordinates.height.toString());
  }

  const response = await getClient().post<PlotPointsResponse>('/document/plot/points?v2=true', formData, {
    isFormData: true
  });

  if (!response) {
    throw new Error('No response received from the server');
  }

  return mapServerResponseToPlotPointsResponse(response);
}

export function usePostPlotPoints() {
  return useMutation({
    mutationFn: postPlotPoints,
    mutationKey: ['plotPoints'],
  });
}


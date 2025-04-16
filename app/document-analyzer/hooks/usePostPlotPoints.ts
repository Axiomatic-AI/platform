import { getClient } from "@lib/api";
import { useMutation } from "@tanstack/react-query";
import { PlotPointsResponse, Point } from "../types";

interface PlotPointsRequest {
    plotImgBase64: string;
    coordinates?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}


type Series = {
  colour: string;
  points: ServerPoint[]
}

type ServerPoint = {
  value_x: number;
  value_y: number
}

function mapPoints(points: any): Point[] {
  return points.map((point: any) => ({ valueX: point.value_x, valueY: point.value_y }));
}

function mapServerResponseToPlotPointsResponse(response: any): PlotPointsResponse {
  return {
    axesInfo: {
      origin: response.axes_info.origin,
      xAxisLen: response.axes_info.x_axis_len,
      xContour: response.axes_info.x_contour,
      xTickMapping: response.axes_info.x_tick_mapping,
      xTickMarks: response.axes_info.x_tick_marks,
      xTickVals: response.axes_info.x_tick_vals,
      yAxisLen: response.axes_info.y_axis_len,
      yContour: response.axes_info.y_contour,
      yTickMapping: response.axes_info.y_tick_mapping,
      yTickMarks: response.axes_info.y_tick_marks,
      yTickVals: response.axes_info.y_tick_vals,
    },
    extractedPoints: mapPoints(response.extracted_points.extracted_points),
    plotInfo: {
      blackGrayLine: response.plot_info.black_gray_line,
      gridLines: response.plot_info.grid_lines,
      numOfLines: response.plot_info.num_of_lines,
      xAxisMax: response.plot_info.x_axis_max,
      xAxisMin: response.plot_info.x_axis_min,
      xAxisName: response.plot_info.x_axis_name,
      xAxisTickVals: response.plot_info.x_axis_tick_vals,
      xAxisUnit: response.plot_info.x_axis_unit,
      xScale: response.plot_info.x_scale,
      yAxisMax: response.plot_info.y_axis_max,
      yAxisMin: response.plot_info.y_axis_min,
      yAxisName: response.plot_info.y_axis_name,
      yAxisTickVals: response.plot_info.y_axis_tick_vals,
      yAxisUnit: response.plot_info.y_axis_unit,
      yScale: response.plot_info.y_scale
    }
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


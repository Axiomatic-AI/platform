import { getClient } from "@lib/api";
import { useMutation } from "@tanstack/react-query";

interface PlotPointsRequest {
    plotImgBase64: string;
}

interface Point {
  valueX: number,
  valueY: number,
  imgCoordX?: number,
  imgCoordY?: number,
}

interface PlotPointsResponse {
  axesInfo: {
    origin: number[],
    xAxisLen: number,
    xContour?: number,
    xTickMapping: Record<number, number[]>,
    xTickMarks: number[][],
    xTickVals: number[][],
    yAxisLen: number,
    yContour?: number,
    yTickMapping: Record<number, number[]>,
    yTickMarks: number[][],
    yTickVals: number[][],
  },
  extractedPoints: Record<string, Point[]>,
  plotInfo: {
    blackGrayLine: boolean,
    gridLines: boolean,
    numOfLines: number,
    xAxisMax: number,
    xAxisMin: number,
    xAxisName: string,
    xAxisTickVals: number[],
    xAxisUnit: string,
    xScale: "string"
    yAxisMax: number,
    yAxisMin: number,
    yAxisName: string,
    yAxisTickVals: number[],
    yAxisUnit: string,
    yScale: "string"
  }
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
    extractedPoints: response.extracted_points,
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
    }
  } as PlotPointsResponse
}

async function postPlotPoints({ plotImgBase64 }: PlotPointsRequest) {
  const base64Response = await fetch(plotImgBase64);
  const blob = await base64Response.blob();
  const file = new File([blob], 'plot.png', { type: 'image/png' });

  const formData = new FormData();
  formData.append('plot_img', file);

  const response = await getClient().post<PlotPointsResponse>('/document/plot/points', formData, {
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
  });
}


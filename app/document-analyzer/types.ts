export interface Point {
  valueX: number,
  valueY: number,
  imgCoordX?: number,
  imgCoordY?: number,
}

export interface PlotPointsResponse {
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

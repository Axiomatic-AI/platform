export interface Point {
  valueX: number,
  valueY: number,
  percentageCoordX: number,
  percentageCoordY: number,
}

export interface Series {
  color: string[],
  id: string, 
  points: Point[]
}

export interface PlotPointsResponse {
  origin: number[],
  extractedSeries: Series[],
  xAxisLen: number,
  yAxisLen: number,
}

import { getClient } from "@lib/api";
import { useMutation } from "@tanstack/react-query";

interface PlotPointsRequest {
    plotImgBase64: string;
}

async function postPlotPoints({ plotImgBase64 }: PlotPointsRequest) {
  const base64Response = await fetch(plotImgBase64);
  const blob = await base64Response.blob();
  const file = new File([blob], 'plot.png', { type: 'image/png' });

  const formData = new FormData();
  formData.append('plot_img', file);

  const response = await getClient().post<any>('/document/plot/points', formData, {
    isFormData: true
  });
  return response;
}

export function usePostPlotPoints() {
  return useMutation({
    mutationFn: postPlotPoints,
  });
}


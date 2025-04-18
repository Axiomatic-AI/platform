import { useMutation } from "@tanstack/react-query";
import { saveModel } from "../actions";
import { PlotData } from "../types";

interface SaveModelRequest {
    documentId: string;
    imageId: string;
    selectedImage: string;
    plotData: PlotData;
}

export function useSaveModel() {
    return useMutation({
        mutationFn: async ({ documentId, imageId, selectedImage, plotData }: SaveModelRequest) => {
            return saveModel({
                documentId,
                imageId,
                selectedImage,
                plotData
            });
        },
        mutationKey: ['saveModel'],
    });
} 
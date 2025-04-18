import { useQuery } from "@tanstack/react-query";
import { getModel } from "../actions";
import { PlotData } from "../types";

interface SavedModel {
    selectedImage: string;
    plotData: string;
}

export function useGetModel(documentId: string, imageId: string) {
    return useQuery({
        queryKey: ['model', documentId, imageId],
        queryFn: async () => {
            const savedModel = await getModel(documentId, imageId);
            if (!savedModel || !savedModel.plotData) return null;

            return {
                selectedImage: savedModel.selectedImage,
                plotData: JSON.parse(savedModel.plotData as string) as PlotData
            };
        },
        enabled: !!documentId && !!imageId,
    });
} 
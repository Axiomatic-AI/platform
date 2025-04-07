import { usePostPlotPoints } from "../hooks/usePostPlotPoints";

export function FigureImage({ plotImgBase64 }: { plotImgBase64: string }) {
    const { mutateAsync: postPlotPoints, isPending: isPlotting } = usePostPlotPoints()

    const handlePlotPoints = async () => {
        const response = await postPlotPoints({ plotImgBase64 })
        console.log(response)
    }

    return (
        <span className="flex justify-center my-4 test-123">
            <img src={plotImgBase64} alt={'Plot'} className="max-w-full h-auto" onClick={handlePlotPoints} />
        </span>
    );
}
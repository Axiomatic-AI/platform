import { useRef, useState } from "react";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ImageSelectorProps {
    onSelect: (selectedImageBase64: string, coordinates: SelectionCoordinates) => void;
    imageSrc: string;
}

export function ImageSelector({ onSelect, imageSrc }: ImageSelectorProps) {
    const [selection, setSelection] = useState({ startX: 0, startY: 0, width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSelection({
            startX: e.clientX - rect.left,
            startY: e.clientY - rect.top,
            width: 0,
            height: 0
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSelection(prev => ({
            ...prev,
            width: e.clientX - rect.left - prev.startX,
            height: e.clientY - rect.top - prev.startY
        }));
    };

    const handleMouseUp = async () => {
        if (!isDragging) return;
        setIsDragging(false);

        // Create a canvas to capture the selected region
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx || !containerRef.current || !imageRef.current) return;

        // Get the natural dimensions of the image
        const imgNaturalWidth = imageRef.current.naturalWidth;
        const imgNaturalHeight = imageRef.current.naturalHeight;
        
        // Get the displayed dimensions of the image
        const displayedWidth = imageRef.current.width;
        const displayedHeight = imageRef.current.height;
        
        // Calculate scaling factors
        const scaleX = imgNaturalWidth / displayedWidth;
        const scaleY = imgNaturalHeight / displayedHeight;

        // Calculate the actual coordinates in the natural image space
        const naturalX = selection.startX * scaleX;
        const naturalY = selection.startY * scaleY;
        const selectionWidth = Math.abs(selection.width) * scaleX;
        const selectionHeight = Math.abs(selection.height) * scaleY;

        // Set canvas dimensions to match the natural selection size
        canvas.width = selectionWidth;
        canvas.height = selectionHeight;

        // Draw the selected region from the original image
        ctx.drawImage(
            imageRef.current,
            naturalX,
            naturalY,
            selectionWidth,
            selectionHeight,
            0,
            0,
            selectionWidth,
            selectionHeight
        );

        // Convert to base64
        const selectedImageBase64 = canvas.toDataURL('image/png');
        
        // Calculate the final coordinates
        const coordinates: SelectionCoordinates = {
            x: naturalX,
            y: naturalY,
            width: selectionWidth,
            height: selectionHeight
        };

        onSelect(selectedImageBase64, coordinates);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <div 
                ref={containerRef}
                className="relative cursor-crosshair w-full h-full"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <img 
                    ref={imageRef}
                    src={imageSrc}
                    alt="Plot"
                    className="w-full h-full object-contain p-0 m-0"
                />
                {isDragging && (
                    <div 
                        className="absolute border-2 border-primary-500 bg-primary-500/20"
                        style={{
                            left: `${selection.startX}px`,
                            top: `${selection.startY}px`,
                            width: `${selection.width}px`,
                            height: `${selection.height}px`,
                        }}
                    />
                )}
            </div>
        </div>
    );
} 
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
        console.log('handleMouseUp')
        console.log('isDragging', isDragging)
        if (!isDragging) return;
        setIsDragging(false);

        // Create a canvas to capture the selected region
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx || !containerRef.current) return;

        // Create a temporary image element
        const img = new Image();
        img.src = imageSrc;
        
        // Wait for the image to load
        await new Promise((resolve) => {
            img.onload = resolve;
        });

        // Set canvas dimensions to match selection
        canvas.width = Math.abs(selection.width);
        canvas.height = Math.abs(selection.height);

        // Draw the selected region
        ctx.drawImage(
            img,
            selection.startX,
            selection.startY,
            selection.width,
            selection.height,
            0,
            0,
            Math.abs(selection.width),
            Math.abs(selection.height)
        );

        // Convert to base64
        const selectedImageBase64 = canvas.toDataURL('image/png');
        
        // Calculate the final coordinates
        const coordinates: SelectionCoordinates = {
            x: selection.startX,
            y: selection.startY,
            width: Math.abs(selection.width),
            height: Math.abs(selection.height)
        };

        console.log('coordinates', coordinates)
        onSelect(selectedImageBase64, coordinates);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-lg shadow-lg z-20 pointer-events-none">
                <span className="text-sm text-gray-700 dark:text-gray-300">Drag to select the plot area</span>
            </div>
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
                    className="w-full h-full object-contain"
                    style={{ display: 'none' }}
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
import { useRef, useState } from "react";

interface SelectionCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ImageSelectorProps {
    children: React.ReactNode;
    onSelect: (selectedImageBase64: string, coordinates: SelectionCoordinates) => void;
}

export function ImageSelector({ children, onSelect }: ImageSelectorProps) {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState({ startX: 0, startY: 0, width: 0, height: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleStartSelection = () => {
        setIsSelecting(true);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isSelecting) return;
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
        if (!isDragging || !isSelecting) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSelection(prev => ({
            ...prev,
            width: e.clientX - rect.left - prev.startX,
            height: e.clientY - rect.top - prev.startY
        }));
    };

    const handleMouseUp = async () => {
        if (!isDragging || !isSelecting) return;
        setIsDragging(false);
        setIsSelecting(false);

        // Create a canvas to capture the selected region
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx || !containerRef.current) return;

        // Get the image element from the container
        const img = containerRef.current.querySelector('img');
        if (!img) return;

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

        onSelect(selectedImageBase64, coordinates);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleStartSelection}
                className="mb-2 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
            >
                Select Region
            </button>
            <div 
                ref={containerRef}
                className="relative cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {children}
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
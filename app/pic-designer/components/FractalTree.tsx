'use client';

import { useEffect, useState } from 'react';

interface Branch {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  depth: number;
  progress: number;
}

export function FractalTree() {
  const [branches, setBranches] = useState<Branch[]>([]);

  const generateTree = (x1: number, y1: number, angle: number, depth: number): Branch[] => {
    if (depth === 0) return [];

    const length = Math.min(80, 100 * Math.pow(0.7, 5 - depth));
    // Use negative cos for x (left-right spread) and negative sin for y (upward growth)
    const x2 = x1 - Math.cos(angle) * length;
    const y2 = y1 - Math.sin(angle) * length;

    const branch: Branch = {
      x1,
      y1,
      x2,
      y2,
      angle,
      depth,
      progress: 0
    };

    return [
      branch,
      ...generateTree(x2, y2, angle + 0.5, depth - 1),
      ...generateTree(x2, y2, angle - 0.5, depth - 1)
    ];
  };

  useEffect(() => {
    // Start from bottom center, angle 0 points upward
    const initialBranches = generateTree(400, 580, Math.PI / 2, 9);
    setBranches(initialBranches);

    // Sort branches by depth to ensure bottom-up growth
    const sortedBranches = [...initialBranches].sort((a, b) => b.depth - a.depth);
    setBranches(sortedBranches);

    // Animate the tree growth
    let frame = 0;
    const maxFrames = 300;
    
    const animate = () => {
      frame++;
      const progress = frame / maxFrames;
      
      setBranches(prev => 
        prev.map(branch => ({
          ...branch,
          // Slower growth for higher branches
          progress: Math.max(0, Math.min(1, (progress * 3 - (9 - branch.depth) * 0.2)))
        }))
      );

      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="800" height="600" className="max-w-full max-h-full">
        {branches.map((branch, i) => {
          const currentX2 = branch.x1 + (branch.x2 - branch.x1) * branch.progress;
          const currentY2 = branch.y1 + (branch.y2 - branch.y1) * branch.progress;
          
          return (
            <line
              key={i}
              x1={branch.x1}
              y1={branch.y1}
              x2={currentX2}
              y2={currentY2}
              stroke={`hsl(${120 + branch.depth * 15}, 70%, ${40 + branch.depth * 5}%)`}
              strokeWidth={Math.max(1, branch.depth)}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
} 
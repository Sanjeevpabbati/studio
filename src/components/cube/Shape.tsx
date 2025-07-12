'use client';
import React from 'react';
import type { ShapeType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ShapeProps extends React.SVGProps<SVGSVGElement> {
  type: ShapeType;
  color?: string;
}

const Shape: React.FC<ShapeProps> = ({ type, color = 'currentColor', className, ...props }) => {
  const svgContent = () => {
    switch (type) {
      case 'circle':
        return <circle cx="50" cy="50" r="40" fill={color} />;
      case 'square':
        return <rect x="10" y="10" width="80" height="80" fill={color} />;
      case 'triangle':
        return <polygon points="50,10 90,90 10,90" fill={color} />;
      case 'diamond':
        return <polygon points="50,10 90,50 50,90 10,50" fill={color} />;
      case 'plus':
        return <path d="M40 10 H60 V40 H90 V60 H60 V90 H40 V60 H10 V40 H40Z" fill={color} />;
      case 'star':
        return <polygon points="50,10 61,35 90,35 68,55 78,85 50,65 22,85 32,55 10,35 39,35" fill={color} />;
      default:
        return null;
    }
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      {...props}
    >
      {svgContent()}
    </svg>
  );
};

export default Shape;

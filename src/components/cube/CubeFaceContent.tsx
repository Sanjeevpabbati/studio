'use client';
import React from 'react';
import Image from 'next/image';
import type { ShapeDef } from '@/lib/types';
import Shape from './Shape';

interface CubeFaceContentProps {
  face: ShapeDef;
}

const CubeFaceContent: React.FC<CubeFaceContentProps> = ({ face }) => {
  return (
    <div className="cube-face-content">
      {face.imageUrl ? (
        <Image
          src={face.imageUrl}
          alt={`${face.name} logo`}
          fill
          className="object-cover"
          data-ai-hint={face.aiHint}
          priority={face.name === 'front'} // Prioritize loading the first visible image
        />
      ) : (
        <Shape type={face.type} color={face.color} className="w-full h-full" />
      )}
    </div>
  );
};

export default React.memo(CubeFaceContent);

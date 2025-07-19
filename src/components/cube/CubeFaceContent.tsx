
'use client';
import React from 'react';
import type { ShapeDef } from '@/lib/types';
import Image from 'next/image';

interface CubeFaceContentProps {
  face: ShapeDef;
}

const CubeFaceContent: React.FC<CubeFaceContentProps> = ({ face }) => {
  return (
    <div className="cube-face-content">
      <Image
        src={face.imageUrl}
        alt={`${face.quizFormat} quiz format`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        data-ai-hint={face.imageAiHint}
        priority={true}
      />
    </div>
  );
};

export default React.memo(CubeFaceContent);

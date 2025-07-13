'use client';
import React from 'react';
import type { ShapeDef } from '@/lib/types';

interface CubeFaceContentProps {
  face: ShapeDef;
}

const CubeFaceContent: React.FC<CubeFaceContentProps> = ({ face }) => {
  return (
    <div className="cube-face-content">
      {/* Content for cube faces is intentionally left blank */}
    </div>
  );
};

export default React.memo(CubeFaceContent);

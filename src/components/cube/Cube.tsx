'use client';
import React from 'react';
import type { CubeShapes, ShapeDef } from '@/lib/types';
import Shape from './Shape';
import './Cube.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CubeProps {
  rotation: { x: number; y: number };
  shapes: CubeShapes;
}

const CubeFaceContent: React.FC<{ face: ShapeDef }> = ({ face }) => {
  return (
    <div className="cube-face-content">
      {face.imageUrl ? (
        <Image
          src={face.imageUrl}
          alt={`${face.name} logo`}
          fill
          className="object-cover"
          data-ai-hint={face.aiHint}
        />
      ) : (
        <Shape type={face.type} color={face.color} className="w-full h-full" />
      )}
    </div>
  );
};

const Cube: React.FC<CubeProps> = ({ rotation, shapes }) => {
  return (
    <div className="scene">
      <motion.div
        className="cube"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="cube-face cube-face-front">
          <CubeFaceContent face={shapes.front} />
        </div>
        <div className="cube-face cube-face-back">
          <CubeFaceContent face={shapes.back} />
        </div>
        <div className="cube-face cube-face-right">
          <CubeFaceContent face={shapes.right} />
        </div>
        <div className="cube-face cube-face-left">
           <CubeFaceContent face={shapes.left} />
        </div>
        <div className="cube-face cube-face-top">
          <CubeFaceContent face={shapes.top} />
        </div>
        <div className="cube-face cube-face-bottom">
          <CubeFaceContent face={shapes.bottom} />
        </div>
      </motion.div>
    </div>
  );
};

export default Cube;

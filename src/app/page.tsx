'use client';
import React, { useState } from 'react';
import Cube from '@/components/cube/Cube';
import type { CubeShapes, FaceName } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const initialShapes: CubeShapes = {
  front: { name: 'front', type: 'circle', color: '#ef4444', aiHint: 'circle' },
  back: { name: 'back', type: 'square', color: '#3b82f6', aiHint: 'square' },
  right: { name: 'right', type: 'triangle', color: '#22c55e', aiHint: 'triangle' },
  left: { name: 'left', type: 'diamond', color: '#eab308', aiHint: 'diamond' },
  top: { name: 'top', type: 'plus', color: '#8b5cf6', aiHint: 'plus sign' },
  bottom: { name: 'bottom', type: 'star', color: '#ec4899', aiHint: 'star' },
};

export default function Home() {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [shapes, setShapes] = useState<CubeShapes>(initialShapes);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;
    const x = ((clientX / offsetWidth) * 2 - 1) * 30;
    const y = ((clientY / offsetHeight) * 2 - 1) * -30;
    setRotation({ x: y, y: x });
  };

  const handleShapeChange = (face: FaceName, newType: CubeShapes['front']['type']) => {
    setShapes(prevShapes => ({
      ...prevShapes,
      [face]: { ...prevShapes[face], type: newType },
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div 
          className="lg:col-span-2 flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
          onMouseMove={handleMouseMove}
        >
          <Cube rotation={rotation} shapes={shapes} />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customize Cube Faces</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(shapes) as FaceName[]).map(face => (
                <div key={face} className="space-y-2">
                  <Label htmlFor={`select-${face}`} className="capitalize">{face}</Label>
                   <Select
                    value={shapes[face].type}
                    onValueChange={(value) => handleShapeChange(face, value as CubeShapes['front']['type'])}
                  >
                    <SelectTrigger id={`select-${face}`}>
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="triangle">Triangle</SelectItem>
                      <SelectItem value="diamond">Diamond</SelectItem>
                      <SelectItem value="plus">Plus</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

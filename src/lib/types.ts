export type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'plus' | 'star';
export type FaceName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

export interface ShapeDef {
  name: FaceName;
  type: ShapeType;
  color: string;
  imageUrl?: string;
  aiHint?: string;
}

export type CubeShapes = {
  [key in FaceName]: ShapeDef;
};

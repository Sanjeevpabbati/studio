
export type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'plus' | 'star';
export type FaceName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
export type QuizFormat = 'T20' | 'ODI' | 'IPL' | 'WPL' | 'Test' | 'Core';

export interface Sponsor {
  name: string;
  logoUrl: string;
  aiHint: string;
}

export interface ShapeDef {
  name: FaceName;
  type: ShapeType;
  color: string;
  quizFormat: QuizFormat;
  imageUrl: string;
  imageAiHint: string;
  sponsor: Sponsor;
}

export type CubeShapes = {
  [key in FaceName]: ShapeDef;
};

// Quiz Types
export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

export interface Quiz {
  format: QuizFormat;
  questions: Question[];
}

export type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'plus' | 'star';
export type FaceName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
export type QuizFormat = 'T20' | 'ODI' | 'IPL' | 'WPL' | 'Test' | 'Mixed';

export interface ShapeDef {
  name: FaceName;
  type: ShapeType;
  color: string;
  quizFormat: QuizFormat;
  sponsor: {
    name: string;
    logoUrl: string;
    aiHint: string;
  };
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

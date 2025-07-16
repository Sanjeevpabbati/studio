import type { Quiz } from './types';
import { iplQuiz } from './quizzes/ipl';
import { t20Quiz } from './quizzes/t20';
import { odiQuiz } from './quizzes/odi';
import { wplQuiz } from './quizzes/wpl';
import { testQuiz } from './quizzes/test';
import { coreQuiz } from './quizzes/core';

export const quizzes: { [key: string]: Quiz } = {
  IPL: iplQuiz,
  T20: t20Quiz,
  ODI: odiQuiz,
  WPL: wplQuiz,
  Test: testQuiz,
  Core: coreQuiz,
};

export const getQuiz = (format: string): Quiz | undefined => {
  return quizzes[format];
};

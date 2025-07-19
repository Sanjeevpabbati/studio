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

// A simple in-memory cache to demonstrate a cost-saving pattern.
// In a real-world scenario with dynamic data, you might use a more persistent cache
// like Redis or simply fetch from Firestore only when necessary.
const quizCache = new Map<string, Quiz>();

export const getQuiz = (format: string): Quiz | undefined => {
  if (quizCache.has(format)) {
    return quizCache.get(format);
  }

  const quiz = quizzes[format];
  if (quiz) {
    // This is a good place to do any one-time processing or validation.
    // By caching the result, you avoid doing this work on every request.
    quizCache.set(format, quiz);
  }

  return quiz;
};

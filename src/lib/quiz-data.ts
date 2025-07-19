import type { Quiz, QuizFormat } from './types';

// A simple in-memory cache to demonstrate a cost-saving pattern.
// In a real-world scenario with dynamic data, you might use a more persistent cache
// like Redis or simply fetch from a database only when necessary.
const quizCache = new Map<string, Quiz>();

export const getQuiz = async (format: QuizFormat): Promise<Quiz | undefined> => {
  if (quizCache.has(format)) {
    return quizCache.get(format);
  }

  try {
    // Dynamically import the quiz data based on the format.
    // This creates separate JavaScript chunks for each quiz,
    // which are only loaded when requested.
    const module = await import(`./quizzes/${format.toLowerCase()}`);
    const quiz = module[`${format.toLowerCase()}Quiz`];
    
    if (quiz) {
      quizCache.set(format, quiz);
      return quiz;
    }
  } catch (error) {
    console.error(`Failed to load quiz for format: ${format}`, error);
    return undefined;
  }

  return undefined;
};

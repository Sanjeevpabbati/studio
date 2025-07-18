import type { Quiz } from '../types';

export const odiQuiz: Quiz = {
  format: 'ODI',
  questions: [
    {
      question: 'An ODI match consists of how many overs per side?',
      options: ['20', '40', '50', '60'],
      correctAnswer: 2,
      hint: 'This is the standard format for a One Day International.'
    },
    {
      question: 'What is the maximum number of overs a bowler can bowl in an ODI?',
      options: ['5', '10', '15', 'No limit'],
      correctAnswer: 1,
      hint: 'It\'s one-fifth of the total overs in an innings.'
    },
    {
      question: 'Which country has won the most ICC Cricket World Cups?',
      options: ['India', 'West Indies', 'England', 'Australia'],
      correctAnswer: 3,
      hint: 'This team is known for its yellow jerseys.'
    },
    {
      question: 'Who holds the record for the fastest century in ODI cricket?',
      options: ['Shahid Afridi', 'Corey Anderson', 'AB de Villiers', 'Jos Buttler'],
      correctAnswer: 2,
      hint: 'This South African batsman achieved it in just 31 balls.'
    },
    {
      question: 'Identify the cricketer who scored the first-ever double century in men\'s ODI history.',
      options: ['Virender Sehwag', 'Rohit Sharma', 'Sachin Tendulkar', 'Chris Gayle'],
      correctAnswer: 2,
      hint: 'He is an Indian cricketer known as the "Little Master".',
      imageUrl: 'https://placehold.co/600x400.png',
      imageAiHint: 'cricket legend'
    }
  ]
};

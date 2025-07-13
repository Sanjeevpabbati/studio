import type { Quiz } from './types';

export const sampleQuiz: Quiz = {
  format: 'Test',
  questions: [
    {
      question: 'Who is the highest run-scorer in the history of Test cricket?',
      options: ['Ricky Ponting', 'Sachin Tendulkar', 'Jacques Kallis', 'Rahul Dravid'],
      correctAnswer: 1,
      hint: 'He is often called the "Little Master".'
    },
    {
      question: 'Which bowler has taken the most wickets in Test cricket?',
      options: ['Shane Warne', 'Anil Kumble', 'James Anderson', 'Muttiah Muralitharan'],
      correctAnswer: 3,
      hint: 'He was a Sri Lankan off-spinner.'
    },
    {
      question: 'What is the highest individual score by a batsman in a single innings of a Test match?',
      options: ['400*', '380', '375', '501*'],
      correctAnswer: 0,
      hint: 'The record is held by a West Indian legend.'
    },
    {
      question: 'Which country won the first-ever ICC World Test Championship?',
      options: ['India', 'Australia', 'New Zealand', 'England'],
      correctAnswer: 2,
      hint: 'The final was played against India in 2021.'
    },
    {
      question: 'How many balls are there in a standard Test cricket over?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 1,
      hint: 'This is the standard number of deliveries for most formats of cricket.'
    }
  ]
};

import type { Quiz } from '../types';

export const wplQuiz: Quiz = {
  format: 'WPL',
  questions: [
    {
      question: 'How many teams participated in the first season of the WPL?',
      options: ['4', '5', '6', '8'],
      correctAnswer: 1,
      hint: 'The number is one more than four.'
    },
    {
      question: 'Which team won the inaugural Women\'s Premier League (WPL) in 2023?',
      options: ['Delhi Capitals', 'UP Warriorz', 'Mumbai Indians', 'Royal Challengers Bangalore'],
      correctAnswer: 2,
      hint: 'This team is captained by Harmanpreet Kaur.'
    },
    {
      question: 'Who was the most expensive player in the first WPL auction?',
      options: ['Smriti Mandhana', 'Ashleigh Gardner', 'Harmanpreet Kaur', 'Ellyse Perry'],
      correctAnswer: 0,
      hint: 'She was bought by Royal Challengers Bangalore.'
    },
    {
      question: 'Who won the Orange Cap for the most runs in the inaugural WPL season?',
      options: ['Meg Lanning', 'Shafali Verma', 'Hayley Matthews', 'Nat Sciver-Brunt'],
      correctAnswer: 0,
      hint: 'She captained the Delhi Capitals.'
    },
    {
      question: 'Identify the player who won the Purple Cap for most wickets in the inaugural WPL.',
      options: ['Sophie Ecclestone', 'Issy Wong', 'Saika Ishaque', 'Hayley Matthews'],
      correctAnswer: 3,
      hint: 'This West Indian all-rounder played for Mumbai Indians.',
      imageUrl: 'https://placehold.co/600x400.png',
      imageAiHint: 'female cricketer bowling'
    }
  ]
};

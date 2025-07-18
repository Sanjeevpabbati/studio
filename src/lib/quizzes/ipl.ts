import type { Quiz } from '../types';

export const iplQuiz: Quiz = {
  format: 'IPL',
  questions: [
    {
      question: 'Which team won the inaugural IPL season in 2008?',
      options: ['Chennai Super Kings', 'Rajasthan Royals', 'Mumbai Indians', 'Deccan Chargers'],
      correctAnswer: 1,
      hint: 'This team was led by the legendary spinner Shane Warne.'
    },
    {
      question: 'Which bowler has taken the most wickets in the IPL?',
      options: ['Dwayne Bravo', 'Lasith Malinga', 'Amit Mishra', 'Yuzvendra Chahal'],
      correctAnswer: 0,
      hint: 'This West Indian all-rounder is famous for his slower balls.'
    },
    {
      question: 'Who is the highest run-scorer in the history of the IPL?',
      options: ['Suresh Raina', 'Rohit Sharma', 'David Warner', 'Virat Kohli'],
      correctAnswer: 3,
      hint: 'He is the captain of Royal Challengers Bangalore.'
    },
    {
      question: 'Which team has won the most IPL titles?',
      options: ['Chennai Super Kings', 'Mumbai Indians', 'Kolkata Knight Riders', 'Royal Challengers Bangalore'],
      correctAnswer: 1,
      hint: 'This team is captained by Rohit Sharma for most of its victories.'
    },
    {
      question: 'Identify the player who hit the highest individual score (175*) in IPL history.',
      options: ['Brendon McCullum', 'AB de Villiers', 'Chris Gayle', 'KL Rahul'],
      correctAnswer: 2,
      hint: 'This explosive innings happened in 2013 against Pune Warriors.',
      imageUrl: 'https://placehold.co/600x400.png',
      imageAiHint: 'cricketer portrait'
    }
  ]
};

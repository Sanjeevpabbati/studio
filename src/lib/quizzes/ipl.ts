import type { Quiz } from '../types';

export const iplQuiz: Quiz = {
  format: 'IPL',
  questions: [
    {
      question: 'Which team has won the most IPL titles?',
      options: ['Chennai Super Kings', 'Mumbai Indians', 'Kolkata Knight Riders', 'Royal Challengers Bangalore'],
      correctAnswer: 1,
      hint: 'This team is captained by Rohit Sharma for most of its victories.'
    },
    {
      question: 'Who is the highest run-scorer in the history of the IPL?',
      options: ['Suresh Raina', 'Rohit Sharma', 'David Warner', 'Virat Kohli'],
      correctAnswer: 3,
      hint: 'He is the captain of Royal Challengers Bangalore.'
    },
    {
      question: 'Which bowler has taken the most wickets in the IPL?',
      options: ['Dwayne Bravo', 'Lasith Malinga', 'Amit Mishra', 'Yuzvendra Chahal'],
      correctAnswer: 0,
      hint: 'This West Indian all-rounder is famous for his slower balls.'
    },
    {
      question: 'What is the highest individual score by a batsman in the IPL?',
      options: ['175* by Chris Gayle', '158* by Brendon McCullum', '133* by AB de Villiers', '128* by Rishabh Pant'],
      correctAnswer: 0,
      hint: 'This explosive innings happened in 2013 against Pune Warriors.'
    },
    {
      question: 'Which team won the inaugural IPL season in 2008?',
      options: ['Chennai Super Kings', 'Rajasthan Royals', 'Mumbai Indians', 'Deccan Chargers'],
      correctAnswer: 1,
      hint: 'This team was led by the legendary spinner Shane Warne.'
    }
  ]
};

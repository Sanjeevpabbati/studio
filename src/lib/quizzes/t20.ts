import type { Quiz } from '../types';

export const t20Quiz: Quiz = {
  format: 'T20',
  questions: [
    {
      question: 'Who hit six sixes in an over in the inaugural ICC T20 World Cup 2007?',
      options: ['Chris Gayle', 'Yuvraj Singh', 'MS Dhoni', 'Shahid Afridi'],
      correctAnswer: 1,
      hint: 'He did it against England\'s Stuart Broad.'
    },
    {
      question: 'Which country won the first-ever ICC T20 World Cup?',
      options: ['Pakistan', 'Australia', 'England', 'India'],
      correctAnswer: 3,
      hint: 'They defeated their arch-rivals Pakistan in the final.'
    },
    {
      question: 'What is a "super over" in T20 cricket?',
      options: ['An over with bonus runs', 'A tie-breaker method', 'An over where only sixes are allowed', 'The final over of the match'],
      correctAnswer: 1,
      hint: 'It is used when the scores are level at the end of the match.'
    },
    {
      question: 'Who is the highest run-scorer in T20 International cricket?',
      options: ['Rohit Sharma', 'Martin Guptill', 'Babar Azam', 'Virat Kohli'],
      correctAnswer: 0,
      hint: 'He is known as the "Hitman" in Indian cricket.'
    },
    {
      question: 'A T20 match consists of how many overs per side?',
      options: ['10', '15', '20', '25'],
      correctAnswer: 2,
      hint: 'The format\'s name gives a big clue!'
    }
  ]
};

import type { Quiz } from '../types';

export const coreQuiz: Quiz = {
  format: 'Core',
  questions: [
    {
      question: 'How many players are there in a standard cricket team?',
      options: ['9', '10', '11', '12'],
      correctAnswer: 2,
      hint: 'It\'s the same number as a soccer team.'
    },
    {
      question: 'What is the term for a batsman being dismissed without scoring any runs?',
      options: ['Golden Duck', 'Duck', 'Silver Duck', 'Diamond Duck'],
      correctAnswer: 1,
      hint: 'It\'s a common term for a zero score.'
    },
    {
      question: 'What does LBW stand for?',
      options: ['Leg Before Wicket', 'Leg Behind Wicket', 'Leg Bye Wicket', 'Leg Beyond Wicket'],
      correctAnswer: 0,
      hint: 'It\'s a common mode of dismissal involving the pads.'
    },
    {
      question: 'What is a "maiden over"?',
      options: ['An over with 6 wides', 'An over where a wicket falls', 'An over with no runs scored', 'The first over of a match'],
      correctAnswer: 2,
      hint: 'It signifies a bowler\'s complete dominance in an over.'
    },
    {
      question: 'Identify the fielding position shown in the image.',
      options: ['Slips', 'Gully', 'Silly Point', 'Wicket-keeper'],
      correctAnswer: 3,
      hint: 'This player stands directly behind the stumps.',
      imageUrl: 'https://placehold.co/600x400.png',
      imageAiHint: 'cricket wicket keeper'
    }
  ]
};

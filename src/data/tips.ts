import type { ProblemSolvingTip } from '../types';

export const tips: ProblemSolvingTip[] = [
  {
    id: 'convert-units',
    title: 'Convert the Units',
    description: 'Change all the units in the question to match before you start to solve.',
    steps: [
      'Read the problem and circle all the units you see',
      'Check: are the units the same or different?',
      'If different, find the conversion factor (e.g., 1 foot = 12 inches)',
      'Convert all values to the same unit',
      'Now solve the problem using matching units',
    ],
    unitId: 'unit-1',
  },
  {
    id: 'draw-a-picture',
    title: 'Draw a Picture',
    description: 'Use simple shapes to represent each part and conceptualize what the question is asking.',
    steps: [
      'Read the problem carefully',
      'Draw simple shapes to represent each part of the problem',
      'Label your shapes with numbers from the problem',
      'Use your picture to understand what the question is asking',
      'Solve the problem using your picture as a guide',
    ],
    unitId: 'unit-2',
  },
  {
    id: 'keyword-clues',
    title: 'Use Keyword Clues',
    description: 'Use key words to determine what operation to use.',
    steps: [
      'Read the problem and look for key words',
      'Words like "total," "altogether," and "combined" mean addition',
      'Words like "left," "difference," and "fewer" mean subtraction',
      'Words like "each," "every," and "groups of" mean multiplication or division',
      'Choose the right operation based on the key words and solve',
    ],
    unitId: 'unit-3',
  },
  {
    id: 'replacing-unknowns',
    title: 'Replacing the Unknowns (Algebra)',
    description: 'Assign letters to quantities we do not know to help solve the problem.',
    steps: [
      'Read the problem and identify what you do not know',
      'Assign a letter (like x or n) to represent the unknown quantity',
      'Write an equation using the letter and the numbers from the problem',
      'Solve the equation to find the value of the letter',
      'Check: plug your answer back in to make sure it works',
    ],
    unitId: 'unit-4',
  },
  {
    id: 'cubes',
    title: 'CUBES Method',
    description: 'A step-by-step method to break down any word problem.',
    steps: [
      'C - Circle the key numbers and units',
      'U - Underline the question: what am I being asked to solve?',
      'B - Box the math "action" words (am I going to add, subtract, multiply, or divide?)',
      'E - Evaluate and eliminate: what steps do I take, and what information don\'t I need?',
      'S - Show your work and check: did I answer the underlined question?',
    ],
    unitId: 'unit-5',
  },
];

import type { GeneratedQuestion } from '../../types';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Template {
  generate: (guided: boolean) => GeneratedQuestion;
}

const templates: Template[] = [
  // Q1: Roses into bouquets — add then divide, answer is remainder
  {
    generate: (guided) => {
      const pinkRoses = randInt(15, 30);
      const redRoses = randInt(15, 30);
      const bouquetSize = randInt(6, 12);
      const total = pinkRoses + redRoses;
      const quotient = Math.floor(total / bouquetSize);
      const answer = total % bouquetSize;
      const q: GeneratedQuestion = {
        problemText: `A florist has ${pinkRoses} pink roses and another ${redRoses} red roses. He decides to mix them together and make bouquets with ${bouquetSize} roses each. How many roses will be left over after the bouquets have been made?`,
        answer,
        hint: `The keyword "left over" tells you the answer is the remainder. First add the roses, then divide by ${bouquetSize}.`,
        solution: `Step 1: Add all roses together: ${pinkRoses} + ${redRoses} = ${total} roses.\nStep 2: Divide by bouquet size: ${total} ÷ ${bouquetSize} = ${quotient} bouquets with a remainder of ${answer}.\nStep 3: The keyword "left over" means the answer is the remainder.\nAnswer: ${answer} roses will be left over.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "left over" tells you the answer will be a remainder. First, add all the roses. What is ${pinkRoses} + ${redRoses}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! There are ${total} roses in total.`,
            feedbackIncorrect: `${pinkRoses} + ${redRoses} = ${total} roses total.`,
            highlights: ['left over'],
          },
          {
            instruction: `Now divide ${total} by ${bouquetSize}. The keyword "left over" means the answer is the remainder. What is the remainder?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} roses are left over!`,
            feedbackIncorrect: `${total} ÷ ${bouquetSize} = ${quotient} remainder ${answer}. The remainder is ${answer}.`,
            highlights: ['left over'],
          },
        ];
      }
      return q;
    },
  },
  // Q2: Rainfall — add decimals, keyword "in all" means addition
  {
    generate: (guided) => {
      const day1 = +(randInt(1, 9) / 10).toFixed(1);
      const day2 = +(randInt(1, 9) / 10).toFixed(1);
      const day3 = +(randInt(1, 9) / 10).toFixed(1);
      const sum12 = +(day1 + day2).toFixed(1);
      const answer = +(day1 + day2 + day3).toFixed(1);
      const q: GeneratedQuestion = {
        problemText: `Franco measured the rainfall each day for a science lesson. He measured ${day1} centimeters on Monday, ${day2} centimeters on Tuesday, and ${day3} centimeters on Wednesday. How many centimeters of rain did Franco measure in all?`,
        answer,
        hint: `The keyword "in all" tells you to add. Add all three measurements together.`,
        solution: `Step 1: The keyword "in all" means addition.\nStep 2: Add Monday and Tuesday: ${day1} + ${day2} = ${sum12}.\nStep 3: Add Wednesday: ${sum12} + ${day3} = ${answer}.\nAnswer: Franco measured ${answer} centimeters of rain in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "in all" tells you to add. First, add Monday and Tuesday. What is ${day1} + ${day2}?`,
            expectedAnswer: sum12,
            feedbackCorrect: `Correct! ${day1} + ${day2} = ${sum12}.`,
            feedbackIncorrect: `${day1} + ${day2} = ${sum12}.`,
            highlights: ['in all'],
          },
          {
            instruction: `Now add Wednesday's rainfall. What is ${sum12} + ${day3}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Franco measured ${answer} cm of rain in all!`,
            feedbackIncorrect: `${sum12} + ${day3} = ${answer} cm.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q3: Guppies and goldfish — keyword "more than" means addition
  {
    generate: (guided) => {
      const guppies = randInt(5, 15);
      const moreGoldfish = randInt(3, 8);
      const goldfish = guppies + moreGoldfish;
      const answer = guppies + goldfish;
      const q: GeneratedQuestion = {
        problemText: `Last weekend, Mr. Bullock sold ${guppies} guppies at his pet store. He also sold ${moreGoldfish} more goldfish than guppies. How many fish did he sell in all?`,
        answer,
        hint: `The keyword "more...than" tells you to add to find the goldfish count, then "in all" means add both totals.`,
        solution: `Step 1: The keyword "${moreGoldfish} more...than" means add to find goldfish: ${guppies} + ${moreGoldfish} = ${goldfish} goldfish.\nStep 2: The keyword "in all" means add both: ${guppies} + ${goldfish} = ${answer}.\nAnswer: Mr. Bullock sold ${answer} fish in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "more...than" means add. How many goldfish were sold? What is ${guppies} + ${moreGoldfish}?`,
            expectedAnswer: goldfish,
            feedbackCorrect: `Correct! He sold ${goldfish} goldfish.`,
            feedbackIncorrect: `${guppies} + ${moreGoldfish} = ${goldfish} goldfish.`,
            highlights: [`${moreGoldfish} more goldfish than guppies`],
          },
          {
            instruction: `Now find the total fish sold ("in all" means add). What is ${guppies} + ${goldfish}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! He sold ${answer} fish in all!`,
            feedbackIncorrect: `${guppies} + ${goldfish} = ${answer} fish.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q4: Pumpkins — keyword "times as many" means multiplication
  {
    generate: (guided) => {
      const white = randInt(2, 5);
      const multiplier = randInt(2, 5);
      const orange = white * multiplier;
      const answer = white + orange;
      const q: GeneratedQuestion = {
        problemText: `Ms. Lucero went to a pumpkin patch to pick some pumpkins. She picked ${white} white pumpkins. She picked ${multiplier} times as many orange pumpkins as white pumpkins. How many pumpkins did she pick in all?`,
        answer,
        hint: `The keyword "times as many" tells you to multiply, then "in all" means add both types together.`,
        solution: `Step 1: The keyword "${multiplier} times as many" means multiply: ${white} × ${multiplier} = ${orange} orange pumpkins.\nStep 2: The keyword "in all" means add both types: ${white} + ${orange} = ${answer}.\nAnswer: Ms. Lucero picked ${answer} pumpkins in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "times as many" means multiply. How many orange pumpkins? What is ${white} × ${multiplier}?`,
            expectedAnswer: orange,
            feedbackCorrect: `Correct! She picked ${orange} orange pumpkins.`,
            feedbackIncorrect: `${white} × ${multiplier} = ${orange} orange pumpkins.`,
            highlights: [`${multiplier} times as many`],
          },
          {
            instruction: `Now find the total ("in all" means add). What is ${white} + ${orange}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! She picked ${answer} pumpkins in all!`,
            feedbackIncorrect: `${white} + ${orange} = ${answer} pumpkins.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q5: Music class — keyword "times as long" means multiplication
  {
    generate: (guided) => {
      const songMinutes = randInt(2, 5);
      const multiplier = randInt(4, 10);
      const instrumentMinutes = songMinutes * multiplier;
      const answer = songMinutes + instrumentMinutes;
      const q: GeneratedQuestion = {
        problemText: `Today in music class, the fourth graders sang a song and then played instruments for the rest of the time. The song took ${songMinutes} minutes. The class played instruments for ${multiplier} times as long as they sang the song. How many minutes was the music class in all?`,
        answer,
        hint: `The keyword "times as long" tells you to multiply, then "in all" means add both activities.`,
        solution: `Step 1: The keyword "${multiplier} times as long" means multiply: ${songMinutes} × ${multiplier} = ${instrumentMinutes} minutes playing instruments.\nStep 2: The keyword "in all" means add both: ${songMinutes} + ${instrumentMinutes} = ${answer} minutes.\nAnswer: The music class was ${answer} minutes in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "times as long" means multiply. How long did they play instruments? What is ${songMinutes} × ${multiplier}?`,
            expectedAnswer: instrumentMinutes,
            feedbackCorrect: `Correct! They played instruments for ${instrumentMinutes} minutes.`,
            feedbackIncorrect: `${songMinutes} × ${multiplier} = ${instrumentMinutes} minutes.`,
            highlights: [`${multiplier} times as long`],
          },
          {
            instruction: `Now find the total class time ("in all" means add). What is ${songMinutes} + ${instrumentMinutes}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The music class was ${answer} minutes!`,
            feedbackIncorrect: `${songMinutes} + ${instrumentMinutes} = ${answer} minutes.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q6: Ladybug — add fractions with unlike denominators
  {
    generate: (guided) => {
      const pairs = [
        { a: '1/2', b: '1/6', answer: '2/3', aNum: 3, bNum: 1, denom: 6, numAnswer: 4 },
        { a: '1/3', b: '1/6', answer: '1/2', aNum: 2, bNum: 1, denom: 6, numAnswer: 3 },
        { a: '1/2', b: '1/4', answer: '3/4', aNum: 2, bNum: 1, denom: 4, numAnswer: 3 },
        { a: '1/3', b: '1/4', answer: '7/12', aNum: 4, bNum: 3, denom: 12, numAnswer: 7 },
        { a: '2/3', b: '1/6', answer: '5/6', aNum: 4, bNum: 1, denom: 6, numAnswer: 5 },
      ];
      const p = pick(pairs);
      const q: GeneratedQuestion = {
        problemText: `Clare watched a ladybug in the yard. It crawled ${p.a} of an inch, then rested for a bit, and then crawled ${p.b} of an inch more. How far did the ladybug crawl in all?`,
        answer: p.numAnswer,
        hint: `The keyword "in all" tells you to add. Find a common denominator for ${p.a} and ${p.b}, then add the numerators.`,
        solution: `Step 1: The keyword "in all" means addition: ${p.a} + ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Add the numerators: ${p.aNum} + ${p.bNum} = ${p.numAnswer}.\nAnswer: The ladybug crawled ${p.answer} of an inch (numerator = ${p.numAnswer}).`,
        njslsStandard: '4.NF.B.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "in all" means add: ${p.a} + ${p.b}. First, convert to a common denominator of ${p.denom}. What is the new numerator for ${p.a}?`,
            expectedAnswer: p.aNum,
            feedbackCorrect: `Correct! ${p.a} = ${p.aNum}/${p.denom}.`,
            feedbackIncorrect: `${p.a} = ${p.aNum}/${p.denom}.`,
            highlights: ['in all'],
          },
          {
            instruction: `Now add the numerators: ${p.aNum} + ${p.bNum} = ? (The answer is the numerator of the result.)`,
            expectedAnswer: p.numAnswer,
            feedbackCorrect: `Excellent! ${p.aNum}/${p.denom} + ${p.bNum}/${p.denom} = ${p.answer}!`,
            feedbackIncorrect: `${p.aNum} + ${p.bNum} = ${p.numAnswer}. The answer is ${p.answer}.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q7: Knitting — subtract fractions with unlike denominators
  {
    generate: (guided) => {
      const pairs = [
        { a: '3/4', b: '5/8', answer: '1/8', aNum: 6, bNum: 5, denom: 8, numAnswer: 1 },
        { a: '2/3', b: '1/2', answer: '1/6', aNum: 4, bNum: 3, denom: 6, numAnswer: 1 },
        { a: '3/4', b: '1/2', answer: '1/4', aNum: 3, bNum: 2, denom: 4, numAnswer: 1 },
        { a: '5/6', b: '2/3', answer: '1/6', aNum: 5, bNum: 4, denom: 6, numAnswer: 1 },
        { a: '7/8', b: '3/4', answer: '1/8', aNum: 7, bNum: 6, denom: 8, numAnswer: 1 },
      ];
      const p = pick(pairs);
      const q: GeneratedQuestion = {
        problemText: `Adam is knitting a scarf with his grandmother. Yesterday, his grandmother used ${p.a} of a skein of wool and Adam used ${p.b} of a skein. How much more wool did Adam's grandmother use than Adam?`,
        answer: p.numAnswer,
        hint: `The keyword "how much more" tells you to subtract. Find a common denominator for ${p.a} and ${p.b}, then subtract.`,
        solution: `Step 1: The keyword "how much more" means subtraction: ${p.a} - ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Subtract the numerators: ${p.aNum} - ${p.bNum} = ${p.numAnswer}.\nAnswer: Grandmother used ${p.answer} more of a skein (numerator = ${p.numAnswer}).`,
        njslsStandard: '4.NF.B.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "how much more" means subtract: ${p.a} - ${p.b}. First, convert to a common denominator of ${p.denom}. What is the new numerator for ${p.a}?`,
            expectedAnswer: p.aNum,
            feedbackCorrect: `Correct! ${p.a} = ${p.aNum}/${p.denom}.`,
            feedbackIncorrect: `${p.a} = ${p.aNum}/${p.denom}.`,
            highlights: ['How much more'],
          },
          {
            instruction: `Now subtract the numerators: ${p.aNum} - ${p.bNum} = ? (The answer is the numerator of the result.)`,
            expectedAnswer: p.numAnswer,
            feedbackCorrect: `Excellent! ${p.aNum}/${p.denom} - ${p.bNum}/${p.denom} = ${p.answer}!`,
            feedbackIncorrect: `${p.aNum} - ${p.bNum} = ${p.numAnswer}. The answer is ${p.answer}.`,
            highlights: ['How much more'],
          },
        ];
      }
      return q;
    },
  },
];

export function generateInterpretingRemainders(guided: boolean): GeneratedQuestion {
  return pick(templates).generate(guided);
}

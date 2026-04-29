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
        answer: p.numAnswer / p.denom,
        displayAnswer: p.answer,
        hint: `The keyword "in all" tells you to add. Find a common denominator for ${p.a} and ${p.b}, then add the numerators.`,
        solution: `Step 1: The keyword "in all" means addition: ${p.a} + ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Add the numerators: ${p.aNum} + ${p.bNum} = ${p.numAnswer}.\nAnswer: The ladybug crawled ${p.answer} of an inch.`,
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
        answer: p.numAnswer / p.denom,
        displayAnswer: p.answer,
        hint: `The keyword "how much more" tells you to subtract. Find a common denominator for ${p.a} and ${p.b}, then subtract.`,
        solution: `Step 1: The keyword "how much more" means subtraction: ${p.a} - ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Subtract the numerators: ${p.aNum} - ${p.bNum} = ${p.numAnswer}.\nAnswer: Grandmother used ${p.answer} more of a skein.`,
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
  // Q8: Library books on shelves — add then divide, remainder
  {
    generate: (guided) => {
      const books1 = randInt(25, 60);
      const books2 = randInt(30, 65);
      const shelfSize = randInt(6, 10);
      const total = books1 + books2;
      const quotient = Math.floor(total / shelfSize);
      const answer = total % shelfSize;
      const q: GeneratedQuestion = {
        problemText: `A librarian returned ${books1} books to the shelves in the morning and ${books2} books in the afternoon. She arranged them into stacks of ${shelfSize}. How many books were left over after the stacks were made?`,
        answer,
        hint: `The keyword "left over" tells you the answer is the remainder. First add the books, then divide by ${shelfSize}.`,
        solution: `Step 1: Add all books: ${books1} + ${books2} = ${total} books.\nStep 2: Divide by stack size: ${total} ÷ ${shelfSize} = ${quotient} stacks with a remainder of ${answer}.\nStep 3: The keyword "left over" means the answer is the remainder.\nAnswer: ${answer} books were left over.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "left over" tells you the answer will be a remainder. First, add all the books. What is ${books1} + ${books2}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! There are ${total} books in total.`,
            feedbackIncorrect: `${books1} + ${books2} = ${total} books total.`,
            highlights: ['left over'],
          },
          {
            instruction: `Now divide ${total} by ${shelfSize}. The keyword "left over" means the answer is the remainder. What is the remainder?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} books are left over!`,
            feedbackIncorrect: `${total} ÷ ${shelfSize} = ${quotient} remainder ${answer}. The remainder is ${answer}.`,
            highlights: ['left over'],
          },
        ];
      }
      return q;
    },
  },
  // Q9: Carnival beanbags and bowling pins — "more than" means addition
  {
    generate: (guided) => {
      const beanbags = randInt(8, 20);
      const morePins = randInt(3, 10);
      const pins = beanbags + morePins;
      const answer = beanbags + pins;
      const q: GeneratedQuestion = {
        problemText: `At the school carnival, Lily tossed ${beanbags} beanbags into the target. She also knocked down ${morePins} more bowling pins than beanbags. How many things did Lily hit in all?`,
        answer,
        hint: `The keyword "more...than" tells you to add to find the bowling pins, then "in all" means add both totals.`,
        solution: `Step 1: The keyword "${morePins} more...than" means add to find pins: ${beanbags} + ${morePins} = ${pins} pins.\nStep 2: The keyword "in all" means add both: ${beanbags} + ${pins} = ${answer}.\nAnswer: Lily hit ${answer} things in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "more...than" means add. How many bowling pins did Lily knock down? What is ${beanbags} + ${morePins}?`,
            expectedAnswer: pins,
            feedbackCorrect: `Correct! She knocked down ${pins} bowling pins.`,
            feedbackIncorrect: `${beanbags} + ${morePins} = ${pins} bowling pins.`,
            highlights: [`${morePins} more bowling pins than beanbags`],
          },
          {
            instruction: `Now find the total ("in all" means add). What is ${beanbags} + ${pins}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Lily hit ${answer} things in all!`,
            feedbackIncorrect: `${beanbags} + ${pins} = ${answer}.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q10: Butterflies and ladybugs — "times as many" means multiply
  {
    generate: (guided) => {
      const butterflies = randInt(3, 10);
      const multiplier = randInt(3, 6);
      const ladybugs = butterflies * multiplier;
      const answer = butterflies + ladybugs;
      const q: GeneratedQuestion = {
        problemText: `During a nature walk, students spotted ${butterflies} butterflies. They also spotted ${multiplier} times as many ladybugs as butterflies. How many insects did they spot in all?`,
        answer,
        hint: `The keyword "times as many" tells you to multiply, then "in all" means add both types together.`,
        solution: `Step 1: The keyword "${multiplier} times as many" means multiply: ${butterflies} × ${multiplier} = ${ladybugs} ladybugs.\nStep 2: The keyword "in all" means add both types: ${butterflies} + ${ladybugs} = ${answer}.\nAnswer: They spotted ${answer} insects in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "times as many" means multiply. How many ladybugs? What is ${butterflies} × ${multiplier}?`,
            expectedAnswer: ladybugs,
            feedbackCorrect: `Correct! They spotted ${ladybugs} ladybugs.`,
            feedbackIncorrect: `${butterflies} × ${multiplier} = ${ladybugs} ladybugs.`,
            highlights: [`${multiplier} times as many`],
          },
          {
            instruction: `Now find the total ("in all" means add). What is ${butterflies} + ${ladybugs}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! They spotted ${answer} insects in all!`,
            feedbackIncorrect: `${butterflies} + ${ladybugs} = ${answer}.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q11: Guitar practice — add two whole numbers, keyword "in all"
  {
    generate: (guided) => {
      const min1 = randInt(15, 45);
      const min2 = randInt(20, 50);
      const answer = min1 + min2;
      const q: GeneratedQuestion = {
        problemText: `Dominic practiced guitar for ${min1} minutes on Monday and ${min2} minutes on Tuesday. How many minutes did he practice in all?`,
        answer,
        hint: `The keyword "in all" tells you to add. Add both practice times together.`,
        solution: `Step 1: The keyword "in all" means addition.\nStep 2: Add: ${min1} + ${min2} = ${answer}.\nAnswer: Dominic practiced ${answer} minutes in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "in all" tells you to add. What is ${min1} + ${min2}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! Dominic practiced ${answer} minutes in all!`,
            feedbackIncorrect: `${min1} + ${min2} = ${answer} minutes.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q12: Baker cookies and brownies — multiply twice then add
  {
    generate: (guided) => {
      const cookieTrays = randInt(2, 5);
      const perCookieTray = randInt(10, 15);
      const brownieTrays = randInt(1, 4);
      const perBrownieTray = randInt(6, 10);
      const cookies = cookieTrays * perCookieTray;
      const brownies = brownieTrays * perBrownieTray;
      const answer = cookies + brownies;
      const q: GeneratedQuestion = {
        problemText: `A baker made ${cookieTrays} trays of cookies with ${perCookieTray} cookies each. He also made ${brownieTrays} trays of brownies with ${perBrownieTray} brownies each. How many baked goods did he make in all?`,
        answer,
        hint: `The keyword "in all" tells you to add. First multiply to find each type, then add them together.`,
        solution: `Step 1: Find cookies: ${cookieTrays} × ${perCookieTray} = ${cookies} cookies.\nStep 2: Find brownies: ${brownieTrays} × ${perBrownieTray} = ${brownies} brownies.\nStep 3: The keyword "in all" means add: ${cookies} + ${brownies} = ${answer}.\nAnswer: The baker made ${answer} baked goods in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total cookies. What is ${cookieTrays} × ${perCookieTray}?`,
            expectedAnswer: cookies,
            feedbackCorrect: `Correct! He made ${cookies} cookies.`,
            feedbackIncorrect: `${cookieTrays} × ${perCookieTray} = ${cookies} cookies.`,
            highlights: [`${cookieTrays} trays of cookies with ${perCookieTray} cookies each`],
          },
          {
            instruction: `Now find the brownies (${brownieTrays} × ${perBrownieTray} = ${brownies}) and add both. What is ${cookies} + ${brownies}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! He made ${answer} baked goods in all!`,
            feedbackIncorrect: `${cookies} + ${brownies} = ${answer} baked goods.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q13: Seashells — subtract to find how many given away
  {
    generate: (guided) => {
      const total = randInt(30, 60);
      const leftOver = randInt(15, total - 5);
      const answer = total - leftOver;
      const q: GeneratedQuestion = {
        problemText: `Zoe collected ${total} seashells at the beach. She gave some to her friend and had ${leftOver} left over. How many seashells did Zoe give to her friend?`,
        answer,
        hint: `The keyword "gave" and knowing what's "left over" tells you to subtract. Total minus what's left equals what was given away.`,
        solution: `Step 1: Zoe started with ${total} seashells and had ${leftOver} left.\nStep 2: Subtract to find how many she gave away: ${total} - ${leftOver} = ${answer}.\nAnswer: Zoe gave ${answer} seashells to her friend.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Zoe started with ${total} and had ${leftOver} left. To find how many she gave away, subtract. What is ${total} - ${leftOver}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! Zoe gave ${answer} seashells to her friend!`,
            feedbackIncorrect: `${total} - ${leftOver} = ${answer} seashells given away.`,
            highlights: ['gave some', `${leftOver} left over`],
          },
        ];
      }
      return q;
    },
  },
  // Q14: Running — add fractions with unlike denominators
  {
    generate: (guided) => {
      const pairs = [
        { a: '2/3', b: '1/4', answer: '11/12', aNum: 8, bNum: 3, denom: 12, numAnswer: 11 },
        { a: '1/2', b: '1/3', answer: '5/6', aNum: 3, bNum: 2, denom: 6, numAnswer: 5 },
        { a: '3/4', b: '1/3', answer: '13/12', aNum: 9, bNum: 4, denom: 12, numAnswer: 13 },
        { a: '1/2', b: '1/5', answer: '7/10', aNum: 5, bNum: 2, denom: 10, numAnswer: 7 },
        { a: '2/3', b: '1/6', answer: '5/6', aNum: 4, bNum: 1, denom: 6, numAnswer: 5 },
      ];
      const p = pick(pairs);
      const q: GeneratedQuestion = {
        problemText: `Marcus ran ${p.a} of a mile before school and ${p.b} of a mile after school. How far did Marcus run in all?`,
        answer: p.numAnswer / p.denom,
        displayAnswer: p.answer,
        hint: `The keyword "in all" tells you to add. Find a common denominator for ${p.a} and ${p.b}, then add the numerators.`,
        solution: `Step 1: The keyword "in all" means addition: ${p.a} + ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Add the numerators: ${p.aNum} + ${p.bNum} = ${p.numAnswer}.\nAnswer: Marcus ran ${p.answer} of a mile.`,
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
  // Q15: Sunflower seeds — multiply then multiply ("times as many")
  {
    generate: (guided) => {
      const rows = randInt(3, 7);
      const perRow = randInt(5, 10);
      const garden = rows * perRow;
      const multiplier = randInt(2, 5);
      const answer = garden * multiplier;
      const q: GeneratedQuestion = {
        problemText: `A gardener planted ${rows} rows of sunflowers with ${perRow} seeds in each row. His neighbor planted ${multiplier} times as many sunflower seeds as the gardener. How many sunflower seeds did the neighbor plant?`,
        answer,
        hint: `The keyword "times as many" tells you to multiply. First find how many the gardener planted, then multiply.`,
        solution: `Step 1: Find the gardener's seeds: ${rows} × ${perRow} = ${garden} seeds.\nStep 2: The keyword "${multiplier} times as many" means multiply: ${garden} × ${multiplier} = ${answer}.\nAnswer: The neighbor planted ${answer} sunflower seeds.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find how many seeds the gardener planted. What is ${rows} × ${perRow}?`,
            expectedAnswer: garden,
            feedbackCorrect: `Correct! The gardener planted ${garden} seeds.`,
            feedbackIncorrect: `${rows} × ${perRow} = ${garden} seeds.`,
            highlights: [`${rows} rows`, `${perRow} seeds`],
          },
          {
            instruction: `The keyword "times as many" means multiply. What is ${garden} × ${multiplier}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The neighbor planted ${answer} seeds!`,
            feedbackIncorrect: `${garden} × ${multiplier} = ${answer} seeds.`,
            highlights: [`${multiplier} times as many`],
          },
        ];
      }
      return q;
    },
  },
  // Q16: Snow measurements — add three decimals, keyword "in all"
  {
    generate: (guided) => {
      const day1 = +(randInt(1, 9) / 10).toFixed(1);
      const day2 = +(randInt(1, 9) / 10).toFixed(1);
      const day3 = +(randInt(1, 9) / 10).toFixed(1);
      const sum12 = +(day1 + day2).toFixed(1);
      const answer = +(day1 + day2 + day3).toFixed(1);
      const q: GeneratedQuestion = {
        problemText: `Penelope measured the snow that fell each day. She measured ${day1} centimeters on Thursday, ${day2} centimeters on Friday, and ${day3} centimeters on Saturday. How many centimeters of snow fell in all?`,
        answer,
        hint: `The keyword "in all" tells you to add. Add all three measurements together.`,
        solution: `Step 1: The keyword "in all" means addition.\nStep 2: Add Thursday and Friday: ${day1} + ${day2} = ${sum12}.\nStep 3: Add Saturday: ${sum12} + ${day3} = ${answer}.\nAnswer: ${answer} centimeters of snow fell in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "in all" tells you to add. First, add Thursday and Friday. What is ${day1} + ${day2}?`,
            expectedAnswer: sum12,
            feedbackCorrect: `Correct! ${day1} + ${day2} = ${sum12}.`,
            feedbackIncorrect: `${day1} + ${day2} = ${sum12}.`,
            highlights: ['in all'],
          },
          {
            instruction: `Now add Saturday's snow. What is ${sum12} + ${day3}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} cm of snow fell in all!`,
            feedbackIncorrect: `${sum12} + ${day3} = ${answer} cm.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q17: Dog show — add then divide, remainder
  {
    generate: (guided) => {
      const dogs1 = randInt(20, 45);
      const dogs2 = randInt(10, 30);
      const groupSize = randInt(7, 12);
      const total = dogs1 + dogs2;
      const quotient = Math.floor(total / groupSize);
      const answer = total % groupSize;
      const q: GeneratedQuestion = {
        problemText: `At a dog show, there were ${dogs1} small dogs and ${dogs2} large dogs entered in the contest. The judge arranged them into groups of ${groupSize} for the first round. How many dogs were left over after the groups were made?`,
        answer,
        hint: `The keyword "left over" tells you the answer is the remainder. First add the dogs, then divide by ${groupSize}.`,
        solution: `Step 1: Add all dogs: ${dogs1} + ${dogs2} = ${total} dogs.\nStep 2: Divide by group size: ${total} ÷ ${groupSize} = ${quotient} groups with a remainder of ${answer}.\nStep 3: The keyword "left over" means the answer is the remainder.\nAnswer: ${answer} dogs were left over.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "left over" tells you the answer will be a remainder. First, add all the dogs. What is ${dogs1} + ${dogs2}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! There are ${total} dogs in total.`,
            feedbackIncorrect: `${dogs1} + ${dogs2} = ${total} dogs total.`,
            highlights: ['left over'],
          },
          {
            instruction: `Now divide ${total} by ${groupSize}. The keyword "left over" means the answer is the remainder. What is the remainder?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} dogs are left over!`,
            feedbackIncorrect: `${total} ÷ ${groupSize} = ${quotient} remainder ${answer}. The remainder is ${answer}.`,
            highlights: ['left over'],
          },
        ];
      }
      return q;
    },
  },
  // Q18: Art project time — subtract fractions with unlike denominators
  {
    generate: (guided) => {
      const pairs = [
        { a: '1/2', b: '3/8', answer: '1/8', aNum: 4, bNum: 3, denom: 8, numAnswer: 1 },
        { a: '2/3', b: '1/4', answer: '5/12', aNum: 8, bNum: 3, denom: 12, numAnswer: 5 },
        { a: '3/4', b: '1/3', answer: '5/12', aNum: 9, bNum: 4, denom: 12, numAnswer: 5 },
        { a: '1/2', b: '1/3', answer: '1/6', aNum: 3, bNum: 2, denom: 6, numAnswer: 1 },
        { a: '5/6', b: '1/2', answer: '1/3', aNum: 5, bNum: 3, denom: 6, numAnswer: 2 },
      ];
      const p = pick(pairs);
      const q: GeneratedQuestion = {
        problemText: `Isabel spent ${p.a} of an hour working on her art project on Monday. On Tuesday she spent ${p.b} of an hour. How much more time did Isabel spend on her project on Monday than on Tuesday?`,
        answer: p.numAnswer / p.denom,
        displayAnswer: p.answer,
        hint: `The keyword "how much more" tells you to subtract. Find a common denominator for ${p.a} and ${p.b}, then subtract.`,
        solution: `Step 1: The keyword "how much more" means subtraction: ${p.a} - ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Subtract the numerators: ${p.aNum} - ${p.bNum} = ${p.numAnswer}.\nAnswer: Isabel spent ${p.answer} of an hour more on Monday.`,
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
  // Q19: School store pencils — simple subtraction
  {
    generate: (guided) => {
      const total = randInt(60, 100);
      const leftOver = randInt(10, 30);
      const answer = total - leftOver;
      const q: GeneratedQuestion = {
        problemText: `The school store started the day with ${total} pencils. By the end of the day, only ${leftOver} pencils were left. How many pencils were sold during the day?`,
        answer,
        hint: `To find how many were sold, subtract what's left from what they started with.`,
        solution: `Step 1: Started with ${total} pencils, ${leftOver} were left.\nStep 2: Subtract to find how many sold: ${total} - ${leftOver} = ${answer}.\nAnswer: ${answer} pencils were sold.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `To find how many were sold, subtract what's left from the starting amount. What is ${total} - ${leftOver}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! ${answer} pencils were sold!`,
            feedbackIncorrect: `${total} - ${leftOver} = ${answer} pencils sold.`,
            highlights: [`${total} pencils`, `${leftOver} pencils were left`],
          },
        ];
      }
      return q;
    },
  },
  // Q20: Zoo penguins and sea lions — "times as many" multiply
  {
    generate: (guided) => {
      const penguinFish = randInt(4, 10);
      const multiplier = randInt(3, 6);
      const seaLionFish = penguinFish * multiplier;
      const answer = penguinFish + seaLionFish;
      const q: GeneratedQuestion = {
        problemText: `A zookeeper feeds the penguins ${penguinFish} pounds of fish each day. She feeds the sea lions ${multiplier} times as many pounds of fish as the penguins. How many pounds of fish does the zookeeper feed in all?`,
        answer,
        hint: `The keyword "times as many" tells you to multiply, then "in all" means add both amounts.`,
        solution: `Step 1: The keyword "${multiplier} times as many" means multiply: ${penguinFish} × ${multiplier} = ${seaLionFish} pounds for sea lions.\nStep 2: The keyword "in all" means add: ${penguinFish} + ${seaLionFish} = ${answer} pounds.\nAnswer: The zookeeper feeds ${answer} pounds of fish in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `The keyword "times as many" means multiply. How many pounds for sea lions? What is ${penguinFish} × ${multiplier}?`,
            expectedAnswer: seaLionFish,
            feedbackCorrect: `Correct! The sea lions eat ${seaLionFish} pounds.`,
            feedbackIncorrect: `${penguinFish} × ${multiplier} = ${seaLionFish} pounds.`,
            highlights: [`${multiplier} times as many`],
          },
          {
            instruction: `Now find the total ("in all" means add). What is ${penguinFish} + ${seaLionFish}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The zookeeper feeds ${answer} pounds in all!`,
            feedbackIncorrect: `${penguinFish} + ${seaLionFish} = ${answer} pounds.`,
            highlights: ['in all'],
          },
        ];
      }
      return q;
    },
  },
  // Q21: Read-a-thon — add two then "more than" add
  {
    generate: (guided) => {
      const pages1 = randInt(80, 150);
      const pages2 = randInt(60, 120);
      const combined = pages1 + pages2;
      const more = randInt(10, 25);
      const answer = combined + more;
      const q: GeneratedQuestion = {
        problemText: `During a read-a-thon, second graders read ${pages1} pages and third graders read ${pages2} pages. Fourth graders read ${more} more pages than the second and third graders combined. How many pages did the fourth graders read?`,
        answer,
        hint: `The keyword "more...than...combined" tells you to first add the two groups, then add the extra amount.`,
        solution: `Step 1: Find the combined total of second and third graders: ${pages1} + ${pages2} = ${combined} pages.\nStep 2: The keyword "${more} more...than" means add: ${combined} + ${more} = ${answer} pages.\nAnswer: The fourth graders read ${answer} pages.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the combined pages of second and third graders. What is ${pages1} + ${pages2}?`,
            expectedAnswer: combined,
            feedbackCorrect: `Correct! Second and third graders read ${combined} pages combined.`,
            feedbackIncorrect: `${pages1} + ${pages2} = ${combined} pages combined.`,
            highlights: ['combined'],
          },
          {
            instruction: `The keyword "more...than" means add. What is ${combined} + ${more}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The fourth graders read ${answer} pages!`,
            feedbackIncorrect: `${combined} + ${more} = ${answer} pages.`,
            highlights: [`${more} more pages than`],
          },
        ];
      }
      return q;
    },
  },
  // Q22: Wood glue — subtract fractions with unlike denominators
  {
    generate: (guided) => {
      const pairs = [
        { a: '7/8', b: '1/2', answer: '3/8', aNum: 7, bNum: 4, denom: 8, numAnswer: 3 },
        { a: '5/6', b: '1/3', answer: '1/2', aNum: 5, bNum: 2, denom: 6, numAnswer: 3 },
        { a: '3/4', b: '1/8', answer: '5/8', aNum: 6, bNum: 1, denom: 8, numAnswer: 5 },
        { a: '7/8', b: '1/4', answer: '5/8', aNum: 7, bNum: 2, denom: 8, numAnswer: 5 },
        { a: '2/3', b: '1/6', answer: '1/2', aNum: 4, bNum: 1, denom: 6, numAnswer: 3 },
      ];
      const p = pick(pairs);
      const q: GeneratedQuestion = {
        problemText: `Carter used ${p.a} of a bottle of wood glue for his birdhouse project. His partner Finn used ${p.b} of a bottle. How much more glue did Carter use than Finn?`,
        answer: p.numAnswer / p.denom,
        displayAnswer: p.answer,
        hint: `The keyword "how much more" tells you to subtract. Find a common denominator for ${p.a} and ${p.b}, then subtract.`,
        solution: `Step 1: The keyword "how much more" means subtraction: ${p.a} - ${p.b}.\nStep 2: Find a common denominator: ${p.a} = ${p.aNum}/${p.denom} and ${p.b} = ${p.bNum}/${p.denom}.\nStep 3: Subtract the numerators: ${p.aNum} - ${p.bNum} = ${p.numAnswer}.\nAnswer: Carter used ${p.answer} more of a bottle.`,
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

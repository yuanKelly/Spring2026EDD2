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
  // Q1: Cafe purchase — find cost of unknown item using algebra
  {
    generate: (guided) => {
      const sconeCount = randInt(2, 5);
      const sconePrice = randInt(1, 4);
      const latteCost = +(randInt(3, 6) + randInt(10, 90) / 100).toFixed(2);
      const total = +(latteCost + sconeCount * sconePrice).toFixed(2);
      const sconeTotal = +(total - latteCost).toFixed(2);
      const answer = sconePrice;
      const q: GeneratedQuestion = {
        problemText: `Alex spent $${total} at Rainy Day Cafe. She bought a latte for $${latteCost} and ${sconeCount} mini scones. How much did each mini scone cost?`,
        answer,
        hint: `Let x = cost of one scone. Set up the equation: $${latteCost} + ${sconeCount}x = $${total}. Subtract $${latteCost} from both sides, then divide by ${sconeCount}.`,
        solution: `Step 1: Let x = the cost of one mini scone.\nStep 2: Write the equation: $${latteCost} + ${sconeCount}x = $${total}.\nStep 3: Subtract the latte cost: $${total} - $${latteCost} = $${sconeTotal} spent on scones.\nStep 4: Divide by the number of scones: $${sconeTotal} ÷ ${sconeCount} = $${answer} per scone.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = the cost of one scone. First, subtract the latte cost from the total to find how much was spent on scones. What is $${total} - $${latteCost}?`,
            expectedAnswer: sconeTotal,
            feedbackCorrect: `Correct! $${total} - $${latteCost} = $${sconeTotal} was spent on scones.`,
            feedbackIncorrect: `Subtract the latte from the total: $${total} - $${latteCost} = $${sconeTotal}.`,
            highlights: [`$${total}`, `$${latteCost}`],
          },
          {
            instruction: `Now divide the scone total by the number of scones to find x. What is $${sconeTotal} ÷ ${sconeCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each mini scone costs $${answer}!`,
            feedbackIncorrect: `$${sconeTotal} ÷ ${sconeCount} = $${answer} per scone.`,
            highlights: [`${sconeCount} mini scones`],
          },
        ];
      }
      return q;
    },
  },
  // Q2: Hay bales — multiply whole number by mixed number
  {
    generate: (guided) => {
      const c = pick([4, 8]);
      const m = pick([{ w: 2, f: '1/2', impNum: 5, impDen: 2 }, { w: 3, f: '1/2', impNum: 7, impDen: 2 }]);
      const ans = (c * m.impNum) / m.impDen;
      const product = c * m.impNum;
      const q: GeneratedQuestion = {
        problemText: `The cattle at the Pike Farm are fed ${c} bales of hay each day. The horses are fed ${m.w} ${m.f} times as much hay as the cattle. How many bales of hay are the horses fed each day?`,
        answer: ans,
        hint: `Let x = bales for horses. x = ${m.w} ${m.f} × ${c}. Convert ${m.w} ${m.f} to an improper fraction (${m.impNum}/${m.impDen}), then multiply by ${c}.`,
        solution: `Step 1: Let x = the number of bales for horses.\nStep 2: Convert ${m.w} ${m.f} to an improper fraction: ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.\nStep 3: Multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}.\nStep 4: Simplify: ${product}/${m.impDen} = ${ans} bales.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = bales for horses. First, convert ${m.w} ${m.f} to an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            highlights: [`${m.w} ${m.f} times as much`],
          },
          {
            instruction: `Now multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does that simplify to?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! The horses are fed ${ans} bales of hay!`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. The horses are fed ${ans} bales.`,
            highlights: [`${c} bales of hay`],
          },
        ];
      }
      return q;
    },
  },
  // Q3: Street sweepers — multiply mixed number by whole number
  {
    generate: (guided) => {
      const w = randInt(1, 3);
      const f = pick([1, 2]);
      const m = pick([3, 6]);
      const impNum = w * 3 + f;
      const product = impNum * m;
      const aW = Math.floor(product / 3);
      const aF = product % 3;
      // Use fallback if not clean
      if (aF !== 0) {
        const q: GeneratedQuestion = {
          problemText: `On Monday a team of street sweepers cleaned 2 1/3 city blocks. Tuesday, the team cleaned 3 times as many blocks as on Monday. How many city blocks did the street sweepers clean on Tuesday?`,
          answer: 7,
          hint: `Let x = blocks on Tuesday. x = 3 × 2 1/3. Convert 2 1/3 to an improper fraction (7/3), then multiply by 3.`,
          solution: `Step 1: Let x = blocks cleaned on Tuesday.\nStep 2: Convert 2 1/3 to an improper fraction: 2 × 3 + 1 = 7, so 2 1/3 = 7/3.\nStep 3: Multiply: 3 × 7/3 = 21/3.\nStep 4: Simplify: 21/3 = 7 city blocks.`,
          njslsStandard: '4.NF.B.4',
        };
        if (guided) {
          q.steps = [
            {
              instruction: `Let x = blocks on Tuesday. First, convert 2 1/3 to an improper fraction. What is the numerator? (Hint: 2 × 3 + 1)`,
              expectedAnswer: 7,
              feedbackCorrect: `Correct! 2 1/3 = 7/3.`,
              feedbackIncorrect: `2 × 3 + 1 = 7. So 2 1/3 = 7/3.`,
              highlights: ['2 1/3 city blocks'],
            },
            {
              instruction: `Now multiply: 3 × 7/3 = 21/3. What does that simplify to?`,
              expectedAnswer: 7,
              feedbackCorrect: `Excellent! The team cleaned 7 city blocks on Tuesday!`,
              feedbackIncorrect: `21 ÷ 3 = 7 city blocks.`,
              highlights: ['3 times as many'],
            },
          ];
        }
        return q;
      }
      const q: GeneratedQuestion = {
        problemText: `On Monday a team of street sweepers cleaned ${w} ${f}/3 city blocks. Tuesday, the team cleaned ${m} times as many blocks as on Monday. How many city blocks did the street sweepers clean on Tuesday?`,
        answer: aW,
        hint: `Let x = blocks on Tuesday. x = ${m} × ${w} ${f}/3. Convert ${w} ${f}/3 to an improper fraction (${impNum}/3), then multiply by ${m}.`,
        solution: `Step 1: Let x = blocks cleaned on Tuesday.\nStep 2: Convert ${w} ${f}/3 to an improper fraction: ${w} × 3 + ${f} = ${impNum}, so ${w} ${f}/3 = ${impNum}/3.\nStep 3: Multiply: ${m} × ${impNum}/3 = ${product}/3.\nStep 4: Simplify: ${product}/3 = ${aW} city blocks.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = blocks on Tuesday. First, convert ${w} ${f}/3 to an improper fraction. What is the numerator? (Hint: ${w} × 3 + ${f})`,
            expectedAnswer: impNum,
            feedbackCorrect: `Correct! ${w} ${f}/3 = ${impNum}/3.`,
            feedbackIncorrect: `${w} × 3 + ${f} = ${impNum}. So ${w} ${f}/3 = ${impNum}/3.`,
            highlights: [`${w} ${f}/3 city blocks`],
          },
          {
            instruction: `Now multiply: ${m} × ${impNum}/3 = ${product}/3. What does that simplify to?`,
            expectedAnswer: aW,
            feedbackCorrect: `Excellent! The team cleaned ${aW} city blocks on Tuesday!`,
            feedbackIncorrect: `${product} ÷ 3 = ${aW} city blocks.`,
            highlights: [`${m} times as many`],
          },
        ];
      }
      return q;
    },
  },
  // Q4: Punch — multiply mixed number by whole number
  {
    generate: (guided) => {
      const v = pick([3, 6]);
      const wM = randInt(2, 5);
      const fM = pick([1, 2]);
      const impNum = wM * 3 + fM;
      const product = impNum * v;
      const aW = Math.floor(product / 3);
      const aF = product % 3;
      if (aF !== 0) {
        const q: GeneratedQuestion = {
          problemText: `Vincent and Ben each made a bowl of punch. Ben used 4 1/3 times as much lemonade as Vincent did. If Vincent used 3 cups of lemonade, how many cups of lemonade did Ben use?`,
          answer: 13,
          hint: `Let x = Ben's lemonade. x = 4 1/3 × 3. Convert 4 1/3 to an improper fraction (13/3), then multiply by 3.`,
          solution: `Step 1: Let x = cups of lemonade Ben used.\nStep 2: Convert 4 1/3 to an improper fraction: 4 × 3 + 1 = 13, so 4 1/3 = 13/3.\nStep 3: Multiply: 13/3 × 3 = 39/3.\nStep 4: Simplify: 39/3 = 13 cups.`,
          njslsStandard: '4.NF.B.4',
        };
        if (guided) {
          q.steps = [
            {
              instruction: `Let x = cups Ben used. First, convert 4 1/3 to an improper fraction. What is the numerator? (Hint: 4 × 3 + 1)`,
              expectedAnswer: 13,
              feedbackCorrect: `Correct! 4 1/3 = 13/3.`,
              feedbackIncorrect: `4 × 3 + 1 = 13. So 4 1/3 = 13/3.`,
              highlights: ['4 1/3 times as much'],
            },
            {
              instruction: `Now multiply: 13/3 × 3 = 39/3. What does that simplify to?`,
              expectedAnswer: 13,
              feedbackCorrect: `Excellent! Ben used 13 cups of lemonade!`,
              feedbackIncorrect: `39 ÷ 3 = 13 cups.`,
              highlights: ['3 cups of lemonade'],
            },
          ];
        }
        return q;
      }
      const q: GeneratedQuestion = {
        problemText: `Vincent and Ben each made a bowl of punch. Ben used ${wM} ${fM}/3 times as much lemonade as Vincent did. If Vincent used ${v} cups of lemonade, how many cups of lemonade did Ben use?`,
        answer: aW,
        hint: `Let x = Ben's lemonade. x = ${wM} ${fM}/3 × ${v}. Convert ${wM} ${fM}/3 to an improper fraction (${impNum}/3), then multiply by ${v}.`,
        solution: `Step 1: Let x = cups of lemonade Ben used.\nStep 2: Convert ${wM} ${fM}/3 to an improper fraction: ${wM} × 3 + ${fM} = ${impNum}, so ${wM} ${fM}/3 = ${impNum}/3.\nStep 3: Multiply: ${impNum}/3 × ${v} = ${product}/3.\nStep 4: Simplify: ${product}/3 = ${aW} cups.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = cups Ben used. First, convert ${wM} ${fM}/3 to an improper fraction. What is the numerator? (Hint: ${wM} × 3 + ${fM})`,
            expectedAnswer: impNum,
            feedbackCorrect: `Correct! ${wM} ${fM}/3 = ${impNum}/3.`,
            feedbackIncorrect: `${wM} × 3 + ${fM} = ${impNum}. So ${wM} ${fM}/3 = ${impNum}/3.`,
            highlights: [`${wM} ${fM}/3 times as much`],
          },
          {
            instruction: `Now multiply: ${impNum}/3 × ${v} = ${product}/3. What does that simplify to?`,
            expectedAnswer: aW,
            feedbackCorrect: `Excellent! Ben used ${aW} cups of lemonade!`,
            feedbackIncorrect: `${product} ÷ 3 = ${aW} cups.`,
            highlights: [`${v} cups of lemonade`],
          },
        ];
      }
      return q;
    },
  },
  // Q5: Time before practice — subtract then divide
  {
    generate: (guided) => {
      const totalMinutes = randInt(45, 90);
      const homeworkMinutes = randInt(15, 30);
      const minutesPerCard = randInt(5, 12);
      const remaining = totalMinutes - homeworkMinutes;
      const answer = Math.floor(remaining / minutesPerCard);
      const q: GeneratedQuestion = {
        problemText: `Jamie has ${totalMinutes} minutes before soccer practice. He does homework for ${homeworkMinutes} minutes. If it takes him ${minutesPerCard} minutes to make one card, how many cards can he make before practice?`,
        answer,
        hint: `Let x = number of cards. First find the remaining time: ${totalMinutes} - ${homeworkMinutes}. Then divide by ${minutesPerCard}.`,
        solution: `Step 1: Let x = the number of cards Jamie can make.\nStep 2: Find the remaining time: ${totalMinutes} - ${homeworkMinutes} = ${remaining} minutes left.\nStep 3: Divide by the time per card: ${remaining} ÷ ${minutesPerCard} = ${answer} cards.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = number of cards. First, how many minutes does Jamie have left after homework? What is ${totalMinutes} - ${homeworkMinutes}?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMinutes} - ${homeworkMinutes} = ${remaining} minutes left.`,
            feedbackIncorrect: `${totalMinutes} - ${homeworkMinutes} = ${remaining} minutes remaining.`,
            highlights: [`${totalMinutes} minutes`, `${homeworkMinutes} minutes`],
          },
          {
            instruction: `Now divide the remaining time by minutes per card. What is ${remaining} ÷ ${minutesPerCard}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Jamie can make ${answer} cards!`,
            feedbackIncorrect: `${remaining} ÷ ${minutesPerCard} = ${answer} cards.`,
            highlights: [`${minutesPerCard} minutes`],
          },
        ];
      }
      return q;
    },
  },
  // Q6: Water guns — "less than twice as many" expression
  {
    generate: (guided) => {
      const lincolnGuns = randInt(4, 10);
      const lessAmount = randInt(1, 5);
      const doubled = 2 * lincolnGuns;
      const answer = doubled - lessAmount;
      const q: GeneratedQuestion = {
        problemText: `Lincoln has ${lincolnGuns} water guns in his collection. Sophia has ${lessAmount} less than twice as many as Lincoln. How many water guns does Sophia have?`,
        answer,
        hint: `Let x = Sophia's water guns. "Twice as many" means multiply by 2, then "${lessAmount} less" means subtract ${lessAmount}. x = 2 × ${lincolnGuns} - ${lessAmount}.`,
        solution: `Step 1: Let x = the number of water guns Sophia has.\nStep 2: Find twice Lincoln's amount: 2 × ${lincolnGuns} = ${doubled}.\nStep 3: Subtract ${lessAmount} (because "${lessAmount} less than"): ${doubled} - ${lessAmount} = ${answer}.\nStep 4: Sophia has ${answer} water guns.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = Sophia's water guns. "Twice as many" means multiply by 2. What is 2 × ${lincolnGuns}?`,
            expectedAnswer: doubled,
            feedbackCorrect: `Correct! 2 × ${lincolnGuns} = ${doubled}.`,
            feedbackIncorrect: `2 × ${lincolnGuns} = ${doubled}.`,
            highlights: [`${lincolnGuns} water guns`, 'twice as many'],
          },
          {
            instruction: `Now subtract ${lessAmount} because the problem says "${lessAmount} less than." What is ${doubled} - ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Sophia has ${answer} water guns!`,
            feedbackIncorrect: `${doubled} - ${lessAmount} = ${answer}. Sophia has ${answer} water guns.`,
            highlights: [`${lessAmount} less than twice`],
          },
        ];
      }
      return q;
    },
  },
  // Q7: Deadlift — fraction of a number then subtract
  {
    generate: (guided) => {
      const divisor = pick([4, 5]);
      const mickeyWeight = divisor * randInt(30, 60);
      const lessAmount = randInt(5, 15);
      const fractionResult = mickeyWeight / divisor;
      const answer = fractionResult - lessAmount;
      const fractionWord = divisor === 4 ? '1/4' : '1/5';
      const q: GeneratedQuestion = {
        problemText: `Mickey can deadlift ${mickeyWeight} lbs at the gym. Kelly can lift ${lessAmount} pounds less than ${fractionWord} of the weight that Mickey can lift. How much can Kelly deadlift?`,
        answer,
        hint: `Let x = Kelly's lift. First find ${fractionWord} of ${mickeyWeight} (divide by ${divisor}), then subtract ${lessAmount}.`,
        solution: `Step 1: Let x = how much Kelly can deadlift.\nStep 2: Find ${fractionWord} of ${mickeyWeight}: ${mickeyWeight} ÷ ${divisor} = ${fractionResult} lbs.\nStep 3: Subtract ${lessAmount} (because "${lessAmount} pounds less"): ${fractionResult} - ${lessAmount} = ${answer} lbs.\nStep 4: Kelly can deadlift ${answer} lbs.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = Kelly's deadlift. First, find ${fractionWord} of ${mickeyWeight}. What is ${mickeyWeight} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${mickeyWeight} = ${fractionResult} lbs.`,
            feedbackIncorrect: `${mickeyWeight} ÷ ${divisor} = ${fractionResult} lbs.`,
            highlights: [`${mickeyWeight} lbs`, `${fractionWord} of the weight`],
          },
          {
            instruction: `Now subtract ${lessAmount} because the problem says "${lessAmount} pounds less." What is ${fractionResult} - ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Kelly can deadlift ${answer} lbs!`,
            feedbackIncorrect: `${fractionResult} - ${lessAmount} = ${answer} lbs. Kelly can deadlift ${answer} lbs.`,
            highlights: [`${lessAmount} pounds less`],
          },
        ];
      }
      return q;
    },
  },
];

export function generateFractions(guided: boolean): GeneratedQuestion {
  return pick(templates).generate(guided);
}

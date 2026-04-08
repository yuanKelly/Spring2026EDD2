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
  // Q8: Smoothie bar — subtract then divide (same structure as Cafe)
  {
    generate: (guided) => {
      const biteCount = randInt(2, 6);
      const bitePrice = randInt(1, 4);
      const smoothieCost = +(randInt(4, 7) + randInt(10, 90) / 100).toFixed(2);
      const total = +(smoothieCost + biteCount * bitePrice).toFixed(2);
      const biteTotal = +(total - smoothieCost).toFixed(2);
      const answer = bitePrice;
      const q: GeneratedQuestion = {
        problemText: `Priya spent $${total} at the smoothie bar. She bought a mango smoothie for $${smoothieCost} and ${biteCount} energy bites. How much did each energy bite cost?`,
        answer,
        hint: `Let x = cost of one energy bite. Set up the equation: $${smoothieCost} + ${biteCount}x = $${total}. Subtract $${smoothieCost} from both sides, then divide by ${biteCount}.`,
        solution: `Step 1: Let x = the cost of one energy bite.\nStep 2: Write the equation: $${smoothieCost} + ${biteCount}x = $${total}.\nStep 3: Subtract the smoothie cost: $${total} - $${smoothieCost} = $${biteTotal} spent on bites.\nStep 4: Divide by the number of bites: $${biteTotal} ÷ ${biteCount} = $${answer} per bite.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = the cost of one bite. First, subtract the smoothie cost from the total. What is $${total} - $${smoothieCost}?`,
            expectedAnswer: biteTotal,
            feedbackCorrect: `Correct! $${total} - $${smoothieCost} = $${biteTotal} was spent on bites.`,
            feedbackIncorrect: `Subtract the smoothie from the total: $${total} - $${smoothieCost} = $${biteTotal}.`,
            highlights: [`$${total}`, `$${smoothieCost}`],
          },
          {
            instruction: `Now divide by the number of bites to find x. What is $${biteTotal} ÷ ${biteCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each energy bite costs $${answer}!`,
            feedbackIncorrect: `$${biteTotal} ÷ ${biteCount} = $${answer} per bite.`,
            highlights: [`${biteCount} energy bites`],
          },
        ];
      }
      return q;
    },
  },
  // Q9: Baker flour — multiply whole number by mixed number (2 1/4)
  {
    generate: (guided) => {
      const c = pick([4, 8]);
      const m = pick([
        { w: 2, f: '1/4', impNum: 9, impDen: 4 },
        { w: 3, f: '1/4', impNum: 13, impDen: 4 },
        { w: 2, f: '3/4', impNum: 11, impDen: 4 },
      ]);
      const ans = (c * m.impNum) / m.impDen;
      const product = c * m.impNum;
      const q: GeneratedQuestion = {
        problemText: `A baker uses ${c} cups of flour to make a batch of muffins. She uses ${m.w} ${m.f} times as much flour to make a batch of bread loaves. How many cups of flour does she use for the bread?`,
        answer: ans,
        hint: `Let x = cups for bread. x = ${m.w} ${m.f} × ${c}. Convert ${m.w} ${m.f} to an improper fraction (${m.impNum}/${m.impDen}), then multiply by ${c}.`,
        solution: `Step 1: Let x = cups of flour for bread.\nStep 2: Convert ${m.w} ${m.f} to an improper fraction: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}, so ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.\nStep 3: Multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}.\nStep 4: Simplify: ${product}/${m.impDen} = ${ans} cups.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = cups for bread. First, convert ${m.w} ${m.f} to an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            highlights: [`${m.w} ${m.f} times as much`],
          },
          {
            instruction: `Now multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does that simplify to?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! The baker uses ${ans} cups of flour for bread!`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. She uses ${ans} cups.`,
            highlights: [`${c} cups of flour`],
          },
        ];
      }
      return q;
    },
  },
  // Q10: Delivery driver — simple "times as many" multiplication
  {
    generate: (guided) => {
      const friday = randInt(3, 8);
      const multiplier = randInt(3, 6);
      const answer = friday * multiplier;
      const q: GeneratedQuestion = {
        problemText: `On Friday, a delivery driver made ${friday} stops. On Saturday, she made ${multiplier} times as many stops as on Friday. How many stops did she make on Saturday?`,
        answer,
        hint: `Let x = stops on Saturday. "Times as many" means multiply: x = ${multiplier} × ${friday}.`,
        solution: `Step 1: Let x = stops on Saturday.\nStep 2: "Times as many" means multiply: ${multiplier} × ${friday} = ${answer} stops.\nAnswer: She made ${answer} stops on Saturday.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = stops on Saturday. "Times as many" means multiply. What is ${multiplier} × ${friday}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! She made ${answer} stops on Saturday!`,
            feedbackIncorrect: `${multiplier} × ${friday} = ${answer} stops.`,
            highlights: [`${multiplier} times as many`],
          },
        ];
      }
      return q;
    },
  },
  // Q11: Noah baseball — subtract then divide
  {
    generate: (guided) => {
      const perProblem = pick([4, 5, 6, 8, 9]);
      const problems = randInt(3, 8);
      const remaining = perProblem * problems;
      const snackMin = randInt(5, 15);
      const totalMin = remaining + snackMin;
      const answer = problems;
      const q: GeneratedQuestion = {
        problemText: `Noah has ${totalMin} minutes before baseball practice. He spends ${snackMin} minutes eating a snack. If it takes him ${perProblem} minutes to complete one math problem, how many math problems can he finish before practice?`,
        answer,
        hint: `Let x = number of problems. First find the remaining time: ${totalMin} - ${snackMin}. Then divide by ${perProblem}.`,
        solution: `Step 1: Let x = the number of problems Noah can finish.\nStep 2: Find the remaining time: ${totalMin} - ${snackMin} = ${remaining} minutes left.\nStep 3: Divide by the time per problem: ${remaining} ÷ ${perProblem} = ${answer} problems.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = number of problems. First, how many minutes does Noah have left after his snack? What is ${totalMin} - ${snackMin}?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMin} - ${snackMin} = ${remaining} minutes left.`,
            feedbackIncorrect: `${totalMin} - ${snackMin} = ${remaining} minutes remaining.`,
            highlights: [`${totalMin} minutes`, `${snackMin} minutes`],
          },
          {
            instruction: `Now divide the remaining time by minutes per problem. What is ${remaining} ÷ ${perProblem}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Noah can finish ${answer} problems!`,
            feedbackIncorrect: `${remaining} ÷ ${perProblem} = ${answer} problems.`,
            highlights: [`${perProblem} minutes`],
          },
        ];
      }
      return q;
    },
  },
  // Q12: Sea turtle — fraction of a number then subtract
  {
    generate: (guided) => {
      const divisor = pick([3, 4, 5]);
      const totalWeight = divisor * randInt(150, 250);
      const lessAmount = randInt(10, 30);
      const fractionResult = totalWeight / divisor;
      const answer = fractionResult - lessAmount;
      const fractionWord = divisor === 3 ? '1/3' : divisor === 4 ? '1/4' : '1/5';
      const q: GeneratedQuestion = {
        problemText: `A leatherback sea turtle weighs ${totalWeight} pounds. A green sea turtle weighs ${lessAmount} pounds less than ${fractionWord} of the weight of the leatherback. How much does the green sea turtle weigh?`,
        answer,
        hint: `Let x = green turtle's weight. First find ${fractionWord} of ${totalWeight} (divide by ${divisor}), then subtract ${lessAmount}.`,
        solution: `Step 1: Let x = how much the green sea turtle weighs.\nStep 2: Find ${fractionWord} of ${totalWeight}: ${totalWeight} ÷ ${divisor} = ${fractionResult} lbs.\nStep 3: Subtract ${lessAmount} (because "${lessAmount} pounds less"): ${fractionResult} - ${lessAmount} = ${answer} lbs.\nStep 4: The green sea turtle weighs ${answer} lbs.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = green turtle's weight. First, find ${fractionWord} of ${totalWeight}. What is ${totalWeight} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${totalWeight} = ${fractionResult} lbs.`,
            feedbackIncorrect: `${totalWeight} ÷ ${divisor} = ${fractionResult} lbs.`,
            highlights: [`${totalWeight} pounds`, `${fractionWord} of the weight`],
          },
          {
            instruction: `Now subtract ${lessAmount} because the problem says "${lessAmount} pounds less." What is ${fractionResult} - ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The green sea turtle weighs ${answer} lbs!`,
            feedbackIncorrect: `${fractionResult} - ${lessAmount} = ${answer} lbs.`,
            highlights: [`${lessAmount} pounds less`],
          },
        ];
      }
      return q;
    },
  },
  // Q13: Sunflowers — multiply mixed number by whole number (5 1/2)
  {
    generate: (guided) => {
      const c = pick([2, 4, 6]);
      const m = pick([
        { w: 5, f: '1/2', impNum: 11, impDen: 2 },
        { w: 3, f: '1/2', impNum: 7, impDen: 2 },
        { w: 4, f: '1/2', impNum: 9, impDen: 2 },
      ]);
      const ans = (c * m.impNum) / m.impDen;
      const product = c * m.impNum;
      const q: GeneratedQuestion = {
        problemText: `Elena and her brother Marcus each planted sunflower seeds. Marcus's tallest sunflower grew ${m.w} ${m.f} times as tall as Elena's. If Elena's sunflower grew ${c} inches tall, how tall did Marcus's sunflower grow?`,
        answer: ans,
        hint: `Let x = Marcus's sunflower height. x = ${m.w} ${m.f} × ${c}. Convert ${m.w} ${m.f} to an improper fraction (${m.impNum}/${m.impDen}), then multiply by ${c}.`,
        solution: `Step 1: Let x = Marcus's sunflower height.\nStep 2: Convert ${m.w} ${m.f} to an improper fraction: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}, so ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.\nStep 3: Multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}.\nStep 4: Simplify: ${product}/${m.impDen} = ${ans} inches.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = Marcus's height. First, convert ${m.w} ${m.f} to an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            highlights: [`${m.w} ${m.f} times as tall`],
          },
          {
            instruction: `Now multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does that simplify to?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! Marcus's sunflower grew ${ans} inches!`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. Marcus's sunflower is ${ans} inches tall.`,
            highlights: [`${c} inches tall`],
          },
        ];
      }
      return q;
    },
  },
  // Q14: Art supply store — subtract then divide (same structure as Cafe)
  {
    generate: (guided) => {
      const packCount = randInt(2, 6);
      const packPrice = randInt(1, 4);
      const sketchbookCost = +(randInt(5, 8) + randInt(10, 90) / 100).toFixed(2);
      const total = +(sketchbookCost + packCount * packPrice).toFixed(2);
      const packTotal = +(total - sketchbookCost).toFixed(2);
      const answer = packPrice;
      const q: GeneratedQuestion = {
        problemText: `Jordan spent $${total} at the art supply store. He bought a sketchbook for $${sketchbookCost} and ${packCount} packs of colored pencils that each cost the same amount. How much did each pack of colored pencils cost?`,
        answer,
        hint: `Let x = cost of one pack. Set up the equation: $${sketchbookCost} + ${packCount}x = $${total}. Subtract $${sketchbookCost} from both sides, then divide by ${packCount}.`,
        solution: `Step 1: Let x = the cost of one pack of colored pencils.\nStep 2: Write the equation: $${sketchbookCost} + ${packCount}x = $${total}.\nStep 3: Subtract the sketchbook cost: $${total} - $${sketchbookCost} = $${packTotal} spent on packs.\nStep 4: Divide by the number of packs: $${packTotal} ÷ ${packCount} = $${answer} per pack.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = the cost of one pack. First, subtract the sketchbook cost from the total. What is $${total} - $${sketchbookCost}?`,
            expectedAnswer: packTotal,
            feedbackCorrect: `Correct! $${total} - $${sketchbookCost} = $${packTotal} was spent on packs.`,
            feedbackIncorrect: `Subtract the sketchbook from the total: $${total} - $${sketchbookCost} = $${packTotal}.`,
            highlights: [`$${total}`, `$${sketchbookCost}`],
          },
          {
            instruction: `Now divide by the number of packs to find x. What is $${packTotal} ÷ ${packCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each pack costs $${answer}!`,
            feedbackIncorrect: `$${packTotal} ÷ ${packCount} = $${answer} per pack.`,
            highlights: [`${packCount} packs`],
          },
        ];
      }
      return q;
    },
  },
  // Q15: Potted plants — "more than twice as many" expression
  {
    generate: (guided) => {
      const oliviaPlants = randInt(4, 10);
      const moreAmount = randInt(3, 8);
      const doubled = 2 * oliviaPlants;
      const answer = doubled + moreAmount;
      const q: GeneratedQuestion = {
        problemText: `Olivia has ${oliviaPlants} potted plants on her porch. Her neighbor has ${moreAmount} more than twice as many plants as Olivia. How many potted plants does her neighbor have?`,
        answer,
        hint: `Let x = neighbor's plants. "Twice as many" means multiply by 2, then "${moreAmount} more" means add ${moreAmount}. x = 2 × ${oliviaPlants} + ${moreAmount}.`,
        solution: `Step 1: Let x = the number of plants the neighbor has.\nStep 2: Find twice Olivia's amount: 2 × ${oliviaPlants} = ${doubled}.\nStep 3: Add ${moreAmount} (because "${moreAmount} more than"): ${doubled} + ${moreAmount} = ${answer}.\nStep 4: The neighbor has ${answer} potted plants.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = neighbor's plants. "Twice as many" means multiply by 2. What is 2 × ${oliviaPlants}?`,
            expectedAnswer: doubled,
            feedbackCorrect: `Correct! 2 × ${oliviaPlants} = ${doubled}.`,
            feedbackIncorrect: `2 × ${oliviaPlants} = ${doubled}.`,
            highlights: [`${oliviaPlants} potted plants`, 'twice as many'],
          },
          {
            instruction: `Now add ${moreAmount} because the problem says "${moreAmount} more than." What is ${doubled} + ${moreAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The neighbor has ${answer} plants!`,
            feedbackIncorrect: `${doubled} + ${moreAmount} = ${answer}. The neighbor has ${answer} plants.`,
            highlights: [`${moreAmount} more than twice`],
          },
        ];
      }
      return q;
    },
  },
  // Q16: Blue whale/dolphin — fraction of a number then subtract
  {
    generate: (guided) => {
      const divisor = pick([4, 5, 6]);
      const whaleLength = divisor * randInt(12, 25);
      const lessAmount = randInt(5, 15);
      const fractionResult = whaleLength / divisor;
      const answer = fractionResult - lessAmount;
      const fractionWord = divisor === 4 ? '1/4' : divisor === 5 ? '1/5' : '1/6';
      const q: GeneratedQuestion = {
        problemText: `A blue whale is ${whaleLength} feet long. A dolphin is ${lessAmount} feet less than ${fractionWord} the length of the blue whale. How long is the dolphin?`,
        answer,
        hint: `Let x = dolphin's length. First find ${fractionWord} of ${whaleLength} (divide by ${divisor}), then subtract ${lessAmount}.`,
        solution: `Step 1: Let x = the dolphin's length.\nStep 2: Find ${fractionWord} of ${whaleLength}: ${whaleLength} ÷ ${divisor} = ${fractionResult} feet.\nStep 3: Subtract ${lessAmount} (because "${lessAmount} feet less"): ${fractionResult} - ${lessAmount} = ${answer} feet.\nStep 4: The dolphin is ${answer} feet long.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = dolphin's length. First, find ${fractionWord} of ${whaleLength}. What is ${whaleLength} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${whaleLength} = ${fractionResult} feet.`,
            feedbackIncorrect: `${whaleLength} ÷ ${divisor} = ${fractionResult} feet.`,
            highlights: [`${whaleLength} feet`, `${fractionWord} the length`],
          },
          {
            instruction: `Now subtract ${lessAmount} because the problem says "${lessAmount} feet less." What is ${fractionResult} - ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The dolphin is ${answer} feet long!`,
            feedbackIncorrect: `${fractionResult} - ${lessAmount} = ${answer} feet.`,
            highlights: [`${lessAmount} feet less`],
          },
        ];
      }
      return q;
    },
  },
  // Q17: Coach practice — subtract then divide
  {
    generate: (guided) => {
      const perDrill = pick([6, 7, 8, 9]);
      const drills = randInt(3, 8);
      const remaining = perDrill * drills;
      const warmupMin = randInt(10, 20);
      const totalMin = remaining + warmupMin;
      const answer = drills;
      const q: GeneratedQuestion = {
        problemText: `Coach Tran has ${totalMin} minutes of practice time. She spends ${warmupMin} minutes on warm-ups. If each drill takes ${perDrill} minutes, how many full drills can the team complete in the remaining time?`,
        answer,
        hint: `Let x = number of drills. First find the remaining time: ${totalMin} - ${warmupMin}. Then divide by ${perDrill}.`,
        solution: `Step 1: Let x = the number of drills.\nStep 2: Find remaining time: ${totalMin} - ${warmupMin} = ${remaining} minutes.\nStep 3: Divide by minutes per drill: ${remaining} ÷ ${perDrill} = ${answer} drills.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = number of drills. First, how many minutes are left after warm-ups? What is ${totalMin} - ${warmupMin}?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMin} - ${warmupMin} = ${remaining} minutes left.`,
            feedbackIncorrect: `${totalMin} - ${warmupMin} = ${remaining} minutes remaining.`,
            highlights: [`${totalMin} minutes`, `${warmupMin} minutes`],
          },
          {
            instruction: `Now divide the remaining time by minutes per drill. What is ${remaining} ÷ ${perDrill}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The team can complete ${answer} drills!`,
            feedbackIncorrect: `${remaining} ÷ ${perDrill} = ${answer} drills.`,
            highlights: [`${perDrill} minutes`],
          },
        ];
      }
      return q;
    },
  },
  // Q18: Journalist articles — multiply whole by mixed number (3 1/2)
  {
    generate: (guided) => {
      const c = pick([2, 4, 6]);
      const m = pick([
        { w: 3, f: '1/2', impNum: 7, impDen: 2 },
        { w: 2, f: '1/2', impNum: 5, impDen: 2 },
        { w: 4, f: '1/2', impNum: 9, impDen: 2 },
      ]);
      const ans = (c * m.impNum) / m.impDen;
      const product = c * m.impNum;
      const q: GeneratedQuestion = {
        problemText: `On Wednesday, a journalist wrote ${c} articles. On Thursday, she wrote ${m.w} ${m.f} times as many articles as on Wednesday. How many articles did she write on Thursday?`,
        answer: ans,
        hint: `Let x = articles on Thursday. x = ${m.w} ${m.f} × ${c}. Convert ${m.w} ${m.f} to an improper fraction (${m.impNum}/${m.impDen}), then multiply by ${c}.`,
        solution: `Step 1: Let x = articles on Thursday.\nStep 2: Convert ${m.w} ${m.f} to an improper fraction: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}, so ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.\nStep 3: Multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}.\nStep 4: Simplify: ${product}/${m.impDen} = ${ans} articles.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = articles on Thursday. First, convert ${m.w} ${m.f} to an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So ${m.w} ${m.f} = ${m.impNum}/${m.impDen}.`,
            highlights: [`${m.w} ${m.f} times as many`],
          },
          {
            instruction: `Now multiply: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does that simplify to?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! She wrote ${ans} articles on Thursday!`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans} articles.`,
            highlights: [`${c} articles`],
          },
        ];
      }
      return q;
    },
  },
  // Q19: Beach shells — multiply then subtract ("less than X times")
  {
    generate: (guided) => {
      const samShells = randInt(4, 12);
      const multiplier = randInt(3, 6);
      const lessAmount = randInt(1, 6);
      const multiplied = multiplier * samShells;
      const answer = multiplied - lessAmount;
      const q: GeneratedQuestion = {
        problemText: `Sam and Jada each collected shells at the beach. Jada collected ${lessAmount} less than ${multiplier} times as many shells as Sam. If Sam collected ${samShells} shells, how many shells did Jada collect?`,
        answer,
        hint: `Let x = Jada's shells. "${multiplier} times as many" means multiply by ${multiplier}, then "${lessAmount} less" means subtract ${lessAmount}. x = ${multiplier} × ${samShells} - ${lessAmount}.`,
        solution: `Step 1: Let x = the number of shells Jada collected.\nStep 2: Find ${multiplier} times Sam's amount: ${multiplier} × ${samShells} = ${multiplied}.\nStep 3: Subtract ${lessAmount} (because "${lessAmount} less than"): ${multiplied} - ${lessAmount} = ${answer}.\nStep 4: Jada collected ${answer} shells.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = Jada's shells. "${multiplier} times as many" means multiply. What is ${multiplier} × ${samShells}?`,
            expectedAnswer: multiplied,
            feedbackCorrect: `Correct! ${multiplier} × ${samShells} = ${multiplied}.`,
            feedbackIncorrect: `${multiplier} × ${samShells} = ${multiplied}.`,
            highlights: [`${samShells} shells`, `${multiplier} times as many`],
          },
          {
            instruction: `Now subtract ${lessAmount} because the problem says "${lessAmount} less than." What is ${multiplied} - ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Jada collected ${answer} shells!`,
            feedbackIncorrect: `${multiplied} - ${lessAmount} = ${answer}. Jada collected ${answer} shells.`,
            highlights: [`${lessAmount} less than`],
          },
        ];
      }
      return q;
    },
  },
  // Q20: Farmer's market — subtract then divide (same structure as Cafe)
  {
    generate: (guided) => {
      const bunchCount = randInt(3, 6);
      const bunchPrice = randInt(2, 5);
      const honeyCost = +(randInt(5, 9) + randInt(10, 90) / 100).toFixed(2);
      const total = +(honeyCost + bunchCount * bunchPrice).toFixed(2);
      const bunchTotal = +(total - honeyCost).toFixed(2);
      const answer = bunchPrice;
      const q: GeneratedQuestion = {
        problemText: `Caleb spent $${total} at the farmer's market. He bought a jar of honey for $${honeyCost} and ${bunchCount} bunches of flowers that each cost the same amount. How much did each bunch of flowers cost?`,
        answer,
        hint: `Let x = cost of one bunch. Set up the equation: $${honeyCost} + ${bunchCount}x = $${total}. Subtract $${honeyCost} from both sides, then divide by ${bunchCount}.`,
        solution: `Step 1: Let x = the cost of one bunch of flowers.\nStep 2: Write the equation: $${honeyCost} + ${bunchCount}x = $${total}.\nStep 3: Subtract the honey cost: $${total} - $${honeyCost} = $${bunchTotal} spent on flowers.\nStep 4: Divide by the number of bunches: $${bunchTotal} ÷ ${bunchCount} = $${answer} per bunch.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = the cost of one bunch. First, subtract the honey cost from the total. What is $${total} - $${honeyCost}?`,
            expectedAnswer: bunchTotal,
            feedbackCorrect: `Correct! $${total} - $${honeyCost} = $${bunchTotal} was spent on flowers.`,
            feedbackIncorrect: `Subtract the honey from the total: $${total} - $${honeyCost} = $${bunchTotal}.`,
            highlights: [`$${total}`, `$${honeyCost}`],
          },
          {
            instruction: `Now divide by the number of bunches to find x. What is $${bunchTotal} ÷ ${bunchCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each bunch costs $${answer}!`,
            feedbackIncorrect: `$${bunchTotal} ÷ ${bunchCount} = $${answer} per bunch.`,
            highlights: [`${bunchCount} bunches`],
          },
        ];
      }
      return q;
    },
  },
  // Q21: Freight train — fraction of a number then subtract
  {
    generate: (guided) => {
      const divisor = pick([2, 4, 5]);
      const freightSpeed = divisor * randInt(20, 40);
      const lessAmount = randInt(5, 20);
      const fractionResult = freightSpeed / divisor;
      const answer = fractionResult - lessAmount;
      const fractionWord = divisor === 2 ? '1/2' : divisor === 4 ? '1/4' : '1/5';
      const q: GeneratedQuestion = {
        problemText: `A freight train is traveling at ${freightSpeed} miles per hour. A passenger train is traveling at ${lessAmount} miles per hour less than ${fractionWord} the speed of the freight train. How fast is the passenger train traveling?`,
        answer,
        hint: `Let x = passenger speed. First find ${fractionWord} of ${freightSpeed} (divide by ${divisor}), then subtract ${lessAmount}.`,
        solution: `Step 1: Let x = the passenger train's speed.\nStep 2: Find ${fractionWord} of ${freightSpeed}: ${freightSpeed} ÷ ${divisor} = ${fractionResult} mph.\nStep 3: Subtract ${lessAmount} (because "${lessAmount} miles per hour less"): ${fractionResult} - ${lessAmount} = ${answer} mph.\nStep 4: The passenger train is traveling at ${answer} mph.`,
        njslsStandard: '4.NF.B.4',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = passenger speed. First, find ${fractionWord} of ${freightSpeed}. What is ${freightSpeed} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${freightSpeed} = ${fractionResult} mph.`,
            feedbackIncorrect: `${freightSpeed} ÷ ${divisor} = ${fractionResult} mph.`,
            highlights: [`${freightSpeed} miles per hour`, `${fractionWord} the speed`],
          },
          {
            instruction: `Now subtract ${lessAmount} because the problem says "${lessAmount} miles per hour less." What is ${fractionResult} - ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The passenger train is going ${answer} mph!`,
            feedbackIncorrect: `${fractionResult} - ${lessAmount} = ${answer} mph.`,
            highlights: [`${lessAmount} miles per hour less`],
          },
        ];
      }
      return q;
    },
  },
  // Q22: Piano recital — subtract then divide
  {
    generate: (guided) => {
      const perRun = pick([5, 6, 7, 8]);
      const runs = randInt(3, 10);
      const remaining = perRun * runs;
      const reviewMin = randInt(10, 25);
      const totalMin = remaining + reviewMin;
      const answer = runs;
      const q: GeneratedQuestion = {
        problemText: `Maya has ${totalMin} minutes before her piano recital. She spends ${reviewMin} minutes reviewing her sheet music. If each practice run of her piece takes ${perRun} minutes, how many full practice runs can she complete before the recital?`,
        answer,
        hint: `Let x = number of practice runs. First find the remaining time: ${totalMin} - ${reviewMin}. Then divide by ${perRun}.`,
        solution: `Step 1: Let x = the number of practice runs.\nStep 2: Find remaining time: ${totalMin} - ${reviewMin} = ${remaining} minutes.\nStep 3: Divide by minutes per run: ${remaining} ÷ ${perRun} = ${answer} runs.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Let x = number of runs. First, how many minutes are left after reviewing? What is ${totalMin} - ${reviewMin}?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMin} - ${reviewMin} = ${remaining} minutes left.`,
            feedbackIncorrect: `${totalMin} - ${reviewMin} = ${remaining} minutes remaining.`,
            highlights: [`${totalMin} minutes`, `${reviewMin} minutes`],
          },
          {
            instruction: `Now divide the remaining time by minutes per run. What is ${remaining} ÷ ${perRun}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Maya can complete ${answer} practice runs!`,
            feedbackIncorrect: `${remaining} ÷ ${perRun} = ${answer} runs.`,
            highlights: [`${perRun} minutes`],
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

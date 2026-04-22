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
            instruction: `Let x = cost of one scone. Alex spent $${latteCost} on the latte and ${sconeCount}x on scones. Equation: $${latteCost} + ${sconeCount}x = ___. Look at the problem: what number fills the blank?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Alex spent $${total} total, so $${latteCost} + ${sconeCount}x = $${total}.`,
            feedbackIncorrect: `Alex spent $${total} total, so the equation is $${latteCost} + ${sconeCount}x = $${total}.`,
            highlights: [`$${total}`],
          },
          {
            instruction: `To solve for x, first subtract the latte cost from both sides: $${total} - $${latteCost}. What do you get?`,
            expectedAnswer: sconeTotal,
            feedbackCorrect: `Correct! $${total} - $${latteCost} = $${sconeTotal}, so ${sconeCount}x = $${sconeTotal}.`,
            feedbackIncorrect: `$${total} - $${latteCost} = $${sconeTotal}. So ${sconeCount}x = $${sconeTotal}.`,
            highlights: [`$${total}`, `$${latteCost}`],
          },
          {
            instruction: `Now divide both sides by ${sconeCount} to find x. What is $${sconeTotal} ÷ ${sconeCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = $${answer}. Each mini scone cost $${answer}.`,
            feedbackIncorrect: `$${sconeTotal} ÷ ${sconeCount} = $${answer}. So x = $${answer} per scone.`,
            highlights: [`${sconeCount} mini scones`],
          },
          {
            instruction: `Check by plugging x = $${answer} back in. What is $${latteCost} + ${sconeCount} × $${answer}? (Should equal $${total}.)`,
            expectedAnswer: total,
            feedbackCorrect: `Verified! $${latteCost} + ${sconeCount} × $${answer} = $${total}. x = $${answer} is correct.`,
            feedbackIncorrect: `$${latteCost} + ${sconeCount} × $${answer} = $${total}. That matches the total, so x = $${answer} is correct.`,
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
            instruction: `Let x = bales for horses. The horses are fed ${m.w} ${m.f} times as much as the cattle, so x = ${m.w} ${m.f} × ___. Look at the problem: what number fills the blank?`,
            expectedAnswer: c,
            feedbackCorrect: `Correct! The cattle get ${c} bales, so the equation is x = ${m.w} ${m.f} × ${c}.`,
            feedbackIncorrect: `The cattle get ${c} bales each day, so the equation is x = ${m.w} ${m.f} × ${c}.`,
            highlights: [`${c} bales of hay`],
          },
          {
            instruction: `To solve x = ${m.w} ${m.f} × ${c}, first rewrite ${m.w} ${m.f} as an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}, so x = ${m.impNum}/${m.impDen} × ${c}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So x = ${m.impNum}/${m.impDen} × ${c}.`,
            highlights: [`${m.w} ${m.f} times as much`],
          },
          {
            instruction: `Now multiply to find x: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does x equal?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! x = ${ans}. The horses are fed ${ans} bales of hay.`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. So x = ${ans} bales.`,
          },
          {
            instruction: `Check by plugging x back in. The equation x × ${m.impDen} = ${m.impNum} × ${c} should hold. What is ${ans} × ${m.impDen}?`,
            expectedAnswer: product,
            feedbackCorrect: `Verified! ${ans} × ${m.impDen} = ${product} = ${m.impNum} × ${c}. x = ${ans} is correct.`,
            feedbackIncorrect: `${ans} × ${m.impDen} = ${product}, which equals ${m.impNum} × ${c} = ${product}. x = ${ans} checks out.`,
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
              instruction: `Let x = blocks on Tuesday. Tuesday was 3 times as many as Monday's 2 1/3 blocks. The equation is x = ___ × 2 1/3. What number fills the blank?`,
              expectedAnswer: 3,
              feedbackCorrect: `Correct! x = 3 × 2 1/3.`,
              feedbackIncorrect: `Tuesday = 3 × Monday, so x = 3 × 2 1/3.`,
              highlights: ['3 times as many'],
            },
            {
              instruction: `To solve x = 3 × 2 1/3, first rewrite 2 1/3 as an improper fraction. What is the numerator? (Hint: 2 × 3 + 1)`,
              expectedAnswer: 7,
              feedbackCorrect: `Correct! 2 1/3 = 7/3, so x = 3 × 7/3.`,
              feedbackIncorrect: `2 × 3 + 1 = 7. So x = 3 × 7/3.`,
              highlights: ['2 1/3 city blocks'],
            },
            {
              instruction: `Now multiply to find x: 3 × 7/3 = 21/3. What does x equal?`,
              expectedAnswer: 7,
              feedbackCorrect: `Excellent! x = 7. The team cleaned 7 city blocks on Tuesday.`,
              feedbackIncorrect: `21 ÷ 3 = 7. So x = 7 city blocks.`,
            },
            {
              instruction: `Check by reversing the division. You divided 21 by 3 to get x. What is x × 3? (Should get back 21.)`,
              expectedAnswer: 21,
              feedbackCorrect: `Verified! 7 × 3 = 21. x = 7 is correct.`,
              feedbackIncorrect: `7 × 3 = 21. That matches, so x = 7 is correct.`,
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
            instruction: `Let x = blocks on Tuesday. Tuesday was ${m} times as many as Monday's ${w} ${f}/3 blocks. The equation is x = ___ × ${w} ${f}/3. What number fills the blank?`,
            expectedAnswer: m,
            feedbackCorrect: `Correct! x = ${m} × ${w} ${f}/3.`,
            feedbackIncorrect: `Tuesday = ${m} × Monday, so x = ${m} × ${w} ${f}/3.`,
            highlights: [`${m} times as many`],
          },
          {
            instruction: `To solve x = ${m} × ${w} ${f}/3, first rewrite ${w} ${f}/3 as an improper fraction. What is the numerator? (Hint: ${w} × 3 + ${f})`,
            expectedAnswer: impNum,
            feedbackCorrect: `Correct! ${w} ${f}/3 = ${impNum}/3, so x = ${m} × ${impNum}/3.`,
            feedbackIncorrect: `${w} × 3 + ${f} = ${impNum}. So x = ${m} × ${impNum}/3.`,
            highlights: [`${w} ${f}/3 city blocks`],
          },
          {
            instruction: `Now multiply to find x: ${m} × ${impNum}/3 = ${product}/3. What does x equal?`,
            expectedAnswer: aW,
            feedbackCorrect: `Excellent! x = ${aW}. The team cleaned ${aW} city blocks on Tuesday.`,
            feedbackIncorrect: `${product} ÷ 3 = ${aW}. So x = ${aW} city blocks.`,
          },
          {
            instruction: `Check by reversing the division. You divided ${product} by 3 to get x. What is x × 3? (Should get back ${product}.)`,
            expectedAnswer: product,
            feedbackCorrect: `Verified! ${aW} × 3 = ${product}. x = ${aW} is correct.`,
            feedbackIncorrect: `${aW} × 3 = ${product}. That matches, so x = ${aW} is correct.`,
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
              instruction: `Let x = cups Ben used. Ben used 4 1/3 times as much as Vincent. The equation is x = 4 1/3 × ___. Look at the problem: how many cups did Vincent use?`,
              expectedAnswer: 3,
              feedbackCorrect: `Correct! Vincent used 3 cups, so x = 4 1/3 × 3.`,
              feedbackIncorrect: `Vincent used 3 cups, so x = 4 1/3 × 3.`,
              highlights: ['3 cups of lemonade'],
            },
            {
              instruction: `To solve x = 4 1/3 × 3, first rewrite 4 1/3 as an improper fraction. What is the numerator? (Hint: 4 × 3 + 1)`,
              expectedAnswer: 13,
              feedbackCorrect: `Correct! 4 1/3 = 13/3, so x = 13/3 × 3.`,
              feedbackIncorrect: `4 × 3 + 1 = 13. So x = 13/3 × 3.`,
              highlights: ['4 1/3 times as much'],
            },
            {
              instruction: `Now multiply to find x: 13/3 × 3 = 39/3. What does x equal?`,
              expectedAnswer: 13,
              feedbackCorrect: `Excellent! x = 13. Ben used 13 cups of lemonade.`,
              feedbackIncorrect: `39 ÷ 3 = 13. So x = 13 cups.`,
            },
            {
              instruction: `Check by reversing the division. You divided 39 by 3 to get x. What is x × 3? (Should get back 39.)`,
              expectedAnswer: 39,
              feedbackCorrect: `Verified! 13 × 3 = 39. x = 13 is correct.`,
              feedbackIncorrect: `13 × 3 = 39. That matches, so x = 13 is correct.`,
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
            instruction: `Let x = cups Ben used. Ben used ${wM} ${fM}/3 times as much as Vincent. The equation is x = ${wM} ${fM}/3 × ___. Look at the problem: how many cups did Vincent use?`,
            expectedAnswer: v,
            feedbackCorrect: `Correct! Vincent used ${v} cups, so x = ${wM} ${fM}/3 × ${v}.`,
            feedbackIncorrect: `Vincent used ${v} cups, so x = ${wM} ${fM}/3 × ${v}.`,
            highlights: [`${v} cups of lemonade`],
          },
          {
            instruction: `To solve x = ${wM} ${fM}/3 × ${v}, first rewrite ${wM} ${fM}/3 as an improper fraction. What is the numerator? (Hint: ${wM} × 3 + ${fM})`,
            expectedAnswer: impNum,
            feedbackCorrect: `Correct! ${wM} ${fM}/3 = ${impNum}/3, so x = ${impNum}/3 × ${v}.`,
            feedbackIncorrect: `${wM} × 3 + ${fM} = ${impNum}. So x = ${impNum}/3 × ${v}.`,
            highlights: [`${wM} ${fM}/3 times as much`],
          },
          {
            instruction: `Now multiply to find x: ${impNum}/3 × ${v} = ${product}/3. What does x equal?`,
            expectedAnswer: aW,
            feedbackCorrect: `Excellent! x = ${aW}. Ben used ${aW} cups of lemonade.`,
            feedbackIncorrect: `${product} ÷ 3 = ${aW}. So x = ${aW} cups.`,
          },
          {
            instruction: `Check by reversing the division. You divided ${product} by 3 to get x. What is x × 3? (Should get back ${product}.)`,
            expectedAnswer: product,
            feedbackCorrect: `Verified! ${aW} × 3 = ${product}. x = ${aW} is correct.`,
            feedbackIncorrect: `${aW} × 3 = ${product}. That matches, so x = ${aW} is correct.`,
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
            instruction: `Let x = number of cards Jamie can make. He spends ${homeworkMinutes} min on homework and ${minutesPerCard}x min on cards. The total practice time equals ___ minutes. Look at the problem: what is his total time?`,
            expectedAnswer: totalMinutes,
            feedbackCorrect: `Correct! Jamie has ${totalMinutes} min total, so ${homeworkMinutes} + ${minutesPerCard}x ≤ ${totalMinutes}.`,
            feedbackIncorrect: `Jamie has ${totalMinutes} minutes total, so ${homeworkMinutes} + ${minutesPerCard}x ≤ ${totalMinutes}.`,
            highlights: [`${totalMinutes} minutes`],
          },
          {
            instruction: `Subtract the homework time from both sides: ${totalMinutes} − ${homeworkMinutes}. How many minutes remain for cards?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMinutes} − ${homeworkMinutes} = ${remaining} min left for cards, so ${minutesPerCard}x ≤ ${remaining}.`,
            feedbackIncorrect: `${totalMinutes} − ${homeworkMinutes} = ${remaining} min remaining. So ${minutesPerCard}x ≤ ${remaining}.`,
            highlights: [`${totalMinutes} minutes`, `${homeworkMinutes} minutes`],
          },
          {
            instruction: `Now find x: how many whole cards (each ${minutesPerCard} min) fit in ${remaining} min?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. Jamie can make ${answer} cards before practice.`,
            feedbackIncorrect: `${answer} cards take ${answer * minutesPerCard} min, and ${answer + 1} would take ${(answer + 1) * minutesPerCard} min (too much). So x = ${answer}.`,
            highlights: [`${minutesPerCard} minutes`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. How many minutes do ${answer} cards take? What is ${answer} × ${minutesPerCard}? (Should fit in ${remaining} min.)`,
            expectedAnswer: answer * minutesPerCard,
            feedbackCorrect: `Verified! ${answer} × ${minutesPerCard} = ${answer * minutesPerCard} min, which fits in the ${remaining} min available. x = ${answer} is correct.`,
            feedbackIncorrect: `${answer} × ${minutesPerCard} = ${answer * minutesPerCard} min, which fits in ${remaining} min. x = ${answer} checks out.`,
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
            instruction: `Let x = Sophia's water guns. "${lessAmount} less than twice as many as Lincoln." Equation: x = 2 × ___ − ${lessAmount}. Look at the problem: how many does Lincoln have?`,
            expectedAnswer: lincolnGuns,
            feedbackCorrect: `Correct! Lincoln has ${lincolnGuns} guns, so x = 2 × ${lincolnGuns} − ${lessAmount}.`,
            feedbackIncorrect: `Lincoln has ${lincolnGuns} water guns, so x = 2 × ${lincolnGuns} − ${lessAmount}.`,
            highlights: [`${lincolnGuns} water guns`],
          },
          {
            instruction: `To solve x = 2 × ${lincolnGuns} − ${lessAmount}, first compute 2 × ${lincolnGuns}. What is 2 × ${lincolnGuns}?`,
            expectedAnswer: doubled,
            feedbackCorrect: `Correct! 2 × ${lincolnGuns} = ${doubled}, so x = ${doubled} − ${lessAmount}.`,
            feedbackIncorrect: `2 × ${lincolnGuns} = ${doubled}. So x = ${doubled} − ${lessAmount}.`,
            highlights: ['twice as many'],
          },
          {
            instruction: `Now subtract ${lessAmount} to find x. What is ${doubled} − ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. Sophia has ${answer} water guns.`,
            feedbackIncorrect: `${doubled} − ${lessAmount} = ${answer}. So x = ${answer} water guns.`,
            highlights: [`${lessAmount} less than twice`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Add ${lessAmount}, then divide by 2. You should get Lincoln's count. What is (${answer} + ${lessAmount}) ÷ 2?`,
            expectedAnswer: lincolnGuns,
            feedbackCorrect: `Verified! (${answer} + ${lessAmount}) ÷ 2 = ${lincolnGuns}, matching Lincoln's count. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} + ${lessAmount}) ÷ 2 = ${lincolnGuns}, which matches Lincoln's count. x = ${answer} checks out.`,
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
            instruction: `Let x = Kelly's deadlift. Kelly lifts ${lessAmount} lbs less than ${fractionWord} of Mickey's lift. Equation: x = (___ ÷ ${divisor}) − ${lessAmount}. Look at the problem: how much does Mickey lift?`,
            expectedAnswer: mickeyWeight,
            feedbackCorrect: `Correct! Mickey lifts ${mickeyWeight} lbs, so x = (${mickeyWeight} ÷ ${divisor}) − ${lessAmount}.`,
            feedbackIncorrect: `Mickey lifts ${mickeyWeight} lbs, so x = (${mickeyWeight} ÷ ${divisor}) − ${lessAmount}.`,
            highlights: [`${mickeyWeight} lbs`],
          },
          {
            instruction: `To solve x = (${mickeyWeight} ÷ ${divisor}) − ${lessAmount}, first find ${fractionWord} of ${mickeyWeight}. What is ${mickeyWeight} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${mickeyWeight} = ${fractionResult} lbs, so x = ${fractionResult} − ${lessAmount}.`,
            feedbackIncorrect: `${mickeyWeight} ÷ ${divisor} = ${fractionResult} lbs. So x = ${fractionResult} − ${lessAmount}.`,
            highlights: [`${fractionWord} of the weight`],
          },
          {
            instruction: `Now subtract ${lessAmount} to find x. What is ${fractionResult} − ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. Kelly can deadlift ${answer} lbs.`,
            feedbackIncorrect: `${fractionResult} − ${lessAmount} = ${answer}. So x = ${answer} lbs.`,
            highlights: [`${lessAmount} pounds less`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Add ${lessAmount}, then multiply by ${divisor}. You should get Mickey's weight. What is (${answer} + ${lessAmount}) × ${divisor}?`,
            expectedAnswer: mickeyWeight,
            feedbackCorrect: `Verified! (${answer} + ${lessAmount}) × ${divisor} = ${mickeyWeight}, matching Mickey's lift. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} + ${lessAmount}) × ${divisor} = ${mickeyWeight}, which matches Mickey's lift. x = ${answer} checks out.`,
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
            instruction: `Let x = cost of one bite. Priya spent $${smoothieCost} on the smoothie and ${biteCount}x on bites. Equation: $${smoothieCost} + ${biteCount}x = ___. Look at the problem: what number fills the blank?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Priya spent $${total} total, so $${smoothieCost} + ${biteCount}x = $${total}.`,
            feedbackIncorrect: `Priya spent $${total} total, so the equation is $${smoothieCost} + ${biteCount}x = $${total}.`,
            highlights: [`$${total}`],
          },
          {
            instruction: `To solve for x, first subtract the smoothie cost from both sides: $${total} - $${smoothieCost}. What do you get?`,
            expectedAnswer: biteTotal,
            feedbackCorrect: `Correct! $${total} - $${smoothieCost} = $${biteTotal}, so ${biteCount}x = $${biteTotal}.`,
            feedbackIncorrect: `$${total} - $${smoothieCost} = $${biteTotal}. So ${biteCount}x = $${biteTotal}.`,
            highlights: [`$${total}`, `$${smoothieCost}`],
          },
          {
            instruction: `Now divide both sides by ${biteCount} to find x. What is $${biteTotal} ÷ ${biteCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = $${answer}. Each energy bite cost $${answer}.`,
            feedbackIncorrect: `$${biteTotal} ÷ ${biteCount} = $${answer}. So x = $${answer} per bite.`,
            highlights: [`${biteCount} energy bites`],
          },
          {
            instruction: `Check by plugging x = $${answer} back in. What is $${smoothieCost} + ${biteCount} × $${answer}? (Should equal $${total}.)`,
            expectedAnswer: total,
            feedbackCorrect: `Verified! $${smoothieCost} + ${biteCount} × $${answer} = $${total}. x = $${answer} is correct.`,
            feedbackIncorrect: `$${smoothieCost} + ${biteCount} × $${answer} = $${total}. That matches the total, so x = $${answer} is correct.`,
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
            instruction: `Let x = cups for bread. She uses ${m.w} ${m.f} times as much flour as for muffins. The equation is x = ${m.w} ${m.f} × ___. Look at the problem: how many cups for muffins?`,
            expectedAnswer: c,
            feedbackCorrect: `Correct! The muffins use ${c} cups, so x = ${m.w} ${m.f} × ${c}.`,
            feedbackIncorrect: `The muffins use ${c} cups, so x = ${m.w} ${m.f} × ${c}.`,
            highlights: [`${c} cups of flour`],
          },
          {
            instruction: `To solve x = ${m.w} ${m.f} × ${c}, first rewrite ${m.w} ${m.f} as an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}, so x = ${m.impNum}/${m.impDen} × ${c}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So x = ${m.impNum}/${m.impDen} × ${c}.`,
            highlights: [`${m.w} ${m.f} times as much`],
          },
          {
            instruction: `Now multiply to find x: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does x equal?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! x = ${ans}. She uses ${ans} cups of flour for the bread.`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. So x = ${ans} cups.`,
          },
          {
            instruction: `Check by reversing the division. You divided ${product} by ${m.impDen} to get x. What is x × ${m.impDen}? (Should get back ${product}.)`,
            expectedAnswer: product,
            feedbackCorrect: `Verified! ${ans} × ${m.impDen} = ${product}. x = ${ans} is correct.`,
            feedbackIncorrect: `${ans} × ${m.impDen} = ${product}. That matches, so x = ${ans} is correct.`,
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
            instruction: `Let x = Saturday stops. She made ${multiplier} times as many stops on Saturday as on Friday. Equation: x = ${multiplier} × ___. Look at the problem: how many stops on Friday?`,
            expectedAnswer: friday,
            feedbackCorrect: `Correct! Friday had ${friday} stops, so x = ${multiplier} × ${friday}.`,
            feedbackIncorrect: `Friday had ${friday} stops, so x = ${multiplier} × ${friday}.`,
            highlights: [`${friday} stops`],
          },
          {
            instruction: `Now solve x = ${multiplier} × ${friday}. What does x equal?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. She made ${answer} stops on Saturday.`,
            feedbackIncorrect: `${multiplier} × ${friday} = ${answer}. So x = ${answer} stops.`,
            highlights: [`${multiplier} times as many`],
          },
          {
            instruction: `Check by reversing the multiplication. Divide x by ${multiplier}. You should get Friday's count. What is ${answer} ÷ ${multiplier}?`,
            expectedAnswer: friday,
            feedbackCorrect: `Verified! ${answer} ÷ ${multiplier} = ${friday}, matching Friday's stops. x = ${answer} is correct.`,
            feedbackIncorrect: `${answer} ÷ ${multiplier} = ${friday}, which matches Friday. x = ${answer} checks out.`,
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
            instruction: `Let x = number of problems. Noah spends ${snackMin} min on a snack and ${perProblem}x min on problems. Equation: ${snackMin} + ${perProblem}x = ___. Look at the problem: what is his total time?`,
            expectedAnswer: totalMin,
            feedbackCorrect: `Correct! Noah has ${totalMin} min total, so ${snackMin} + ${perProblem}x = ${totalMin}.`,
            feedbackIncorrect: `Noah has ${totalMin} minutes total, so ${snackMin} + ${perProblem}x = ${totalMin}.`,
            highlights: [`${totalMin} minutes`],
          },
          {
            instruction: `To solve for x, first subtract the snack time from both sides: ${totalMin} − ${snackMin}. What do you get?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMin} − ${snackMin} = ${remaining}, so ${perProblem}x = ${remaining}.`,
            feedbackIncorrect: `${totalMin} − ${snackMin} = ${remaining}. So ${perProblem}x = ${remaining}.`,
            highlights: [`${totalMin} minutes`, `${snackMin} minutes`],
          },
          {
            instruction: `Now divide both sides by ${perProblem} to find x. What is ${remaining} ÷ ${perProblem}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. Noah can finish ${answer} problems.`,
            feedbackIncorrect: `${remaining} ÷ ${perProblem} = ${answer}. So x = ${answer} problems.`,
            highlights: [`${perProblem} minutes`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. What is ${snackMin} + ${perProblem} × ${answer}? (Should equal ${totalMin}.)`,
            expectedAnswer: totalMin,
            feedbackCorrect: `Verified! ${snackMin} + ${perProblem} × ${answer} = ${totalMin}. x = ${answer} is correct.`,
            feedbackIncorrect: `${snackMin} + ${perProblem} × ${answer} = ${totalMin}. That matches the total time, so x = ${answer} is correct.`,
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
            instruction: `Let x = green turtle's weight. The green turtle weighs ${lessAmount} lbs less than ${fractionWord} of the leatherback. Equation: x = (___ ÷ ${divisor}) − ${lessAmount}. Look at the problem: how much does the leatherback weigh?`,
            expectedAnswer: totalWeight,
            feedbackCorrect: `Correct! The leatherback weighs ${totalWeight} lbs, so x = (${totalWeight} ÷ ${divisor}) − ${lessAmount}.`,
            feedbackIncorrect: `The leatherback weighs ${totalWeight} lbs, so x = (${totalWeight} ÷ ${divisor}) − ${lessAmount}.`,
            highlights: [`${totalWeight} pounds`],
          },
          {
            instruction: `To solve x = (${totalWeight} ÷ ${divisor}) − ${lessAmount}, first find ${fractionWord} of ${totalWeight}. What is ${totalWeight} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${totalWeight} = ${fractionResult} lbs, so x = ${fractionResult} − ${lessAmount}.`,
            feedbackIncorrect: `${totalWeight} ÷ ${divisor} = ${fractionResult} lbs. So x = ${fractionResult} − ${lessAmount}.`,
            highlights: [`${fractionWord} of the weight`],
          },
          {
            instruction: `Now subtract ${lessAmount} to find x. What is ${fractionResult} − ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. The green sea turtle weighs ${answer} lbs.`,
            feedbackIncorrect: `${fractionResult} − ${lessAmount} = ${answer}. So x = ${answer} lbs.`,
            highlights: [`${lessAmount} pounds less`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Add ${lessAmount}, then multiply by ${divisor}. You should get the leatherback's weight. What is (${answer} + ${lessAmount}) × ${divisor}?`,
            expectedAnswer: totalWeight,
            feedbackCorrect: `Verified! (${answer} + ${lessAmount}) × ${divisor} = ${totalWeight}, matching the leatherback. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} + ${lessAmount}) × ${divisor} = ${totalWeight}, which matches the leatherback's weight. x = ${answer} checks out.`,
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
            instruction: `Let x = Marcus's height. Marcus's sunflower is ${m.w} ${m.f} times as tall as Elena's. The equation is x = ${m.w} ${m.f} × ___. Look at the problem: how tall is Elena's sunflower?`,
            expectedAnswer: c,
            feedbackCorrect: `Correct! Elena's sunflower is ${c} inches tall, so x = ${m.w} ${m.f} × ${c}.`,
            feedbackIncorrect: `Elena's sunflower is ${c} inches, so x = ${m.w} ${m.f} × ${c}.`,
            highlights: [`${c} inches tall`],
          },
          {
            instruction: `To solve x = ${m.w} ${m.f} × ${c}, first rewrite ${m.w} ${m.f} as an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}, so x = ${m.impNum}/${m.impDen} × ${c}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So x = ${m.impNum}/${m.impDen} × ${c}.`,
            highlights: [`${m.w} ${m.f} times as tall`],
          },
          {
            instruction: `Now multiply to find x: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does x equal?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! x = ${ans}. Marcus's sunflower grew ${ans} inches tall.`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. So x = ${ans} inches.`,
          },
          {
            instruction: `Check by reversing the division. You divided ${product} by ${m.impDen} to get x. What is x × ${m.impDen}? (Should get back ${product}.)`,
            expectedAnswer: product,
            feedbackCorrect: `Verified! ${ans} × ${m.impDen} = ${product}. x = ${ans} is correct.`,
            feedbackIncorrect: `${ans} × ${m.impDen} = ${product}. That matches, so x = ${ans} is correct.`,
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
            instruction: `Let x = cost of one pack. Jordan spent $${sketchbookCost} on the sketchbook and ${packCount}x on pencil packs. Equation: $${sketchbookCost} + ${packCount}x = ___. Look at the problem: what number fills the blank?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Jordan spent $${total} total, so $${sketchbookCost} + ${packCount}x = $${total}.`,
            feedbackIncorrect: `Jordan spent $${total} total, so the equation is $${sketchbookCost} + ${packCount}x = $${total}.`,
            highlights: [`$${total}`],
          },
          {
            instruction: `To solve for x, first subtract the sketchbook cost from both sides: $${total} - $${sketchbookCost}. What do you get?`,
            expectedAnswer: packTotal,
            feedbackCorrect: `Correct! $${total} - $${sketchbookCost} = $${packTotal}, so ${packCount}x = $${packTotal}.`,
            feedbackIncorrect: `$${total} - $${sketchbookCost} = $${packTotal}. So ${packCount}x = $${packTotal}.`,
            highlights: [`$${total}`, `$${sketchbookCost}`],
          },
          {
            instruction: `Now divide both sides by ${packCount} to find x. What is $${packTotal} ÷ ${packCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = $${answer}. Each pack of colored pencils cost $${answer}.`,
            feedbackIncorrect: `$${packTotal} ÷ ${packCount} = $${answer}. So x = $${answer} per pack.`,
            highlights: [`${packCount} packs`],
          },
          {
            instruction: `Check by plugging x = $${answer} back in. What is $${sketchbookCost} + ${packCount} × $${answer}? (Should equal $${total}.)`,
            expectedAnswer: total,
            feedbackCorrect: `Verified! $${sketchbookCost} + ${packCount} × $${answer} = $${total}. x = $${answer} is correct.`,
            feedbackIncorrect: `$${sketchbookCost} + ${packCount} × $${answer} = $${total}. That matches the total, so x = $${answer} is correct.`,
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
            instruction: `Let x = neighbor's plants. "${moreAmount} more than twice as many as Olivia." Equation: x = 2 × ___ + ${moreAmount}. Look at the problem: how many does Olivia have?`,
            expectedAnswer: oliviaPlants,
            feedbackCorrect: `Correct! Olivia has ${oliviaPlants} plants, so x = 2 × ${oliviaPlants} + ${moreAmount}.`,
            feedbackIncorrect: `Olivia has ${oliviaPlants} plants, so x = 2 × ${oliviaPlants} + ${moreAmount}.`,
            highlights: [`${oliviaPlants} potted plants`],
          },
          {
            instruction: `To solve x = 2 × ${oliviaPlants} + ${moreAmount}, first compute 2 × ${oliviaPlants}. What is 2 × ${oliviaPlants}?`,
            expectedAnswer: doubled,
            feedbackCorrect: `Correct! 2 × ${oliviaPlants} = ${doubled}, so x = ${doubled} + ${moreAmount}.`,
            feedbackIncorrect: `2 × ${oliviaPlants} = ${doubled}. So x = ${doubled} + ${moreAmount}.`,
            highlights: ['twice as many'],
          },
          {
            instruction: `Now add ${moreAmount} to find x. What is ${doubled} + ${moreAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. The neighbor has ${answer} plants.`,
            feedbackIncorrect: `${doubled} + ${moreAmount} = ${answer}. So x = ${answer} plants.`,
            highlights: [`${moreAmount} more than twice`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Subtract ${moreAmount}, then divide by 2. You should get Olivia's count. What is (${answer} − ${moreAmount}) ÷ 2?`,
            expectedAnswer: oliviaPlants,
            feedbackCorrect: `Verified! (${answer} − ${moreAmount}) ÷ 2 = ${oliviaPlants}, matching Olivia's count. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} − ${moreAmount}) ÷ 2 = ${oliviaPlants}, which matches Olivia's count. x = ${answer} checks out.`,
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
            instruction: `Let x = dolphin's length. The dolphin is ${lessAmount} feet less than ${fractionWord} the blue whale's length. Equation: x = (___ ÷ ${divisor}) − ${lessAmount}. Look at the problem: how long is the blue whale?`,
            expectedAnswer: whaleLength,
            feedbackCorrect: `Correct! The blue whale is ${whaleLength} feet long, so x = (${whaleLength} ÷ ${divisor}) − ${lessAmount}.`,
            feedbackIncorrect: `The blue whale is ${whaleLength} feet, so x = (${whaleLength} ÷ ${divisor}) − ${lessAmount}.`,
            highlights: [`${whaleLength} feet`],
          },
          {
            instruction: `To solve x = (${whaleLength} ÷ ${divisor}) − ${lessAmount}, first find ${fractionWord} of ${whaleLength}. What is ${whaleLength} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${whaleLength} = ${fractionResult} feet, so x = ${fractionResult} − ${lessAmount}.`,
            feedbackIncorrect: `${whaleLength} ÷ ${divisor} = ${fractionResult} feet. So x = ${fractionResult} − ${lessAmount}.`,
            highlights: [`${fractionWord} the length`],
          },
          {
            instruction: `Now subtract ${lessAmount} to find x. What is ${fractionResult} − ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. The dolphin is ${answer} feet long.`,
            feedbackIncorrect: `${fractionResult} − ${lessAmount} = ${answer}. So x = ${answer} feet.`,
            highlights: [`${lessAmount} feet less`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Add ${lessAmount}, then multiply by ${divisor}. You should get the whale's length. What is (${answer} + ${lessAmount}) × ${divisor}?`,
            expectedAnswer: whaleLength,
            feedbackCorrect: `Verified! (${answer} + ${lessAmount}) × ${divisor} = ${whaleLength}, matching the blue whale. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} + ${lessAmount}) × ${divisor} = ${whaleLength}, which matches the whale's length. x = ${answer} checks out.`,
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
            instruction: `Let x = number of drills. Coach Tran spends ${warmupMin} min on warm-ups and ${perDrill}x min on drills. Equation: ${warmupMin} + ${perDrill}x = ___. Look at the problem: what is her total practice time?`,
            expectedAnswer: totalMin,
            feedbackCorrect: `Correct! Practice is ${totalMin} min total, so ${warmupMin} + ${perDrill}x = ${totalMin}.`,
            feedbackIncorrect: `Practice is ${totalMin} minutes total, so ${warmupMin} + ${perDrill}x = ${totalMin}.`,
            highlights: [`${totalMin} minutes`],
          },
          {
            instruction: `To solve for x, first subtract the warm-up time from both sides: ${totalMin} − ${warmupMin}. What do you get?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMin} − ${warmupMin} = ${remaining}, so ${perDrill}x = ${remaining}.`,
            feedbackIncorrect: `${totalMin} − ${warmupMin} = ${remaining}. So ${perDrill}x = ${remaining}.`,
            highlights: [`${totalMin} minutes`, `${warmupMin} minutes`],
          },
          {
            instruction: `Now divide both sides by ${perDrill} to find x. What is ${remaining} ÷ ${perDrill}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. The team can complete ${answer} drills.`,
            feedbackIncorrect: `${remaining} ÷ ${perDrill} = ${answer}. So x = ${answer} drills.`,
            highlights: [`${perDrill} minutes`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. What is ${warmupMin} + ${perDrill} × ${answer}? (Should equal ${totalMin}.)`,
            expectedAnswer: totalMin,
            feedbackCorrect: `Verified! ${warmupMin} + ${perDrill} × ${answer} = ${totalMin}. x = ${answer} is correct.`,
            feedbackIncorrect: `${warmupMin} + ${perDrill} × ${answer} = ${totalMin}. That matches the practice time, so x = ${answer} is correct.`,
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
            instruction: `Let x = articles on Thursday. Thursday she wrote ${m.w} ${m.f} times as many as Wednesday. The equation is x = ${m.w} ${m.f} × ___. Look at the problem: how many did she write Wednesday?`,
            expectedAnswer: c,
            feedbackCorrect: `Correct! Wednesday she wrote ${c} articles, so x = ${m.w} ${m.f} × ${c}.`,
            feedbackIncorrect: `Wednesday she wrote ${c} articles, so x = ${m.w} ${m.f} × ${c}.`,
            highlights: [`${c} articles`],
          },
          {
            instruction: `To solve x = ${m.w} ${m.f} × ${c}, first rewrite ${m.w} ${m.f} as an improper fraction. What is the numerator? (Hint: ${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen})`,
            expectedAnswer: m.impNum,
            feedbackCorrect: `Correct! ${m.w} ${m.f} = ${m.impNum}/${m.impDen}, so x = ${m.impNum}/${m.impDen} × ${c}.`,
            feedbackIncorrect: `${m.w} × ${m.impDen} + ${m.impNum - m.w * m.impDen} = ${m.impNum}. So x = ${m.impNum}/${m.impDen} × ${c}.`,
            highlights: [`${m.w} ${m.f} times as many`],
          },
          {
            instruction: `Now multiply to find x: ${m.impNum}/${m.impDen} × ${c} = ${product}/${m.impDen}. What does x equal?`,
            expectedAnswer: ans,
            feedbackCorrect: `Excellent! x = ${ans}. She wrote ${ans} articles on Thursday.`,
            feedbackIncorrect: `${product} ÷ ${m.impDen} = ${ans}. So x = ${ans} articles.`,
          },
          {
            instruction: `Check by reversing the division. You divided ${product} by ${m.impDen} to get x. What is x × ${m.impDen}? (Should get back ${product}.)`,
            expectedAnswer: product,
            feedbackCorrect: `Verified! ${ans} × ${m.impDen} = ${product}. x = ${ans} is correct.`,
            feedbackIncorrect: `${ans} × ${m.impDen} = ${product}. That matches, so x = ${ans} is correct.`,
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
            instruction: `Let x = Jada's shells. "${lessAmount} less than ${multiplier} times as many as Sam." Equation: x = ${multiplier} × ___ − ${lessAmount}. Look at the problem: how many shells did Sam collect?`,
            expectedAnswer: samShells,
            feedbackCorrect: `Correct! Sam collected ${samShells} shells, so x = ${multiplier} × ${samShells} − ${lessAmount}.`,
            feedbackIncorrect: `Sam collected ${samShells} shells, so x = ${multiplier} × ${samShells} − ${lessAmount}.`,
            highlights: [`${samShells} shells`],
          },
          {
            instruction: `To solve x = ${multiplier} × ${samShells} − ${lessAmount}, first compute ${multiplier} × ${samShells}. What is ${multiplier} × ${samShells}?`,
            expectedAnswer: multiplied,
            feedbackCorrect: `Correct! ${multiplier} × ${samShells} = ${multiplied}, so x = ${multiplied} − ${lessAmount}.`,
            feedbackIncorrect: `${multiplier} × ${samShells} = ${multiplied}. So x = ${multiplied} − ${lessAmount}.`,
            highlights: [`${multiplier} times as many`],
          },
          {
            instruction: `Now subtract ${lessAmount} to find x. What is ${multiplied} − ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. Jada collected ${answer} shells.`,
            feedbackIncorrect: `${multiplied} − ${lessAmount} = ${answer}. So x = ${answer} shells.`,
            highlights: [`${lessAmount} less than`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Add ${lessAmount}, then divide by ${multiplier}. You should get Sam's count. What is (${answer} + ${lessAmount}) ÷ ${multiplier}?`,
            expectedAnswer: samShells,
            feedbackCorrect: `Verified! (${answer} + ${lessAmount}) ÷ ${multiplier} = ${samShells}, matching Sam's count. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} + ${lessAmount}) ÷ ${multiplier} = ${samShells}, which matches Sam's count. x = ${answer} checks out.`,
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
            instruction: `Let x = cost of one bunch. Caleb spent $${honeyCost} on honey and ${bunchCount}x on bunches of flowers. Equation: $${honeyCost} + ${bunchCount}x = ___. Look at the problem: what number fills the blank?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Caleb spent $${total} total, so $${honeyCost} + ${bunchCount}x = $${total}.`,
            feedbackIncorrect: `Caleb spent $${total} total, so the equation is $${honeyCost} + ${bunchCount}x = $${total}.`,
            highlights: [`$${total}`],
          },
          {
            instruction: `To solve for x, first subtract the honey cost from both sides: $${total} - $${honeyCost}. What do you get?`,
            expectedAnswer: bunchTotal,
            feedbackCorrect: `Correct! $${total} - $${honeyCost} = $${bunchTotal}, so ${bunchCount}x = $${bunchTotal}.`,
            feedbackIncorrect: `$${total} - $${honeyCost} = $${bunchTotal}. So ${bunchCount}x = $${bunchTotal}.`,
            highlights: [`$${total}`, `$${honeyCost}`],
          },
          {
            instruction: `Now divide both sides by ${bunchCount} to find x. What is $${bunchTotal} ÷ ${bunchCount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = $${answer}. Each bunch of flowers cost $${answer}.`,
            feedbackIncorrect: `$${bunchTotal} ÷ ${bunchCount} = $${answer}. So x = $${answer} per bunch.`,
            highlights: [`${bunchCount} bunches`],
          },
          {
            instruction: `Check by plugging x = $${answer} back in. What is $${honeyCost} + ${bunchCount} × $${answer}? (Should equal $${total}.)`,
            expectedAnswer: total,
            feedbackCorrect: `Verified! $${honeyCost} + ${bunchCount} × $${answer} = $${total}. x = $${answer} is correct.`,
            feedbackIncorrect: `$${honeyCost} + ${bunchCount} × $${answer} = $${total}. That matches the total, so x = $${answer} is correct.`,
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
            instruction: `Let x = passenger speed. The passenger train goes ${lessAmount} mph less than ${fractionWord} the freight speed. Equation: x = (___ ÷ ${divisor}) − ${lessAmount}. Look at the problem: how fast is the freight train?`,
            expectedAnswer: freightSpeed,
            feedbackCorrect: `Correct! The freight goes ${freightSpeed} mph, so x = (${freightSpeed} ÷ ${divisor}) − ${lessAmount}.`,
            feedbackIncorrect: `The freight goes ${freightSpeed} mph, so x = (${freightSpeed} ÷ ${divisor}) − ${lessAmount}.`,
            highlights: [`${freightSpeed} miles per hour`],
          },
          {
            instruction: `To solve x = (${freightSpeed} ÷ ${divisor}) − ${lessAmount}, first find ${fractionWord} of ${freightSpeed}. What is ${freightSpeed} ÷ ${divisor}?`,
            expectedAnswer: fractionResult,
            feedbackCorrect: `Correct! ${fractionWord} of ${freightSpeed} = ${fractionResult} mph, so x = ${fractionResult} − ${lessAmount}.`,
            feedbackIncorrect: `${freightSpeed} ÷ ${divisor} = ${fractionResult} mph. So x = ${fractionResult} − ${lessAmount}.`,
            highlights: [`${fractionWord} the speed`],
          },
          {
            instruction: `Now subtract ${lessAmount} to find x. What is ${fractionResult} − ${lessAmount}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. The passenger train is going ${answer} mph.`,
            feedbackIncorrect: `${fractionResult} − ${lessAmount} = ${answer}. So x = ${answer} mph.`,
            highlights: [`${lessAmount} miles per hour less`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. Add ${lessAmount}, then multiply by ${divisor}. You should get the freight speed. What is (${answer} + ${lessAmount}) × ${divisor}?`,
            expectedAnswer: freightSpeed,
            feedbackCorrect: `Verified! (${answer} + ${lessAmount}) × ${divisor} = ${freightSpeed}, matching the freight train. x = ${answer} is correct.`,
            feedbackIncorrect: `(${answer} + ${lessAmount}) × ${divisor} = ${freightSpeed}, which matches the freight speed. x = ${answer} checks out.`,
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
            instruction: `Let x = number of practice runs. Maya spends ${reviewMin} min reviewing music and ${perRun}x min on runs. Equation: ${reviewMin} + ${perRun}x = ___. Look at the problem: what is her total time?`,
            expectedAnswer: totalMin,
            feedbackCorrect: `Correct! Maya has ${totalMin} min total, so ${reviewMin} + ${perRun}x = ${totalMin}.`,
            feedbackIncorrect: `Maya has ${totalMin} minutes total, so ${reviewMin} + ${perRun}x = ${totalMin}.`,
            highlights: [`${totalMin} minutes`],
          },
          {
            instruction: `To solve for x, first subtract the review time from both sides: ${totalMin} − ${reviewMin}. What do you get?`,
            expectedAnswer: remaining,
            feedbackCorrect: `Correct! ${totalMin} − ${reviewMin} = ${remaining}, so ${perRun}x = ${remaining}.`,
            feedbackIncorrect: `${totalMin} − ${reviewMin} = ${remaining}. So ${perRun}x = ${remaining}.`,
            highlights: [`${totalMin} minutes`, `${reviewMin} minutes`],
          },
          {
            instruction: `Now divide both sides by ${perRun} to find x. What is ${remaining} ÷ ${perRun}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! x = ${answer}. Maya can complete ${answer} practice runs.`,
            feedbackIncorrect: `${remaining} ÷ ${perRun} = ${answer}. So x = ${answer} runs.`,
            highlights: [`${perRun} minutes`],
          },
          {
            instruction: `Check by plugging x = ${answer} back in. What is ${reviewMin} + ${perRun} × ${answer}? (Should equal ${totalMin}.)`,
            expectedAnswer: totalMin,
            feedbackCorrect: `Verified! ${reviewMin} + ${perRun} × ${answer} = ${totalMin}. x = ${answer} is correct.`,
            feedbackIncorrect: `${reviewMin} + ${perRun} × ${answer} = ${totalMin}. That matches Maya's total time, so x = ${answer} is correct.`,
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

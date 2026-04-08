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
  // Q1: Coin collection — add three numbers then subtract
  {
    generate: (guided) => {
      const coins1 = randInt(100, 250);
      const coins2 = randInt(30, 60);
      const coins3 = randInt(5, 15);
      const albumFit = randInt(100, 180);
      const total = coins1 + coins2 + coins3;
      const answer = total - albumFit;
      const q: GeneratedQuestion = {
        problemText: `Brooke started a coin collection. She collected ${coins1} coins that had been printed between 1950 and 1980, ${coins2} coins that had been printed between 1900 and 1949, and ${coins3} coins that had been printed before 1900. She put all her coins into albums. She filled the first album with ${albumFit} coins. How many coins did she need to put in another album?`,
        answer,
        hint: `C - Circle: ${coins1}, ${coins2}, ${coins3}, ${albumFit}. U - Underline: "How many coins in another album?" B - Box: "put" and "filled" suggest addition first, then subtraction.`,
        solution: `Step 1: Circle the numbers: ${coins1}, ${coins2}, ${coins3}, and ${albumFit}.\nStep 2: Add all coin groups: ${coins1} + ${coins2} + ${coins3} = ${total} coins total.\nStep 3: Subtract the coins in the first album: ${total} - ${albumFit} = ${answer}.\nAnswer: Brooke needs to put ${answer} coins in another album.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `C - Circle the key numbers. U - Underline the question. B - Box "add together." First, add all the coin groups. What is ${coins1} + ${coins2} + ${coins3}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! ${coins1} + ${coins2} + ${coins3} = ${total} coins total.`,
            feedbackIncorrect: `${coins1} + ${coins2} + ${coins3} = ${total} coins total.`,
          },
          {
            instruction: `Now subtract the coins that fit in the first album. What is ${total} - ${albumFit}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} coins go in another album!`,
            feedbackIncorrect: `${total} - ${albumFit} = ${answer} coins.`,
          },
        ];
      }
      return q;
    },
  },
  // Q2: Farmers' market — subtract three amounts from total
  {
    generate: (guided) => {
      const squash = randInt(50, 100);
      const sprouts = randInt(30, 60);
      const persimmons = randInt(30, 70);
      const potatoes = randInt(80, 150);
      const total = squash + sprouts + persimmons + potatoes;
      const answer = potatoes;
      const afterSquash = total - squash;
      const afterSprouts = afterSquash - sprouts;
      const q: GeneratedQuestion = {
        problemText: `Grace's school decided to host a farmers' market. Last fall they sold squash, Brussels sprouts, persimmons, and potatoes. After adding together all of their earnings, Grace found that they had made $${total}. If the school made $${squash} from squash sales, $${sprouts} from Brussels sprouts, and $${persimmons} from persimmons, how much did the school make from potato sales?`,
        answer,
        hint: `C - Circle: $${total}, $${squash}, $${sprouts}, $${persimmons}. U - Underline: "How much from potatoes?" B - Box: subtract the known amounts from the total.`,
        solution: `Step 1: Circle the total ($${total}) and the three known amounts ($${squash}, $${sprouts}, $${persimmons}).\nStep 2: Subtract each from the total: $${total} - $${squash} = $${afterSquash}.\nStep 3: $${afterSquash} - $${sprouts} = $${afterSprouts}.\nStep 4: $${afterSprouts} - $${persimmons} = $${answer}.\nAnswer: The school made $${answer} from potato sales.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `C - Circle the numbers. B - Box "subtract." Subtract the three known sales from the total. What is $${total} - $${squash} - $${sprouts} - $${persimmons}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! The school made $${answer} from potatoes!`,
            feedbackIncorrect: `$${total} - $${squash} - $${sprouts} - $${persimmons} = $${answer}.`,
          },
        ];
      }
      return q;
    },
  },
  // Q3: Carnival tickets — add then subtract from goal
  {
    generate: (guided) => {
      const tickets1 = randInt(10, 25);
      const tickets2 = randInt(15, 30);
      const prizeCost = randInt(50, 80);
      const earned = tickets1 + tickets2;
      const answer = prizeCost - earned;
      const q: GeneratedQuestion = {
        problemText: `At the carnival, Cooper has earned ${tickets1} tickets playing an electronic dance game and ${tickets2} tickets playing a car racing game. He wants to get the drone prize, which costs ${prizeCost} tickets. How many more tickets does he need?`,
        answer,
        hint: `C - Circle: ${tickets1}, ${tickets2}, ${prizeCost}. U - Underline: "How many more tickets?" B - Box: "earned" (add), "more" (subtract from goal).`,
        solution: `Step 1: Circle the numbers: ${tickets1}, ${tickets2}, and ${prizeCost}.\nStep 2: Add tickets earned: ${tickets1} + ${tickets2} = ${earned} tickets.\nStep 3: Subtract from the prize cost: ${prizeCost} - ${earned} = ${answer}.\nAnswer: Cooper needs ${answer} more tickets.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, add the tickets Cooper earned. What is ${tickets1} + ${tickets2}?`,
            expectedAnswer: earned,
            feedbackCorrect: `Correct! Cooper has ${earned} tickets so far.`,
            feedbackIncorrect: `${tickets1} + ${tickets2} = ${earned} tickets earned.`,
          },
          {
            instruction: `Now subtract from the prize cost. What is ${prizeCost} - ${earned}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Cooper needs ${answer} more tickets!`,
            feedbackIncorrect: `${prizeCost} - ${earned} = ${answer} more tickets.`,
          },
        ];
      }
      return q;
    },
  },
  // Q4: Berry pie — add containers then subtract recipe
  {
    generate: (guided) => {
      const berry1 = randInt(4, 8);
      const berry2 = randInt(6, 10);
      const berry3 = randInt(7, 12);
      const containerSize = randInt(10, 16);
      const totalBought = containerSize * 3;
      const totalUsed = berry1 + berry2 + berry3;
      const answer = totalBought - totalUsed;
      const q: GeneratedQuestion = {
        problemText: `Drew baked a berry pie. The recipe called for ${berry1} ounces of blackberries, ${berry2} ounces of raspberries, and ${berry3} ounces of strawberries. In the supermarket, he only found ${containerSize}-ounce containers of berries. He bought 1 container of each kind of berry. After he baked the pie, how many ounces of berries did Drew have left?`,
        answer,
        hint: `C - Circle: ${berry1}, ${berry2}, ${berry3}, ${containerSize}. B - Box: "bought" (multiply), "left" (subtract).`,
        solution: `Step 1: Find total ounces bought (3 containers): 3 × ${containerSize} = ${totalBought} oz.\nStep 2: Find total ounces used in recipe: ${berry1} + ${berry2} + ${berry3} = ${totalUsed} oz.\nStep 3: Subtract to find leftovers: ${totalBought} - ${totalUsed} = ${answer} oz.\nAnswer: Drew has ${answer} ounces of berries left.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total ounces bought (3 containers of ${containerSize} oz each). What is 3 × ${containerSize}?`,
            expectedAnswer: totalBought,
            feedbackCorrect: `Correct! Drew bought ${totalBought} ounces total.`,
            feedbackIncorrect: `3 × ${containerSize} = ${totalBought} ounces bought.`,
          },
          {
            instruction: `Now find how much was used (${berry1} + ${berry2} + ${berry3} = ${totalUsed}) and subtract from ${totalBought}. What is ${totalBought} - ${totalUsed}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Drew has ${answer} ounces left!`,
            feedbackIncorrect: `${totalBought} - ${totalUsed} = ${answer} ounces left.`,
          },
        ];
      }
      return q;
    },
  },
  // Q5: Saving for a car — multiply then add
  {
    generate: (guided) => {
      const saved = randInt(150, 300);
      const perPaycheck = randInt(8, 20);
      const paychecks = randInt(3, 8);
      const futureSavings = perPaycheck * paychecks;
      const answer = saved + futureSavings;
      const q: GeneratedQuestion = {
        problemText: `Graham is saving money for a car, and he has $${saved} so far. He will also save $${perPaycheck} from each of his next ${paychecks} paychecks. How much will his total savings be then?`,
        answer,
        hint: `C - Circle: $${saved}, $${perPaycheck}, ${paychecks}. B - Box: "each" (multiply), "total" (add).`,
        solution: `Step 1: Find future savings: $${perPaycheck} × ${paychecks} = $${futureSavings}.\nStep 2: Add to current savings: $${saved} + $${futureSavings} = $${answer}.\nAnswer: Graham's total savings will be $${answer}.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find how much Graham will save from paychecks. What is $${perPaycheck} × ${paychecks}?`,
            expectedAnswer: futureSavings,
            feedbackCorrect: `Correct! He'll save $${futureSavings} from paychecks.`,
            feedbackIncorrect: `$${perPaycheck} × ${paychecks} = $${futureSavings}.`,
          },
          {
            instruction: `Now add to his current savings. What is $${saved} + $${futureSavings}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Graham will have $${answer} total!`,
            feedbackIncorrect: `$${saved} + $${futureSavings} = $${answer}.`,
          },
        ];
      }
      return q;
    },
  },
  // Q6: Tank tops on sale — multiply then subtract
  {
    generate: (guided) => {
      const qty = randInt(2, 5);
      const regularPrice = randInt(8, 15);
      const regularTotal = qty * regularPrice;
      const saleDiscount = randInt(2, 6);
      const saleTotal = regularTotal - saleDiscount;
      const answer = saleDiscount;
      const q: GeneratedQuestion = {
        problemText: `Liz wants to buy ${qty} new tank tops for spring break. Her favorite clothing store usually sells tank tops for $${regularPrice} each. During today's sale, however, the tank tops are ${qty} for $${saleTotal.toFixed(2)}. How much can Liz save by buying the ${qty} tank tops on sale?`,
        answer,
        hint: `C - Circle: ${qty}, $${regularPrice}, $${saleTotal.toFixed(2)}. U - Underline: "How much can Liz save?" B - Box: "each" (multiply), "save" (subtract).`,
        solution: `Step 1: Find the regular cost: ${qty} × $${regularPrice} = $${regularTotal}.\nStep 2: Subtract the sale price: $${regularTotal} - $${saleTotal.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: Liz can save $${answer.toFixed(2)} by buying on sale.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the regular cost. What is ${qty} × $${regularPrice}?`,
            expectedAnswer: regularTotal,
            feedbackCorrect: `Correct! The regular cost is $${regularTotal}.`,
            feedbackIncorrect: `${qty} × $${regularPrice} = $${regularTotal}.`,
          },
          {
            instruction: `Now subtract the sale price to find the savings. What is $${regularTotal} - $${saleTotal.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Liz saves $${answer.toFixed(2)}!`,
            feedbackIncorrect: `$${regularTotal} - $${saleTotal.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
      }
      return q;
    },
  },
  // Q7: Dance studio classes + shoes — multiply then add
  {
    generate: (guided) => {
      const classes = randInt(5, 12);
      const pricePerClass = randInt(12, 25);
      const shoeCost = randInt(15, 30);
      const classCost = classes * pricePerClass;
      const answer = classCost + shoeCost;
      const q: GeneratedQuestion = {
        problemText: `A new dance studio just opened in Sophie's town, and she wants to try their classes. Sophie bought ${classes} classes for $${pricePerClass} each. She also bought a $${shoeCost.toFixed(2)} pair of shoes. How much money did Sophie spend altogether?`,
        answer,
        hint: `C - Circle: ${classes}, $${pricePerClass}, $${shoeCost.toFixed(2)}. U - Underline: "How much altogether?" B - Box: "each" (multiply), "altogether" (add).`,
        solution: `Step 1: Find cost of classes: ${classes} × $${pricePerClass} = $${classCost}.\nStep 2: Add shoe cost: $${classCost} + $${shoeCost.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: Sophie spent $${answer.toFixed(2)} altogether.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the cost of classes. What is ${classes} × $${pricePerClass}?`,
            expectedAnswer: classCost,
            feedbackCorrect: `Correct! The classes cost $${classCost}.`,
            feedbackIncorrect: `${classes} × $${pricePerClass} = $${classCost}.`,
          },
          {
            instruction: `Now add the shoe cost. What is $${classCost} + $${shoeCost.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Sophie spent $${answer.toFixed(2)} altogether!`,
            feedbackIncorrect: `$${classCost} + $${shoeCost.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
      }
      return q;
    },
  },
];

export function generateMeasurementUnits(guided: boolean): GeneratedQuestion {
  return pick(templates).generate(guided);
}

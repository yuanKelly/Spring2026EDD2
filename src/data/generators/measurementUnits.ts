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
      const containerSize = randInt(12, 16);
      const berry1 = randInt(3, containerSize - 4);
      const berry2 = randInt(4, containerSize - 3);
      const berry3 = randInt(5, containerSize - 2);
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
  // Q8: Swim meet — add three numbers then subtract from goal
  {
    generate: (guided) => {
      const m1 = randInt(800, 1400);
      const m2 = randInt(700, 1200);
      const m3 = randInt(800, 1300);
      const total = m1 + m2 + m3;
      const goal = total + randInt(100, 800);
      const answer = goal - total;
      const q: GeneratedQuestion = {
        problemText: `Mia is training for a swim meet. In her first week she swam ${m1.toLocaleString()} meters, in her second week she swam ${m2.toLocaleString()} meters, and in her third week she swam ${m3.toLocaleString()} meters. Her goal was to swim ${goal.toLocaleString()} meters total across the three weeks. By how many meters did Mia fall short of her goal?`,
        answer,
        hint: `C - Circle: ${m1.toLocaleString()}, ${m2.toLocaleString()}, ${m3.toLocaleString()}, ${goal.toLocaleString()}. U - Underline: "How many meters fall short?" B - Box: "total" (add), "fall short" (subtract).`,
        solution: `Step 1: Add all three weeks: ${m1.toLocaleString()} + ${m2.toLocaleString()} + ${m3.toLocaleString()} = ${total.toLocaleString()} meters.\nStep 2: Subtract from the goal: ${goal.toLocaleString()} - ${total.toLocaleString()} = ${answer} meters.\nAnswer: Mia fell short by ${answer} meters.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, add all three weeks of swimming. What is ${m1.toLocaleString()} + ${m2.toLocaleString()} + ${m3.toLocaleString()}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Mia swam ${total.toLocaleString()} meters total.`,
            feedbackIncorrect: `${m1.toLocaleString()} + ${m2.toLocaleString()} + ${m3.toLocaleString()} = ${total.toLocaleString()} meters.`,
          },
          {
            instruction: `Now subtract from the goal. What is ${goal.toLocaleString()} - ${total.toLocaleString()}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Mia fell short by ${answer} meters!`,
            feedbackIncorrect: `${goal.toLocaleString()} - ${total.toLocaleString()} = ${answer} meters.`,
          },
        ];
      }
      return q;
    },
  },
  // Q9: Science fair — add three scores then subtract from target
  {
    generate: (guided) => {
      const p1 = randInt(30, 60);
      const p2 = randInt(10, 30);
      const p3 = randInt(15, 40);
      const total = p1 + p2 + p3;
      const target = total + randInt(5, 30);
      const answer = target - total;
      const q: GeneratedQuestion = {
        problemText: `At the science fair, Theo's project earned ${p1} points from the judges, ${p2} points for his display board, and ${p3} points for his oral presentation. The first-place prize requires ${target} points. How many more points would Theo have needed to win first place?`,
        answer,
        hint: `C - Circle: ${p1}, ${p2}, ${p3}, ${target}. U - Underline: "How many more points?" B - Box: "earned" (add), "more" (subtract from target).`,
        solution: `Step 1: Add all points: ${p1} + ${p2} + ${p3} = ${total} points.\nStep 2: Subtract from target: ${target} - ${total} = ${answer} more points needed.\nAnswer: Theo needed ${answer} more points.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, add all of Theo's points. What is ${p1} + ${p2} + ${p3}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Theo earned ${total} points total.`,
            feedbackIncorrect: `${p1} + ${p2} + ${p3} = ${total} points.`,
          },
          {
            instruction: `Now subtract from the target. What is ${target} - ${total}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Theo needed ${answer} more points!`,
            feedbackIncorrect: `${target} - ${total} = ${answer} more points.`,
          },
        ];
      }
      return q;
    },
  },
  // Q10: Supply drive — add three items then divide by classrooms
  {
    generate: (guided) => {
      const classrooms = randInt(3, 5);
      const perClass = randInt(80, 200);
      const total = classrooms * perClass;
      const s1 = randInt(Math.floor(total * 0.4), Math.floor(total * 0.6));
      const s2 = randInt(Math.floor(total * 0.2), Math.floor(total * 0.35));
      const s3 = total - s1 - s2;
      const answer = perClass;
      const q: GeneratedQuestion = {
        problemText: `A school supply drive collected ${s1} pencils, ${s2} markers, and ${s3} erasers. The supplies were divided equally among ${classrooms} classrooms. How many total supplies did each classroom receive?`,
        answer,
        hint: `C - Circle: ${s1}, ${s2}, ${s3}, ${classrooms}. U - Underline: "How many did each classroom receive?" B - Box: "collected" (add), "divided equally" (divide).`,
        solution: `Step 1: Add all supplies: ${s1} + ${s2} + ${s3} = ${total} supplies.\nStep 2: Divide equally: ${total} ÷ ${classrooms} = ${answer} supplies per classroom.\nAnswer: Each classroom received ${answer} supplies.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, add all the supplies. What is ${s1} + ${s2} + ${s3}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! There are ${total} supplies total.`,
            feedbackIncorrect: `${s1} + ${s2} + ${s3} = ${total} supplies.`,
          },
          {
            instruction: `Now divide equally among ${classrooms} classrooms. What is ${total} ÷ ${classrooms}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each classroom gets ${answer} supplies!`,
            feedbackIncorrect: `${total} ÷ ${classrooms} = ${answer} supplies.`,
          },
        ];
      }
      return q;
    },
  },
  // Q11: Gift bags — subtract leftover then divide
  {
    generate: (guided) => {
      const perBag = randInt(8, 15);
      const bags = randInt(5, 12);
      const leftover = randInt(5, 15);
      const totalCandy = perBag * bags + leftover;
      const used = totalCandy - leftover;
      const answer = bags;
      const q: GeneratedQuestion = {
        problemText: `Jasmine is making gift bags for her birthday party. She bought ${totalCandy} pieces of candy to fill the bags. She used ${perBag} pieces for each bag. After filling all the bags, she had ${leftover} pieces of candy left over. How many gift bags did Jasmine fill?`,
        answer,
        hint: `C - Circle: ${totalCandy}, ${perBag}, ${leftover}. U - Underline: "How many gift bags?" B - Box: "left over" (subtract), "each bag" (divide).`,
        solution: `Step 1: Subtract the leftover candy: ${totalCandy} - ${leftover} = ${used} pieces used.\nStep 2: Divide by pieces per bag: ${used} ÷ ${perBag} = ${answer} bags.\nAnswer: Jasmine filled ${answer} gift bags.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, subtract the leftover candy. What is ${totalCandy} - ${leftover}?`,
            expectedAnswer: used,
            feedbackCorrect: `Correct! Jasmine used ${used} pieces of candy.`,
            feedbackIncorrect: `${totalCandy} - ${leftover} = ${used} pieces used.`,
          },
          {
            instruction: `Now divide by pieces per bag. What is ${used} ÷ ${perBag}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Jasmine filled ${answer} gift bags!`,
            feedbackIncorrect: `${used} ÷ ${perBag} = ${answer} bags.`,
          },
        ];
      }
      return q;
    },
  },
  // Q12: Video game — subtract then divide (exact)
  {
    generate: (guided) => {
      const perLawn = randInt(7, 12);
      const lawns = randInt(2, 5);
      const has = randInt(20, 35);
      const price = has + perLawn * lawns;
      const needed = price - has;
      const answer = lawns;
      const q: GeneratedQuestion = {
        problemText: `Tyler wants to buy a video game that costs $${price.toFixed(2)}. He has already saved $${has.toFixed(2)}. He earns $${perLawn} each time he mows a lawn. How many lawns does Tyler need to mow to have enough money to buy the game?`,
        answer,
        hint: `C - Circle: $${price.toFixed(2)}, $${has.toFixed(2)}, $${perLawn}. U - Underline: "How many lawns?" B - Box: "saved" (subtract), "each time" (divide).`,
        solution: `Step 1: Find how much more Tyler needs: $${price.toFixed(2)} - $${has.toFixed(2)} = $${needed}.\nStep 2: Divide by earnings per lawn: $${needed} ÷ $${perLawn} = ${answer} lawns.\nAnswer: Tyler needs to mow ${answer} lawns.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find how much more Tyler needs. What is $${price.toFixed(2)} - $${has.toFixed(2)}?`,
            expectedAnswer: needed,
            feedbackCorrect: `Correct! Tyler needs $${needed} more.`,
            feedbackIncorrect: `$${price.toFixed(2)} - $${has.toFixed(2)} = $${needed}.`,
          },
          {
            instruction: `Now divide by his earnings per lawn. What is $${needed} ÷ $${perLawn}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Tyler needs to mow ${answer} lawns!`,
            feedbackIncorrect: `$${needed} ÷ $${perLawn} = ${answer} lawns.`,
          },
        ];
      }
      return q;
    },
  },
  // Q13: Movie theater — add Saturday then subtract for Sunday
  {
    generate: (guided) => {
      const sat1 = randInt(200, 400);
      const sat2 = randInt(100, 250);
      const satTotal = sat1 + sat2;
      const fewer = randInt(50, 150);
      const answer = satTotal - fewer;
      const q: GeneratedQuestion = {
        problemText: `A movie theater sold ${sat1} adult tickets and ${sat2} children's tickets on Saturday. On Sunday they sold ${fewer} fewer total tickets than on Saturday. How many tickets did the theater sell on Sunday?`,
        answer,
        hint: `C - Circle: ${sat1}, ${sat2}, ${fewer}. U - Underline: "How many on Sunday?" B - Box: "sold" (add Saturday), "fewer" (subtract).`,
        solution: `Step 1: Find Saturday total: ${sat1} + ${sat2} = ${satTotal} tickets.\nStep 2: Subtract for Sunday: ${satTotal} - ${fewer} = ${answer} tickets.\nAnswer: The theater sold ${answer} tickets on Sunday.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find Saturday's total tickets. What is ${sat1} + ${sat2}?`,
            expectedAnswer: satTotal,
            feedbackCorrect: `Correct! Saturday had ${satTotal} tickets.`,
            feedbackIncorrect: `${sat1} + ${sat2} = ${satTotal} tickets on Saturday.`,
          },
          {
            instruction: `Now subtract for Sunday ("fewer" means subtract). What is ${satTotal} - ${fewer}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The theater sold ${answer} tickets on Sunday!`,
            feedbackIncorrect: `${satTotal} - ${fewer} = ${answer} tickets.`,
          },
        ];
      }
      return q;
    },
  },
  // Q14: Cookie baking — multiply batches then subtract what she has
  {
    generate: (guided) => {
      const batches = randInt(2, 5);
      const cupsPerBatch = randInt(2, 4);
      const totalNeeded = batches * cupsPerBatch;
      const has = randInt(2, totalNeeded - 1);
      const answer = totalNeeded - has;
      const q: GeneratedQuestion = {
        problemText: `Sofia is baking cookies for a bake sale. Her recipe makes 24 cookies and calls for ${cupsPerBatch} cups of flour. She wants to make ${batches} batches. She already has ${has} cups of flour at home. How many more cups of flour does Sofia need to buy?`,
        answer,
        hint: `C - Circle: ${cupsPerBatch}, ${batches}, ${has}. U - Underline: "How many more cups?" B - Box: "each batch" (multiply), "more" (subtract).`,
        solution: `Step 1: Find total flour needed: ${batches} × ${cupsPerBatch} = ${totalNeeded} cups.\nStep 2: Subtract what she has: ${totalNeeded} - ${has} = ${answer} more cups.\nAnswer: Sofia needs to buy ${answer} more cups of flour.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total flour needed. What is ${batches} × ${cupsPerBatch}?`,
            expectedAnswer: totalNeeded,
            feedbackCorrect: `Correct! Sofia needs ${totalNeeded} cups total.`,
            feedbackIncorrect: `${batches} × ${cupsPerBatch} = ${totalNeeded} cups.`,
          },
          {
            instruction: `Now subtract what she already has. What is ${totalNeeded} - ${has}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Sofia needs to buy ${answer} more cups!`,
            feedbackIncorrect: `${totalNeeded} - ${has} = ${answer} cups.`,
          },
        ];
      }
      return q;
    },
  },
  // Q15: School store — multiply+multiply then subtract from payment
  {
    generate: (guided) => {
      const notebooks = randInt(2, 5);
      const notebookPrice = randInt(2, 4);
      const pens = randInt(3, 7);
      const penPrice = 1;
      const notebookTotal = notebooks * notebookPrice;
      const penTotal = pens * penPrice;
      const spent = notebookTotal + penTotal;
      const payment = spent < 20 ? 20 : 50;
      const answer = payment - spent;
      const q: GeneratedQuestion = {
        problemText: `At the school store, notebooks cost $${notebookPrice} each and pens cost $${penPrice} each. Ryan bought ${notebooks} notebooks and ${pens} pens. He paid with a $${payment} bill. How much change did Ryan receive?`,
        answer,
        hint: `C - Circle: $${notebookPrice}, $${penPrice}, ${notebooks}, ${pens}, $${payment}. U - Underline: "How much change?" B - Box: "each" (multiply), "change" (subtract from payment).`,
        solution: `Step 1: Find notebook cost: ${notebooks} × $${notebookPrice} = $${notebookTotal}.\nStep 2: Find pen cost: ${pens} × $${penPrice} = $${penTotal}.\nStep 3: Find total spent: $${notebookTotal} + $${penTotal} = $${spent}.\nStep 4: Find change: $${payment} - $${spent} = $${answer}.\nAnswer: Ryan received $${answer} in change.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total spent. Notebooks: ${notebooks} × $${notebookPrice} = $${notebookTotal}. Pens: ${pens} × $${penPrice} = $${penTotal}. What is $${notebookTotal} + $${penTotal}?`,
            expectedAnswer: spent,
            feedbackCorrect: `Correct! Ryan spent $${spent} total.`,
            feedbackIncorrect: `$${notebookTotal} + $${penTotal} = $${spent}.`,
          },
          {
            instruction: `Now find the change. What is $${payment} - $${spent}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Ryan received $${answer} in change!`,
            feedbackIncorrect: `$${payment} - $${spent} = $${answer}.`,
          },
        ];
      }
      return q;
    },
  },
  // Q16: Hiking trail — subtract twice
  {
    generate: (guided) => {
      const totalMiles = randInt(12, 25);
      const day1 = randInt(4, 8);
      const day2 = randInt(3, 7);
      const afterDay1 = totalMiles - day1;
      const answer = afterDay1 - day2;
      const q: GeneratedQuestion = {
        problemText: `A hiking trail is ${totalMiles} miles long. On the first day, a group of hikers walked ${day1} miles. On the second day they walked ${day2} miles. How many miles do they still have left to finish the trail?`,
        answer,
        hint: `C - Circle: ${totalMiles}, ${day1}, ${day2}. U - Underline: "How many miles left?" B - Box: "walked" (subtract from total).`,
        solution: `Step 1: Subtract day 1: ${totalMiles} - ${day1} = ${afterDay1} miles left.\nStep 2: Subtract day 2: ${afterDay1} - ${day2} = ${answer} miles left.\nAnswer: They still have ${answer} miles left.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Subtract both days from the total. What is ${totalMiles} - ${day1} - ${day2}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! They have ${answer} miles left!`,
            feedbackIncorrect: `${totalMiles} - ${day1} - ${day2} = ${answer} miles left.`,
          },
        ];
      }
      return q;
    },
  },
  // Q17: Canned goods — add three then divide (floor)
  {
    generate: (guided) => {
      const c1 = randInt(30, 70);
      const c2 = randInt(40, 80);
      const c3 = randInt(35, 75);
      const boxSize = 12;
      const total = c1 + c2 + c3;
      const answer = Math.floor(total / boxSize);
      const q: GeneratedQuestion = {
        problemText: `Ava collected canned goods for a food drive over 3 days. She collected ${c1} cans on Monday, ${c2} cans on Tuesday, and ${c3} cans on Wednesday. She packed the cans into boxes of ${boxSize}. How many boxes did she fill completely?`,
        answer,
        hint: `C - Circle: ${c1}, ${c2}, ${c3}, ${boxSize}. U - Underline: "How many boxes completely?" B - Box: "collected" (add), "packed" (divide, round down).`,
        solution: `Step 1: Add all cans: ${c1} + ${c2} + ${c3} = ${total} cans.\nStep 2: Divide by box size: ${total} ÷ ${boxSize} = ${answer} full boxes (drop the remainder).\nAnswer: Ava filled ${answer} boxes completely.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, add all the cans. What is ${c1} + ${c2} + ${c3}?`,
            expectedAnswer: total,
            feedbackCorrect: `Correct! Ava collected ${total} cans total.`,
            feedbackIncorrect: `${c1} + ${c2} + ${c3} = ${total} cans.`,
          },
          {
            instruction: `Now divide by ${boxSize} and drop the remainder (only full boxes count). How many full boxes?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Ava filled ${answer} boxes completely!`,
            feedbackIncorrect: `${total} ÷ ${boxSize} = ${answer} full boxes.`,
          },
        ];
      }
      return q;
    },
  },
  // Q18: Pet shelter — add then subtract adopted
  {
    generate: (guided) => {
      const dogs = randInt(100, 200);
      const cats = randInt(60, 130);
      const dogsAdopted = randInt(20, 50);
      const catsAdopted = randInt(15, 40);
      const totalAnimals = dogs + cats;
      const totalAdopted = dogsAdopted + catsAdopted;
      const answer = totalAnimals - totalAdopted;
      const q: GeneratedQuestion = {
        problemText: `A pet shelter has ${dogs} dogs and ${cats} cats available for adoption. Over the weekend, ${dogsAdopted} dogs and ${catsAdopted} cats were adopted. How many animals does the shelter have left altogether?`,
        answer,
        hint: `C - Circle: ${dogs}, ${cats}, ${dogsAdopted}, ${catsAdopted}. U - Underline: "How many left?" B - Box: "has" (add), "adopted" (subtract).`,
        solution: `Step 1: Total animals: ${dogs} + ${cats} = ${totalAnimals}.\nStep 2: Total adopted: ${dogsAdopted} + ${catsAdopted} = ${totalAdopted}.\nStep 3: Animals left: ${totalAnimals} - ${totalAdopted} = ${answer}.\nAnswer: The shelter has ${answer} animals left.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total animals and total adopted. Total: ${dogs} + ${cats} = ${totalAnimals}. Adopted: ${dogsAdopted} + ${catsAdopted} = ${totalAdopted}. What is ${totalAnimals} - ${totalAdopted}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! The shelter has ${answer} animals left!`,
            feedbackIncorrect: `${totalAnimals} - ${totalAdopted} = ${answer} animals left.`,
          },
        ];
      }
      return q;
    },
  },
  // Q19: Driving — simple subtraction
  {
    generate: (guided) => {
      const total = randInt(250, 500);
      const driven = randInt(100, total - 50);
      const answer = total - driven;
      const q: GeneratedQuestion = {
        problemText: `Lucas and his family are driving ${total} miles to visit his grandparents. They have already driven ${driven} miles and stopped for gas. How many more miles do they still need to drive to reach his grandparents' house?`,
        answer,
        hint: `C - Circle: ${total}, ${driven}. U - Underline: "How many more miles?" B - Box: "already driven" (subtract from total).`,
        solution: `Step 1: Subtract the miles already driven: ${total} - ${driven} = ${answer} miles.\nAnswer: They still need to drive ${answer} miles.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Subtract the miles already driven from the total. What is ${total} - ${driven}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! They still need to drive ${answer} miles!`,
            feedbackIncorrect: `${total} - ${driven} = ${answer} miles.`,
          },
        ];
      }
      return q;
    },
  },
  // Q20: Emma notebooks — multiply+add then subtract from payment
  {
    generate: (guided) => {
      const qty = randInt(2, 5);
      const notebookPrice = randInt(2, 4);
      const pencilCost = randInt(4, 7);
      const notebookTotal = qty * notebookPrice;
      const spent = notebookTotal + pencilCost;
      const payment = spent < 20 ? 20 : 50;
      const answer = payment - spent;
      const q: GeneratedQuestion = {
        problemText: `Emma bought ${qty} notebooks for $${notebookPrice.toFixed(2)} each at the school store. She also bought a pack of colored pencils for $${pencilCost.toFixed(2)}. She paid with a $${payment} bill. How much change did Emma receive?`,
        answer,
        hint: `C - Circle: ${qty}, $${notebookPrice.toFixed(2)}, $${pencilCost.toFixed(2)}, $${payment}. U - Underline: "How much change?" B - Box: "each" (multiply), "change" (subtract).`,
        solution: `Step 1: Find notebook cost: ${qty} × $${notebookPrice.toFixed(2)} = $${notebookTotal.toFixed(2)}.\nStep 2: Add pencil cost: $${notebookTotal.toFixed(2)} + $${pencilCost.toFixed(2)} = $${spent.toFixed(2)}.\nStep 3: Find change: $${payment} - $${spent.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: Emma received $${answer.toFixed(2)} in change.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Find the total spent. Notebooks: ${qty} × $${notebookPrice.toFixed(2)} = $${notebookTotal.toFixed(2)}. Plus pencils: $${notebookTotal.toFixed(2)} + $${pencilCost.toFixed(2)} = ?`,
            expectedAnswer: spent,
            feedbackCorrect: `Correct! Emma spent $${spent.toFixed(2)} total.`,
            feedbackIncorrect: `$${notebookTotal.toFixed(2)} + $${pencilCost.toFixed(2)} = $${spent.toFixed(2)}.`,
          },
          {
            instruction: `Now find the change. What is $${payment} - $${spent.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Emma received $${answer.toFixed(2)} in change!`,
            feedbackIncorrect: `$${payment} - $${spent.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
      }
      return q;
    },
  },
  // Q21: Library books — divide with remainder
  {
    generate: (guided) => {
      const perShelf = randInt(25, 40);
      const shelves = randInt(4, 8);
      const leftover = randInt(1, perShelf - 1);
      const totalBooks = perShelf * shelves + leftover;
      const answer = leftover;
      const q: GeneratedQuestion = {
        problemText: `The school library received a donation of ${totalBooks} new books. The librarian put ${perShelf} books on each shelf. After filling as many shelves as she could completely, how many books were left over?`,
        answer,
        hint: `C - Circle: ${totalBooks}, ${perShelf}. U - Underline: "How many left over?" B - Box: "each shelf" (divide), "left over" (remainder).`,
        solution: `Step 1: Divide total by shelf size: ${totalBooks} ÷ ${perShelf} = ${shelves} shelves with ${answer} left over.\nAnswer: ${answer} books were left over.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Divide ${totalBooks} by ${perShelf}. The answer is the remainder (books left over). What is the remainder?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! ${answer} books were left over!`,
            feedbackIncorrect: `${totalBooks} ÷ ${perShelf} = ${shelves} remainder ${answer}. The answer is ${answer}.`,
          },
        ];
      }
      return q;
    },
  },
  // Q22: Yard work — multiply hours by rate then subtract from goal
  {
    generate: (guided) => {
      const hours1 = randInt(4, 8);
      const hours2 = randInt(2, 6);
      const rate = randInt(7, 12);
      const totalHours = hours1 + hours2;
      const earned = totalHours * rate;
      const jacketCost = earned + randInt(5, 25);
      const answer = jacketCost - earned;
      const q: GeneratedQuestion = {
        problemText: `Carlos earns $${rate} for each hour he helps his neighbor with yard work. Last week he worked ${hours1} hours, and this week he worked ${hours2} hours. He wants to buy a jacket that costs $${jacketCost}. How much more money does he still need?`,
        answer,
        hint: `C - Circle: $${rate}, ${hours1}, ${hours2}, $${jacketCost}. U - Underline: "How much more?" B - Box: "each hour" (multiply), "more" (subtract).`,
        solution: `Step 1: Find total hours: ${hours1} + ${hours2} = ${totalHours} hours.\nStep 2: Find total earned: ${totalHours} × $${rate} = $${earned}.\nStep 3: Subtract from jacket cost: $${jacketCost} - $${earned} = $${answer}.\nAnswer: Carlos still needs $${answer} more.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find total hours (${hours1} + ${hours2} = ${totalHours}) and total earned. What is ${totalHours} × $${rate}?`,
            expectedAnswer: earned,
            feedbackCorrect: `Correct! Carlos earned $${earned}.`,
            feedbackIncorrect: `${totalHours} × $${rate} = $${earned}.`,
          },
          {
            instruction: `Now subtract from the jacket cost. What is $${jacketCost} - $${earned}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Carlos still needs $${answer}!`,
            feedbackIncorrect: `$${jacketCost} - $${earned} = $${answer}.`,
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

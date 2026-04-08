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
  // Q1: Laser tag — multiply two ways then add
  {
    generate: (guided) => {
      const tagPoints = randInt(3, 8);
      const podPoints = randInt(10, 20);
      const tags = randInt(10, 25);
      const pods = randInt(3, 10);
      const tagTotal = tagPoints * tags;
      const podTotal = podPoints * pods;
      const answer = tagTotal + podTotal;
      const q: GeneratedQuestion = {
        problemText: `At Laser Tag Park, players earn ${tagPoints} points every time they tag a member of the other team. Each time a player hits one of the laser pods in the park, the player earns ${podPoints} points. At her laser tag birthday party, Juliana tagged members of the other team ${tags} times. She also hit a laser pod ${pods} times. How many points did Juliana earn by the end of the game?`,
        answer,
        hint: `Draw a picture with two groups: tags and pods. Find the points from each, then add them together.`,
        solution: `Step 1: Find points from tags: ${tagPoints} × ${tags} = ${tagTotal} points.\nStep 2: Find points from pods: ${podPoints} × ${pods} = ${podTotal} points.\nStep 3: Add them together: ${tagTotal} + ${podTotal} = ${answer} points.\nAnswer: Juliana earned ${answer} points.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Draw two groups in your picture: tags and pods. First, find the points from tags. What is ${tagPoints} × ${tags}?`,
            expectedAnswer: tagTotal,
            feedbackCorrect: `Correct! ${tagPoints} × ${tags} = ${tagTotal} points from tags.`,
            feedbackIncorrect: `${tagPoints} × ${tags} = ${tagTotal} points from tags.`,
          },
          {
            instruction: `Now find the points from pods (${podPoints} × ${pods}) and add both totals together. What is the final answer?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${tagTotal} + ${podTotal} = ${answer} total points!`,
            feedbackIncorrect: `Pods: ${podPoints} × ${pods} = ${podTotal}. Total: ${tagTotal} + ${podTotal} = ${answer} points.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: tags, label: 'Tags', value: `${tagPoints} pts each`, color: 'amber' },
            { type: 'circle', count: pods, label: 'Pods', value: `${podPoints} pts each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${tagPoints} × ${tags} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `${tagTotal} + ${podTotal} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q2: Crayons vs coloring books — divide then subtract
  {
    generate: (guided) => {
      const n = randInt(2, 5);
      const per = randInt(1, 4);
      const total = n * per;
      const crayons = per + randInt(1, 4);
      const answer = crayons - per;
      const q: GeneratedQuestion = {
        problemText: `At Color City Crafts, Charlotte paid $${crayons.toFixed(2)} for a box of crayons. He also paid $${total} total for ${n} coloring books. How much more does a box of crayons cost than a coloring book?`,
        answer,
        hint: `Draw a picture showing the crayons and the coloring books. First find the cost of one coloring book, then compare.`,
        solution: `Step 1: Find the cost of one coloring book: $${total} ÷ ${n} = $${per.toFixed(2)} per book.\nStep 2: Find the difference: $${crayons.toFixed(2)} - $${per.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: The crayons cost $${answer.toFixed(2)} more than a coloring book.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the cost of one coloring book. What is $${total} ÷ ${n}?`,
            expectedAnswer: per,
            feedbackCorrect: `Correct! Each coloring book costs $${per.toFixed(2)}.`,
            feedbackIncorrect: `$${total} ÷ ${n} = $${per.toFixed(2)} per coloring book.`,
          },
          {
            instruction: `Now find the difference. What is $${crayons.toFixed(2)} - $${per.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The crayons cost $${answer.toFixed(2)} more!`,
            feedbackIncorrect: `$${crayons.toFixed(2)} - $${per.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: 1, label: 'Crayons', value: `$${crayons.toFixed(2)}`, color: 'amber' },
            { type: 'rect', count: n, label: 'Coloring Books', value: `$${total} total`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [1], highlightGroup: 1, annotations: [{ text: `$${total} ÷ ${n} = ?`, position: 'below', targetGroup: 1 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `$${crayons.toFixed(2)} − $${per.toFixed(2)} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q3: Tacos and burrito — subtract then multiply
  {
    generate: (guided) => {
      const burritoCost = randInt(5, 9);
      const lessAmount = randInt(1, 3);
      const tacoCost = burritoCost - lessAmount;
      const numTacos = randInt(2, 4);
      const answer = tacoCost * numTacos;
      const q: GeneratedQuestion = {
        problemText: `Poppy and his friend got lunch at their favorite food truck. Poppy's friend ordered a burrito for $${burritoCost}.00, and Poppy got ${numTacos} tacos. A taco costs $${lessAmount}.00 less than a burrito. In all, how much money did Poppy spend on his tacos?`,
        answer,
        hint: `Draw the burrito price, then show a taco costing $${lessAmount} less. Find one taco's price, then multiply.`,
        solution: `Step 1: Find the cost of one taco: $${burritoCost} - $${lessAmount} = $${tacoCost}.\nStep 2: Multiply by the number of tacos: $${tacoCost} × ${numTacos} = $${answer}.\nAnswer: Poppy spent $${answer} on tacos.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the cost of one taco. A taco costs $${lessAmount} less than a burrito. What is $${burritoCost} - $${lessAmount}?`,
            expectedAnswer: tacoCost,
            feedbackCorrect: `Correct! One taco costs $${tacoCost}.`,
            feedbackIncorrect: `$${burritoCost} - $${lessAmount} = $${tacoCost} per taco.`,
          },
          {
            instruction: `Now multiply by the number of tacos. What is $${tacoCost} × ${numTacos}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Poppy spent $${answer} on tacos!`,
            feedbackIncorrect: `$${tacoCost} × ${numTacos} = $${answer}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: 1, label: 'Burrito', value: `$${burritoCost}`, color: 'amber' },
            { type: 'rect', count: numTacos, label: 'Tacos', value: `$${lessAmount} less each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0, 1], highlightGroup: 0, annotations: [{ text: `$${burritoCost} − $${lessAmount} = ?`, position: 'between' }] },
            { visibleGroups: [0, 1], highlightGroup: 1, annotations: [{ text: `$${tacoCost} × ${numTacos} = ?`, position: 'below', targetGroup: 1 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q4: Calculators and batteries — multiply then divide
  {
    generate: (guided) => {
      const packages = randInt(2, 5);
      const perPackage = randInt(8, 12);
      const batteriesPerCalc = randInt(2, 5);
      const totalBatteries = packages * perPackage;
      const answer = Math.floor(totalBatteries / batteriesPerCalc);
      const q: GeneratedQuestion = {
        problemText: `Ms. Lin got new calculators for her classroom, and now she needs to put batteries in them. She has ${packages} packages of batteries with ${perPackage} batteries each. Each calculator needs ${batteriesPerCalc} batteries. How many calculators can she fill completely?`,
        answer,
        hint: `Draw the packages of batteries, then group them into sets of ${batteriesPerCalc} for each calculator.`,
        solution: `Step 1: Find the total batteries: ${packages} × ${perPackage} = ${totalBatteries} batteries.\nStep 2: Divide by batteries per calculator: ${totalBatteries} ÷ ${batteriesPerCalc} = ${answer} calculators.\nAnswer: Ms. Lin can fill ${answer} calculators completely.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total number of batteries. What is ${packages} × ${perPackage}?`,
            expectedAnswer: totalBatteries,
            feedbackCorrect: `Correct! There are ${totalBatteries} batteries in total.`,
            feedbackIncorrect: `${packages} × ${perPackage} = ${totalBatteries} batteries.`,
          },
          {
            instruction: `Now divide by batteries per calculator. What is ${totalBatteries} ÷ ${batteriesPerCalc}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Ms. Lin can fill ${answer} calculators!`,
            feedbackIncorrect: `${totalBatteries} ÷ ${batteriesPerCalc} = ${answer} calculators.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: packages, label: 'Packages', value: `${perPackage} each`, color: 'amber' },
            { type: 'circle', count: answer, label: 'Calculators', value: `${batteriesPerCalc} batteries each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${packages} × ${perPackage} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], highlightGroup: 1, annotations: [{ text: `${totalBatteries} ÷ ${batteriesPerCalc} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q5: Chickens and egg cartons — multiply then divide (round up)
  {
    generate: (guided) => {
      const chickens = randInt(5, 12);
      const eggsEach = randInt(3, 7);
      const cartonSize = randInt(4, 8);
      const totalEggs = chickens * eggsEach;
      const answer = Math.ceil(totalEggs / cartonSize);
      const q: GeneratedQuestion = {
        problemText: `Shirley has ${chickens} chickens in her yard. This week, they produced ${eggsEach} eggs each. Shirley packs the eggs into ${cartonSize}-egg cartons. How many cartons will Shirley need to fit all of the eggs?`,
        answer,
        hint: `Draw the chickens and their eggs. Find the total, then group into cartons of ${cartonSize}. If there are leftovers, you need one more carton!`,
        solution: `Step 1: Find the total eggs: ${chickens} × ${eggsEach} = ${totalEggs} eggs.\nStep 2: Divide by carton size: ${totalEggs} ÷ ${cartonSize} = ${(totalEggs / cartonSize).toFixed(1)}.\nStep 3: Round up (leftover eggs still need a carton): ${answer} cartons.\nAnswer: Shirley needs ${answer} cartons.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total eggs. What is ${chickens} × ${eggsEach}?`,
            expectedAnswer: totalEggs,
            feedbackCorrect: `Correct! The chickens produced ${totalEggs} eggs total.`,
            feedbackIncorrect: `${chickens} × ${eggsEach} = ${totalEggs} eggs.`,
          },
          {
            instruction: `Now divide ${totalEggs} by ${cartonSize} and round up if needed. How many cartons does Shirley need?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Shirley needs ${answer} cartons!`,
            feedbackIncorrect: `${totalEggs} ÷ ${cartonSize} = ${(totalEggs / cartonSize).toFixed(1)}, round up to ${answer} cartons.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: chickens, label: 'Chickens', value: `${eggsEach} eggs each`, color: 'amber' },
            { type: 'rect', count: answer, label: 'Cartons', value: `${cartonSize} per carton`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${chickens} × ${eggsEach} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], highlightGroup: 1, annotations: [{ text: `${totalEggs} ÷ ${cartonSize} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q6: Fraction of students — fraction × whole number
  {
    generate: (guided) => {
      const totalStudents = randInt(2, 6) * 2;
      const answer = totalStudents / 2;
      const q: GeneratedQuestion = {
        problemText: `Of the ${totalStudents} students in Mrs. Franklin's art class, one-half are in sixth grade. How many sixth graders are in Mrs. Franklin's art class?`,
        answer,
        hint: `Draw ${totalStudents} students, then split them into 2 equal groups. One group is the sixth graders.`,
        solution: `Step 1: "One-half" means divide by 2.\nStep 2: ${totalStudents} ÷ 2 = ${answer}.\nAnswer: There are ${answer} sixth graders.`,
        njslsStandard: '5.OA.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `"One-half" means divide by 2. What is ${totalStudents} ÷ 2?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! There are ${answer} sixth graders!`,
            feedbackIncorrect: `${totalStudents} ÷ 2 = ${answer} sixth graders.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: totalStudents, label: 'Students', color: 'amber', highlightCount: answer },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${totalStudents} ÷ 2 = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q7: Fraction of trees — fraction × whole number
  {
    generate: (guided) => {
      const fraction = pick([3, 4, 5]);
      const totalTrees = fraction * randInt(2, 5);
      const answer = totalTrees / fraction;
      const fractionWord = fraction === 3 ? 'one-third' : fraction === 4 ? 'one-fourth' : 'one-fifth';
      const q: GeneratedQuestion = {
        problemText: `${fractionWord.charAt(0).toUpperCase() + fractionWord.slice(1)} of the ${totalTrees} trees in the orchard are cherry trees. How many cherry trees are in the orchard?`,
        answer,
        hint: `Draw ${totalTrees} trees, then split them into ${fraction} equal groups. One group is the cherry trees.`,
        solution: `Step 1: "${fractionWord}" means divide by ${fraction}.\nStep 2: ${totalTrees} ÷ ${fraction} = ${answer}.\nAnswer: There are ${answer} cherry trees.`,
        njslsStandard: '5.OA.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `"${fractionWord.charAt(0).toUpperCase() + fractionWord.slice(1)}" means divide by ${fraction}. What is ${totalTrees} ÷ ${fraction}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! There are ${answer} cherry trees!`,
            feedbackIncorrect: `${totalTrees} ÷ ${fraction} = ${answer} cherry trees.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: totalTrees, label: 'Trees', color: 'amber', highlightCount: answer },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${totalTrees} ÷ ${fraction} = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
];

export function generateMultistepOperations(guided: boolean): GeneratedQuestion {
  return pick(templates).generate(guided);
}

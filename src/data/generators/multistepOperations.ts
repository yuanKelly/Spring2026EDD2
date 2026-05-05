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
        problemText: `At Color City Crafts, Charlotte paid $${crayons.toFixed(2)} for a box of crayons. She also paid $${total} total for ${n} coloring books. How much more does a box of crayons cost than a coloring book?`,
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
  // Q8: Book fair — multiply+multiply then subtract from payment
  {
    generate: (guided) => {
      const bookCount = randInt(2, 5);
      const bookPrice = randInt(3, 6);
      const bookmarkCount = randInt(2, 4);
      const bookmarkPrice = pick([1, 2]);
      const bookTotal = bookCount * bookPrice;
      const bookmarkTotal = bookmarkCount * bookmarkPrice;
      const spent = bookTotal + bookmarkTotal;
      const payment = spent < 20 ? 20 : 50;
      const answer = payment - spent;
      const q: GeneratedQuestion = {
        problemText: `At the school book fair, Marcus bought ${bookCount} books that cost $${bookPrice} each. He also bought ${bookmarkCount} bookmarks for $${bookmarkPrice.toFixed(2)} each. He paid with a $${payment} bill. How much change did Marcus receive?`,
        answer,
        hint: `Draw a picture with two groups: books and bookmarks. Find the cost of each group, add them, then subtract from $${payment}.`,
        solution: `Step 1: Find book cost: ${bookCount} × $${bookPrice} = $${bookTotal}.\nStep 2: Find bookmark cost: ${bookmarkCount} × $${bookmarkPrice.toFixed(2)} = $${bookmarkTotal}.\nStep 3: Total spent: $${bookTotal} + $${bookmarkTotal} = $${spent}.\nStep 4: Change: $${payment} - $${spent} = $${answer}.\nAnswer: Marcus received $${answer} in change.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total spent. Books: ${bookCount} × $${bookPrice} = $${bookTotal}. Bookmarks: ${bookmarkCount} × $${bookmarkPrice.toFixed(2)} = $${bookmarkTotal}. What is $${bookTotal} + $${bookmarkTotal}?`,
            expectedAnswer: spent,
            feedbackCorrect: `Correct! Marcus spent $${spent} total.`,
            feedbackIncorrect: `$${bookTotal} + $${bookmarkTotal} = $${spent}.`,
          },
          {
            instruction: `Now find the change. What is $${payment} - $${spent}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Marcus received $${answer} in change!`,
            feedbackIncorrect: `$${payment} - $${spent} = $${answer}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: bookCount, label: 'Books', value: `$${bookPrice} each`, color: 'amber' },
            { type: 'rect', count: bookmarkCount, label: 'Bookmarks', value: `$${bookmarkPrice.toFixed(2)} each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0, 1], annotations: [{ text: `$${bookTotal} + $${bookmarkTotal} = ?`, position: 'between' }] },
            { visibleGroups: [0, 1], annotations: [{ text: `$${payment} − $${spent} = ?`, position: 'below', targetGroup: 1 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q9: School garden — multiply chain (rows × plants × tomatoes)
  {
    generate: (guided) => {
      const rows = randInt(4, 8);
      const plants = randInt(5, 10);
      const tomatoes = randInt(2, 5);
      const totalPlants = rows * plants;
      const answer = totalPlants * tomatoes;
      const q: GeneratedQuestion = {
        problemText: `The school garden has ${rows} rows of vegetable plants. Each row has ${plants} plants. Each plant grows ${tomatoes} tomatoes. How many tomatoes are there in all?`,
        answer,
        hint: `Draw the rows and plants first. Find total plants, then multiply by tomatoes per plant.`,
        solution: `Step 1: Find total plants: ${rows} × ${plants} = ${totalPlants} plants.\nStep 2: Find total tomatoes: ${totalPlants} × ${tomatoes} = ${answer} tomatoes.\nAnswer: There are ${answer} tomatoes in all.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total number of plants. What is ${rows} × ${plants}?`,
            expectedAnswer: totalPlants,
            feedbackCorrect: `Correct! There are ${totalPlants} plants total.`,
            feedbackIncorrect: `${rows} × ${plants} = ${totalPlants} plants.`,
          },
          {
            instruction: `Now multiply by tomatoes per plant. What is ${totalPlants} × ${tomatoes}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! There are ${answer} tomatoes in all!`,
            feedbackIncorrect: `${totalPlants} × ${tomatoes} = ${answer} tomatoes.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: rows, label: 'Rows', value: `${plants} plants each`, color: 'amber' },
            { type: 'circle', count: totalPlants, label: 'Plants', value: `${tomatoes} tomatoes each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${rows} × ${plants} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `${totalPlants} × ${tomatoes} = ?`, position: 'below', targetGroup: 1 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q10: Soccer coach — divide into teams
  {
    generate: (guided) => {
      const perTeam = randInt(3, 6);
      const teams = randInt(4, 10);
      const players = perTeam * teams;
      const answer = teams;
      const q: GeneratedQuestion = {
        problemText: `Coach Rivera has ${players} soccer players who need to be placed into equal teams of ${perTeam}. Each team also needs 1 coach. How many coaches does Coach Rivera need in total?`,
        answer,
        hint: `Draw the players, then group them into teams of ${perTeam}. Each team needs 1 coach, so the number of coaches equals the number of teams.`,
        solution: `Step 1: Find the number of teams: ${players} ÷ ${perTeam} = ${teams} teams.\nStep 2: Each team needs 1 coach, so ${teams} coaches are needed.\nAnswer: Coach Rivera needs ${answer} coaches in total.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find how many teams there are. What is ${players} ÷ ${perTeam}?`,
            expectedAnswer: teams,
            feedbackCorrect: `Correct! There are ${teams} teams.`,
            feedbackIncorrect: `${players} ÷ ${perTeam} = ${teams} teams.`,
          },
          {
            instruction: `Each team needs 1 coach. How many coaches are needed for ${teams} teams?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} coaches are needed!`,
            feedbackIncorrect: `${teams} teams × 1 coach = ${answer} coaches.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: players, label: 'Players', value: `groups of ${perTeam}`, color: 'amber' },
            { type: 'rect', count: teams, label: 'Teams/Coaches', value: '1 coach each', color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${players} ÷ ${perTeam} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], highlightGroup: 1, annotations: [{ text: `${teams} teams = ${teams} coaches`, position: 'below', targetGroup: 1 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q11: Farmers market — price difference
  {
    generate: (guided) => {
      const applePrice = pick([3, 4, 5]);
      const honeyPrice = applePrice + randInt(1, 3);
      const answer = honeyPrice - applePrice;
      const q: GeneratedQuestion = {
        problemText: `At the farmers market, a bag of apples costs $${applePrice.toFixed(2)}. A jar of honey costs $${honeyPrice.toFixed(2)}. Priya bought one bag of apples and one jar of honey. How much more did the honey cost than the apples?`,
        answer,
        hint: `Draw a picture showing both prices. Subtract the smaller price from the larger price.`,
        solution: `Step 1: Find the difference: $${honeyPrice.toFixed(2)} - $${applePrice.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: The honey cost $${answer.toFixed(2)} more than the apples.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Subtract the apple price from the honey price. What is $${honeyPrice.toFixed(2)} - $${applePrice.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! The honey cost $${answer.toFixed(2)} more!`,
            feedbackIncorrect: `$${honeyPrice.toFixed(2)} - $${applePrice.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: 1, label: 'Apples', value: `$${applePrice.toFixed(2)}`, color: 'amber' },
            { type: 'rect', count: 1, label: 'Honey', value: `$${honeyPrice.toFixed(2)}`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0, 1], annotations: [{ text: `$${honeyPrice.toFixed(2)} − $${applePrice.toFixed(2)} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q12: Drama club — one-fourth of students
  {
    generate: (guided) => {
      const totalStudents = randInt(2, 6) * 4;
      const answer = totalStudents / 4;
      const q: GeneratedQuestion = {
        problemText: `One-fourth of the ${totalStudents} students in drama club have a speaking part in the school play. How many students have a speaking part?`,
        answer,
        hint: `Draw ${totalStudents} students, then split them into 4 equal groups. One group has a speaking part.`,
        solution: `Step 1: "One-fourth" means divide by 4.\nStep 2: ${totalStudents} ÷ 4 = ${answer}.\nAnswer: ${answer} students have a speaking part.`,
        njslsStandard: '5.OA.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `"One-fourth" means divide by 4. What is ${totalStudents} ÷ 4?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! ${answer} students have a speaking part!`,
            feedbackIncorrect: `${totalStudents} ÷ 4 = ${answer} students.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: totalStudents, label: 'Students', color: 'amber', highlightCount: answer },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${totalStudents} ÷ 4 = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q13: Animal shelter — multiply chain (kennels × dogs × cups)
  {
    generate: (guided) => {
      const kennels = randInt(4, 9);
      const dogsPerKennel = randInt(2, 5);
      const cupsPerDog = randInt(2, 4);
      const totalDogs = kennels * dogsPerKennel;
      const answer = totalDogs * cupsPerDog;
      const q: GeneratedQuestion = {
        problemText: `At the animal shelter, there are ${kennels} kennels. Each kennel holds ${dogsPerKennel} dogs. Each dog eats ${cupsPerDog} cups of food per day. How many cups of food do all the dogs eat in one day?`,
        answer,
        hint: `Draw the kennels and dogs. First find total dogs, then multiply by cups per dog.`,
        solution: `Step 1: Find total dogs: ${kennels} × ${dogsPerKennel} = ${totalDogs} dogs.\nStep 2: Find total cups: ${totalDogs} × ${cupsPerDog} = ${answer} cups.\nAnswer: All the dogs eat ${answer} cups of food in one day.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total number of dogs. What is ${kennels} × ${dogsPerKennel}?`,
            expectedAnswer: totalDogs,
            feedbackCorrect: `Correct! There are ${totalDogs} dogs total.`,
            feedbackIncorrect: `${kennels} × ${dogsPerKennel} = ${totalDogs} dogs.`,
          },
          {
            instruction: `Now multiply by cups per dog. What is ${totalDogs} × ${cupsPerDog}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The dogs eat ${answer} cups of food!`,
            feedbackIncorrect: `${totalDogs} × ${cupsPerDog} = ${answer} cups.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: kennels, label: 'Kennels', value: `${dogsPerKennel} dogs each`, color: 'amber' },
            { type: 'circle', count: totalDogs, label: 'Dogs', value: `${cupsPerDog} cups each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${kennels} × ${dogsPerKennel} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `${totalDogs} × ${cupsPerDog} = ?`, position: 'below', targetGroup: 1 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q14: Snack stand — divide then subtract
  {
    generate: (guided) => {
      const waterEach = randInt(1, 3);
      const waterCount = 3;
      const waterTotal = waterCount * waterEach;
      const pretzelCost = waterEach + randInt(1, 3);
      const answer = pretzelCost - waterEach;
      const q: GeneratedQuestion = {
        problemText: `At the snack stand, Eli paid $${pretzelCost.toFixed(2)} for a pretzel. He also paid $${waterTotal} total for ${waterCount} bottles of water. How much more did the pretzel cost than one bottle of water?`,
        answer,
        hint: `Draw the pretzel and the bottles of water. First find the cost of one bottle, then compare.`,
        solution: `Step 1: Find cost of one bottle: $${waterTotal} ÷ ${waterCount} = $${waterEach.toFixed(2)}.\nStep 2: Find the difference: $${pretzelCost.toFixed(2)} - $${waterEach.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: The pretzel cost $${answer.toFixed(2)} more.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the cost of one bottle of water. What is $${waterTotal} ÷ ${waterCount}?`,
            expectedAnswer: waterEach,
            feedbackCorrect: `Correct! Each bottle costs $${waterEach.toFixed(2)}.`,
            feedbackIncorrect: `$${waterTotal} ÷ ${waterCount} = $${waterEach.toFixed(2)}.`,
          },
          {
            instruction: `Now find the difference. What is $${pretzelCost.toFixed(2)} - $${waterEach.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The pretzel cost $${answer.toFixed(2)} more!`,
            feedbackIncorrect: `$${pretzelCost.toFixed(2)} - $${waterEach.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: 1, label: 'Pretzel', value: `$${pretzelCost.toFixed(2)}`, color: 'amber' },
            { type: 'rect', count: waterCount, label: 'Water Bottles', value: `$${waterTotal} total`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [1], highlightGroup: 1, annotations: [{ text: `$${waterTotal} ÷ ${waterCount} = ?`, position: 'below', targetGroup: 1 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `$${pretzelCost.toFixed(2)} − $${waterEach.toFixed(2)} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q15: Stickers — divide by students then divide by group size
  {
    generate: (guided) => {
      const groupSize = 2;
      const groupsPerStudent = randInt(2, 5);
      const stickersEach = groupSize * groupsPerStudent;
      const students = randInt(4, 10);
      const totalStickers = students * stickersEach;
      const answer = groupsPerStudent;
      const q: GeneratedQuestion = {
        problemText: `Mrs. Ortega has ${totalStickers} stickers to give equally to ${students} students. Each student puts their stickers into groups of ${groupSize} on their poster. How many groups of stickers will each student make?`,
        answer,
        hint: `Draw the stickers split among students. First find stickers per student, then divide into groups of ${groupSize}.`,
        solution: `Step 1: Stickers per student: ${totalStickers} ÷ ${students} = ${stickersEach} stickers.\nStep 2: Groups per student: ${stickersEach} ÷ ${groupSize} = ${answer} groups.\nAnswer: Each student will make ${answer} groups.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find how many stickers each student gets. What is ${totalStickers} ÷ ${students}?`,
            expectedAnswer: stickersEach,
            feedbackCorrect: `Correct! Each student gets ${stickersEach} stickers.`,
            feedbackIncorrect: `${totalStickers} ÷ ${students} = ${stickersEach} stickers each.`,
          },
          {
            instruction: `Now divide into groups of ${groupSize}. What is ${stickersEach} ÷ ${groupSize}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each student makes ${answer} groups!`,
            feedbackIncorrect: `${stickersEach} ÷ ${groupSize} = ${answer} groups.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: students, label: 'Students', value: `${stickersEach} stickers each`, color: 'amber' },
            { type: 'rect', count: answer, label: 'Groups per Student', value: `${groupSize} per group`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${totalStickers} ÷ ${students} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], highlightGroup: 1, annotations: [{ text: `${stickersEach} ÷ ${groupSize} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q16: Basketball — two-thirds of players
  {
    generate: (guided) => {
      const totalPlayers = randInt(2, 7) * 3;
      const answer = (totalPlayers * 2) / 3;
      const q: GeneratedQuestion = {
        problemText: `Two-thirds of the ${totalPlayers} players on the basketball team attended the morning practice. How many players came to morning practice?`,
        answer,
        hint: `Draw ${totalPlayers} players, split into 3 equal groups. Two of those groups attended practice.`,
        solution: `Step 1: "Two-thirds" means divide by 3, then multiply by 2.\nStep 2: ${totalPlayers} ÷ 3 = ${totalPlayers / 3}.\nStep 3: ${totalPlayers / 3} × 2 = ${answer}.\nAnswer: ${answer} players came to morning practice.`,
        njslsStandard: '5.OA.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `"Two-thirds" means divide by 3, then multiply by 2. What is ${totalPlayers} ÷ 3 × 2?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! ${answer} players attended practice!`,
            feedbackIncorrect: `${totalPlayers} ÷ 3 = ${totalPlayers / 3}, then × 2 = ${answer} players.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: totalPlayers, label: 'Players', color: 'amber', highlightCount: answer },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${totalPlayers} × 2/3 = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q17: Science museum tickets — multiply+multiply+add
  {
    generate: (guided) => {
      const kidCount = randInt(2, 5);
      const kidPrice = randInt(5, 9);
      const adultCount = randInt(1, 3);
      const adultPrice = randInt(8, 14);
      const kidTotal = kidCount * kidPrice;
      const adultTotal = adultCount * adultPrice;
      const answer = kidTotal + adultTotal;
      const q: GeneratedQuestion = {
        problemText: `Tickets to the science museum cost $${kidPrice} for children and $${adultPrice} for adults. The Kim family bought ${kidCount} children's tickets and ${adultCount} adult tickets. How much did the Kim family spend on tickets in all?`,
        answer,
        hint: `Draw two groups: children's tickets and adult tickets. Find the cost of each group, then add.`,
        solution: `Step 1: Children's tickets: ${kidCount} × $${kidPrice} = $${kidTotal}.\nStep 2: Adult tickets: ${adultCount} × $${adultPrice} = $${adultTotal}.\nStep 3: Total: $${kidTotal} + $${adultTotal} = $${answer}.\nAnswer: The Kim family spent $${answer} on tickets.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the children's ticket cost. What is ${kidCount} × $${kidPrice}?`,
            expectedAnswer: kidTotal,
            feedbackCorrect: `Correct! Children's tickets cost $${kidTotal}.`,
            feedbackIncorrect: `${kidCount} × $${kidPrice} = $${kidTotal}.`,
          },
          {
            instruction: `Now find adult tickets (${adultCount} × $${adultPrice} = $${adultTotal}) and add both. What is $${kidTotal} + $${adultTotal}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The Kim family spent $${answer} total!`,
            feedbackIncorrect: `$${kidTotal} + $${adultTotal} = $${answer}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: kidCount, label: "Children's Tickets", value: `$${kidPrice} each`, color: 'amber' },
            { type: 'rect', count: adultCount, label: 'Adult Tickets', value: `$${adultPrice} each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${kidCount} × $${kidPrice} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `$${kidTotal} + $${adultTotal} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q18: Photo album — multiply chain (photos per page × pages)
  {
    generate: (guided) => {
      const rows = 2;
      const perRow = randInt(2, 5);
      const perPage = rows * perRow;
      const pages = randInt(5, 12);
      const answer = perPage * pages;
      const q: GeneratedQuestion = {
        problemText: `Aiden is putting photos into an album. Each page holds ${perPage} photos in ${rows} equal rows. The album has ${pages} pages. How many photos can the album hold in all?`,
        answer,
        hint: `Draw the album pages. Each page holds ${perPage} photos. Multiply by the number of pages.`,
        solution: `Step 1: Each page holds ${perPage} photos (${rows} rows × ${perRow} per row).\nStep 2: Total photos: ${perPage} × ${pages} = ${answer}.\nAnswer: The album can hold ${answer} photos.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `Each page holds ${perPage} photos. How many photos can ${pages} pages hold? What is ${perPage} × ${pages}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! The album holds ${answer} photos!`,
            feedbackIncorrect: `${perPage} × ${pages} = ${answer} photos.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: pages, label: 'Pages', value: `${perPage} photos each`, color: 'amber' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${perPage} × ${pages} = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q19: Craft store — divide then subtract
  {
    generate: (guided) => {
      const canvasEach = randInt(2, 4);
      const canvasCount = 3;
      const canvasTotal = canvasCount * canvasEach;
      const paintCost = canvasEach + randInt(1, 3);
      const answer = paintCost - canvasEach;
      const q: GeneratedQuestion = {
        problemText: `Nadia and her brother went to the craft store. Nadia spent $${paintCost.toFixed(2)} on paint. Her brother spent $${canvasTotal} total on ${canvasCount} canvases. How much more did the paint cost than one canvas?`,
        answer,
        hint: `Draw the paint and the canvases. First find the cost of one canvas, then compare.`,
        solution: `Step 1: Find cost of one canvas: $${canvasTotal} ÷ ${canvasCount} = $${canvasEach.toFixed(2)}.\nStep 2: Find the difference: $${paintCost.toFixed(2)} - $${canvasEach.toFixed(2)} = $${answer.toFixed(2)}.\nAnswer: The paint cost $${answer.toFixed(2)} more than one canvas.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the cost of one canvas. What is $${canvasTotal} ÷ ${canvasCount}?`,
            expectedAnswer: canvasEach,
            feedbackCorrect: `Correct! Each canvas costs $${canvasEach.toFixed(2)}.`,
            feedbackIncorrect: `$${canvasTotal} ÷ ${canvasCount} = $${canvasEach.toFixed(2)}.`,
          },
          {
            instruction: `Now find the difference between the paint and one canvas. What is $${paintCost.toFixed(2)} - $${canvasEach.toFixed(2)}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The difference is $${answer.toFixed(2)}!`,
            feedbackIncorrect: `$${paintCost.toFixed(2)} - $${canvasEach.toFixed(2)} = $${answer.toFixed(2)}.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: 1, label: 'Paint', value: `$${paintCost.toFixed(2)}`, color: 'amber' },
            { type: 'rect', count: canvasCount, label: 'Canvases', value: `$${canvasTotal} total`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [1], highlightGroup: 1, annotations: [{ text: `$${canvasTotal} ÷ ${canvasCount} = ?`, position: 'below', targetGroup: 1 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `$${paintCost.toFixed(2)} − $${canvasEach.toFixed(2)} = ?`, position: 'between' }] },
          ],
        };
      }
      return q;
    },
  },
  // Q20: Muffins bake sale — divide into boxes, subtract sold
  {
    generate: (guided) => {
      const perBox = randInt(6, 10);
      const totalBoxes = randInt(4, 8);
      const totalMuffins = perBox * totalBoxes;
      const sold = randInt(1, totalBoxes - 1);
      const remaining = totalBoxes - sold;
      const answer = remaining;
      const q: GeneratedQuestion = {
        problemText: `Mr. Patel baked ${totalMuffins} muffins for the bake sale. He packs them into boxes of ${perBox}. He has already sold ${sold} full boxes. How many boxes does Mr. Patel have left to sell?`,
        answer,
        hint: `Draw the muffins packed into boxes. First find total boxes, then subtract sold boxes.`,
        solution: `Step 1: Find total boxes: ${totalMuffins} ÷ ${perBox} = ${totalBoxes} boxes.\nStep 2: Subtract sold boxes: ${totalBoxes} - ${sold} = ${answer} boxes left.\nAnswer: Mr. Patel has ${answer} boxes left to sell.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find how many boxes in total. What is ${totalMuffins} ÷ ${perBox}?`,
            expectedAnswer: totalBoxes,
            feedbackCorrect: `Correct! There are ${totalBoxes} boxes total.`,
            feedbackIncorrect: `${totalMuffins} ÷ ${perBox} = ${totalBoxes} boxes.`,
          },
          {
            instruction: `Now subtract the sold boxes. What is ${totalBoxes} - ${sold}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Mr. Patel has ${answer} boxes left!`,
            feedbackIncorrect: `${totalBoxes} - ${sold} = ${answer} boxes left.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'rect', count: totalBoxes, label: 'Boxes', value: `${perBox} muffins each`, color: 'amber' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${totalMuffins} ÷ ${perBox} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0], annotations: [{ text: `${totalBoxes} − ${sold} = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q21: Fish aquarium — 1/2 and 1/4 of total, find difference
  {
    generate: (guided) => {
      const totalFish = randInt(2, 6) * 4;
      const goldfish = totalFish / 2;
      const guppies = totalFish / 4;
      const answer = goldfish - guppies;
      const q: GeneratedQuestion = {
        problemText: `One-half of the ${totalFish} fish in the class aquarium are goldfish. One-fourth of the fish are guppies. How many more goldfish are there than guppies?`,
        answer,
        hint: `Draw ${totalFish} fish. Find 1/2 for goldfish and 1/4 for guppies, then subtract.`,
        solution: `Step 1: Goldfish: ${totalFish} ÷ 2 = ${goldfish}.\nStep 2: Guppies: ${totalFish} ÷ 4 = ${guppies}.\nStep 3: Difference: ${goldfish} - ${guppies} = ${answer}.\nAnswer: There are ${answer} more goldfish than guppies.`,
        njslsStandard: '5.OA.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the goldfish (1/2 of ${totalFish} = ${goldfish}) and guppies (1/4 of ${totalFish} = ${guppies}). What is ${goldfish} - ${guppies}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Correct! There are ${answer} more goldfish than guppies!`,
            feedbackIncorrect: `${goldfish} - ${guppies} = ${answer} more goldfish.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: totalFish, label: 'Fish', color: 'amber', highlightCount: goldfish },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${goldfish} goldfish − ${guppies} guppies = ?`, position: 'below', targetGroup: 0 }] },
          ],
        };
      }
      return q;
    },
  },
  // Q22: Bowling — spares and strikes, multiply+multiply+add
  {
    generate: (guided) => {
      const spares = randInt(2, 6);
      const sparePoints = 10;
      const strikes = randInt(1, 5);
      const strikePoints = 30;
      const spareTotal = spares * sparePoints;
      const strikeTotal = strikes * strikePoints;
      const answer = spareTotal + strikeTotal;
      const q: GeneratedQuestion = {
        problemText: `At the bowling alley, players earn ${sparePoints} points for a spare and ${strikePoints} points for a strike. During his game, Devon got ${spares} spares and ${strikes} strikes. How many points did Devon earn in all?`,
        answer,
        hint: `Draw two groups: spares and strikes. Find the points from each, then add them together.`,
        solution: `Step 1: Spare points: ${spares} × ${sparePoints} = ${spareTotal} points.\nStep 2: Strike points: ${strikes} × ${strikePoints} = ${strikeTotal} points.\nStep 3: Total: ${spareTotal} + ${strikeTotal} = ${answer} points.\nAnswer: Devon earned ${answer} points.`,
        njslsStandard: '4.OA.A.3',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the spare points. What is ${spares} × ${sparePoints}?`,
            expectedAnswer: spareTotal,
            feedbackCorrect: `Correct! ${spares} × ${sparePoints} = ${spareTotal} points from spares.`,
            feedbackIncorrect: `${spares} × ${sparePoints} = ${spareTotal} points.`,
          },
          {
            instruction: `Now find strike points (${strikes} × ${strikePoints} = ${strikeTotal}) and add both. What is ${spareTotal} + ${strikeTotal}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Devon earned ${answer} points total!`,
            feedbackIncorrect: `${spareTotal} + ${strikeTotal} = ${answer} points.`,
          },
        ];
        q.diagram = {
          groups: [
            { type: 'circle', count: spares, label: 'Spares', value: `${sparePoints} pts each`, color: 'amber' },
            { type: 'circle', count: strikes, label: 'Strikes', value: `${strikePoints} pts each`, color: 'teal' },
          ],
          stepStates: [
            { visibleGroups: [0], highlightGroup: 0, annotations: [{ text: `${spares} × ${sparePoints} = ?`, position: 'below', targetGroup: 0 }] },
            { visibleGroups: [0, 1], annotations: [{ text: `${spareTotal} + ${strikeTotal} = ?`, position: 'between' }] },
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

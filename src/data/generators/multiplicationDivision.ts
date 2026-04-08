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
  // Q1: Wall painting — cm to mm (division + conversion)
  {
    generate: (guided) => {
      const sections = randInt(2, 6);
      const heightCm = sections * randInt(80, 150);
      const perSectionCm = heightCm / sections;
      const answer = perSectionCm * 10;
      const q: GeneratedQuestion = {
        problemText: `Mr. Grimes is painting a wall in the cafeteria. He uses different colored paint to make ${sections} sections that are all the same height. The wall is ${heightCm} centimeters tall. How many millimeters tall is each section?`,
        answer,
        hint: `First divide the total height by the number of sections, then convert centimeters to millimeters (1 cm = 10 mm).`,
        solution: `Step 1: Divide the wall height by the number of sections: ${heightCm} cm ÷ ${sections} = ${perSectionCm} cm per section.\nStep 2: Convert centimeters to millimeters (1 cm = 10 mm): ${perSectionCm} cm × 10 = ${answer} mm.\nAnswer: Each section is ${answer} millimeters tall.`,
        njslsStandard: '4.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, divide the wall height by the number of sections. What is ${heightCm} ÷ ${sections}?`,
            expectedAnswer: perSectionCm,
            feedbackCorrect: `Correct! Each section is ${perSectionCm} cm tall.`,
            feedbackIncorrect: `${heightCm} ÷ ${sections} = ${perSectionCm} cm per section.`,
            highlights: [`${heightCm} centimeters`, 'millimeters'],
          },
          {
            instruction: `Now convert ${perSectionCm} centimeters to millimeters. Remember: 1 cm = 10 mm. What is ${perSectionCm} × 10?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${perSectionCm} cm = ${answer} mm!`,
            feedbackIncorrect: `${perSectionCm} × 10 = ${answer} mm.`,
            highlights: [`${heightCm} centimeters`, 'millimeters'],
          },
        ];
      }
      return q;
    },
  },
  // Q2: Road trip — minutes to hours (multiplication + conversion)
  {
    generate: (guided) => {
      const minutesPerSong = randInt(3, 5);
      const songs = randInt(10, 30) * (60 / minutesPerSong);
      const totalMinutes = minutesPerSong * songs;
      const answer = totalMinutes / 60;
      const q: GeneratedQuestion = {
        problemText: `Francesca, Georgia, and Archie went on a road trip and played great music the whole drive. The average song lasted ${minutesPerSong} minutes and they played ${songs} songs without repeats. All the great music made the hours fly by! How long was their trip in hours?`,
        answer,
        hint: `First multiply the number of songs by the minutes per song, then convert minutes to hours (60 minutes = 1 hour).`,
        solution: `Step 1: Find the total minutes of music: ${songs} songs × ${minutesPerSong} minutes = ${totalMinutes} minutes.\nStep 2: Convert minutes to hours (60 minutes = 1 hour): ${totalMinutes} ÷ 60 = ${answer} hours.\nAnswer: Their trip was ${answer} hours long.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total minutes of music. What is ${songs} × ${minutesPerSong}?`,
            expectedAnswer: totalMinutes,
            feedbackCorrect: `Correct! ${songs} × ${minutesPerSong} = ${totalMinutes} minutes of music.`,
            feedbackIncorrect: `${songs} × ${minutesPerSong} = ${totalMinutes} minutes.`,
            highlights: [`${minutesPerSong} minutes`, 'hours'],
          },
          {
            instruction: `Now convert ${totalMinutes} minutes to hours. What is ${totalMinutes} ÷ 60?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The trip was ${answer} hours long!`,
            feedbackIncorrect: `${totalMinutes} ÷ 60 = ${answer} hours.`,
            highlights: [`${minutesPerSong} minutes`, 'hours'],
          },
        ];
      }
      return q;
    },
  },
  // Q3: Cherries — pounds to ounces then subtract
  {
    generate: (guided) => {
      const pounds = randInt(2, 5);
      const ateOunces = randInt(3, 10);
      const totalOunces = pounds * 16;
      const answer = totalOunces - ateOunces;
      const q: GeneratedQuestion = {
        problemText: `Lamar's neighbors gave him ${pounds} pounds of cherries from the trees in their backyard. Lamar ate ${ateOunces} ounces that same day. How many ounces of cherries does Lamar have left?`,
        answer,
        hint: `First convert pounds to ounces (1 pound = 16 ounces), then subtract what he ate.`,
        solution: `Step 1: Convert pounds to ounces (1 pound = 16 ounces): ${pounds} × 16 = ${totalOunces} ounces.\nStep 2: Subtract the ounces Lamar ate: ${totalOunces} - ${ateOunces} = ${answer} ounces.\nAnswer: Lamar has ${answer} ounces of cherries left.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${pounds} pounds to ounces. Remember: 1 pound = 16 ounces. What is ${pounds} × 16?`,
            expectedAnswer: totalOunces,
            feedbackCorrect: `Correct! ${pounds} pounds = ${totalOunces} ounces.`,
            feedbackIncorrect: `${pounds} × 16 = ${totalOunces} ounces.`,
            highlights: [`${pounds} pounds`, `${ateOunces} ounces`, 'ounces of cherries'],
          },
          {
            instruction: `Now subtract the ounces Lamar ate. What is ${totalOunces} - ${ateOunces}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Lamar has ${answer} ounces left!`,
            feedbackIncorrect: `${totalOunces} - ${ateOunces} = ${answer} ounces left.`,
            highlights: [`${pounds} pounds`, `${ateOunces} ounces`, 'ounces of cherries'],
          },
        ];
      }
      return q;
    },
  },
  // Q4: Crocodile — meters to centimeters (division + conversion)
  {
    generate: (guided) => {
      const timesBigger = randInt(2, 5);
      const todayMeters = randInt(2, 5);
      const prehistoricMeters = todayMeters * timesBigger;
      const answer = todayMeters * 100;
      const q: GeneratedQuestion = {
        problemText: `Irene's class is taking a field trip to the Museum of Historical Sciences. According to their tour guide, scientists think prehistoric crocodiles were up to ${prehistoricMeters} meters long. This is ${timesBigger} times the size of present-day crocodiles! About how many centimeters long is a typical crocodile today?`,
        answer,
        hint: `First divide the prehistoric length by ${timesBigger} to find today's size in meters, then convert to centimeters (1 meter = 100 cm).`,
        solution: `Step 1: Find today's crocodile length in meters: ${prehistoricMeters} ÷ ${timesBigger} = ${todayMeters} meters.\nStep 2: Convert meters to centimeters (1 meter = 100 cm): ${todayMeters} × 100 = ${answer} cm.\nAnswer: A typical crocodile today is about ${answer} centimeters long.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find today's crocodile length. What is ${prehistoricMeters} ÷ ${timesBigger}?`,
            expectedAnswer: todayMeters,
            feedbackCorrect: `Correct! Today's crocodile is ${todayMeters} meters long.`,
            feedbackIncorrect: `${prehistoricMeters} ÷ ${timesBigger} = ${todayMeters} meters.`,
            highlights: [`${prehistoricMeters} meters`, 'centimeters'],
          },
          {
            instruction: `Now convert ${todayMeters} meters to centimeters. What is ${todayMeters} × 100?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${todayMeters} meters = ${answer} centimeters!`,
            feedbackIncorrect: `${todayMeters} × 100 = ${answer} centimeters.`,
            highlights: [`${prehistoricMeters} meters`, 'centimeters'],
          },
        ];
      }
      return q;
    },
  },
  // Q5: Road construction — km to meters then divide
  {
    generate: (guided) => {
      const sections = pick([4, 5, 8, 10]);
      const km = randInt(2, 5);
      const totalMeters = km * 1000;
      const answer = totalMeters / sections;
      const q: GeneratedQuestion = {
        problemText: `A road construction crew built a ${km}-kilometer stretch of road. They divided it into ${sections} equal sections for paving. How many meters long is each section?`,
        answer,
        hint: `First convert kilometers to meters (1 km = 1000 meters), then divide by the number of sections.`,
        solution: `Step 1: Convert kilometers to meters (1 km = 1000 m): ${km} × 1000 = ${totalMeters} meters.\nStep 2: Divide by the number of sections: ${totalMeters} ÷ ${sections} = ${answer} meters per section.\nAnswer: Each section is ${answer} meters long.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${km} kilometers to meters. What is ${km} × 1000?`,
            expectedAnswer: totalMeters,
            feedbackCorrect: `Correct! ${km} km = ${totalMeters} meters.`,
            feedbackIncorrect: `${km} × 1000 = ${totalMeters} meters.`,
            highlights: [`${km}-kilometer`, 'meters'],
          },
          {
            instruction: `Now divide by the number of sections. What is ${totalMeters} ÷ ${sections}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Each section is ${answer} meters long!`,
            feedbackIncorrect: `${totalMeters} ÷ ${sections} = ${answer} meters.`,
            highlights: [`${km}-kilometer`, 'meters'],
          },
        ];
      }
      return q;
    },
  },
  // Q6: Water slide — km to meters then subtract
  {
    generate: (guided) => {
      const actualMeters = randInt(20, 50);
      const answer = 1000 - actualMeters;
      const q: GeneratedQuestion = {
        problemText: `Marco went to a water park with his cousins. The tallest water slide at the park was ${actualMeters} meters high. When his mom picked him up at the end of the day, he told her that he rode a water slide that seemed to be a kilometer high! By how many meters did Marco exaggerate the height of the water slide?`,
        answer,
        hint: `First convert 1 kilometer to meters (1 km = 1000 meters), then subtract the actual height.`,
        solution: `Step 1: Convert 1 kilometer to meters: 1 km = 1000 meters.\nStep 2: Subtract the actual height: 1000 - ${actualMeters} = ${answer} meters.\nAnswer: Marco exaggerated by ${answer} meters.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert 1 kilometer to meters. How many meters is 1 kilometer?`,
            expectedAnswer: 1000,
            feedbackCorrect: `Correct! 1 kilometer = 1000 meters.`,
            feedbackIncorrect: `1 kilometer = 1000 meters.`,
            highlights: [`${actualMeters} meters`, 'kilometer', 'meters'],
          },
          {
            instruction: `Now subtract the actual height. What is 1000 - ${actualMeters}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Marco exaggerated by ${answer} meters!`,
            feedbackIncorrect: `1000 - ${actualMeters} = ${answer} meters.`,
            highlights: [`${actualMeters} meters`, 'kilometer', 'meters'],
          },
        ];
      }
      return q;
    },
  },
  // Q7: Dog bath — gallons to quarts then subtract
  {
    generate: (guided) => {
      const gallons = randInt(2, 5);
      const leftoverQuarts = randInt(1, 4);
      const totalQuarts = gallons * 4;
      const answer = totalQuarts - leftoverQuarts;
      const q: GeneratedQuestion = {
        problemText: `Justin filled a large bucket with ${gallons} gallons of water to give his dog, Spot, a bath outside. When he finished, there were ${leftoverQuarts} quarts of water left in the bucket. How many quarts of water did Justin use to bathe Spot?`,
        answer,
        hint: `First convert gallons to quarts (1 gallon = 4 quarts), then subtract what was left.`,
        solution: `Step 1: Convert gallons to quarts (1 gallon = 4 quarts): ${gallons} × 4 = ${totalQuarts} quarts.\nStep 2: Subtract what was left: ${totalQuarts} - ${leftoverQuarts} = ${answer} quarts.\nAnswer: Justin used ${answer} quarts of water.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${gallons} gallons to quarts. Remember: 1 gallon = 4 quarts. What is ${gallons} × 4?`,
            expectedAnswer: totalQuarts,
            feedbackCorrect: `Correct! ${gallons} gallons = ${totalQuarts} quarts.`,
            feedbackIncorrect: `${gallons} × 4 = ${totalQuarts} quarts.`,
            highlights: [`${gallons} gallons`, `${leftoverQuarts} quarts`, 'quarts of water'],
          },
          {
            instruction: `Now subtract the leftover water. What is ${totalQuarts} - ${leftoverQuarts}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Justin used ${answer} quarts!`,
            feedbackIncorrect: `${totalQuarts} - ${leftoverQuarts} = ${answer} quarts.`,
            highlights: [`${gallons} gallons`, `${leftoverQuarts} quarts`, 'quarts of water'],
          },
        ];
      }
      return q;
    },
  },
  // Q8: 5K race — km to meters then subtract
  {
    generate: (guided) => {
      const km = randInt(3, 6);
      const totalM = km * 1000;
      const ranM = randInt(1000, totalM - 500);
      const answer = totalM - ranM;
      const q: GeneratedQuestion = {
        problemText: `Camila is running a ${km}-kilometer race for charity. So far she has run ${ranM.toLocaleString()} meters. How many more meters does she have left to run?`,
        answer,
        hint: `First convert ${km} kilometers to meters (1 km = 1000 meters), then subtract how far she has run.`,
        solution: `Step 1: Convert kilometers to meters: ${km} × 1000 = ${totalM.toLocaleString()} meters.\nStep 2: Subtract meters already run: ${totalM.toLocaleString()} - ${ranM.toLocaleString()} = ${answer.toLocaleString()} meters.\nAnswer: Camila has ${answer.toLocaleString()} meters left.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${km} kilometers to meters. What is ${km} × 1000?`,
            expectedAnswer: totalM,
            feedbackCorrect: `Correct! ${km} km = ${totalM.toLocaleString()} meters.`,
            feedbackIncorrect: `${km} × 1000 = ${totalM.toLocaleString()} meters.`,
            highlights: [`${km}-kilometer`, 'meters'],
          },
          {
            instruction: `Now subtract how far she has run. What is ${totalM.toLocaleString()} - ${ranM.toLocaleString()}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Camila has ${answer.toLocaleString()} meters left!`,
            feedbackIncorrect: `${totalM.toLocaleString()} - ${ranM.toLocaleString()} = ${answer.toLocaleString()} meters.`,
            highlights: [`${km}-kilometer`, 'meters'],
          },
        ];
      }
      return q;
    },
  },
  // Q9: Shrimp — pounds to ounces then subtract
  {
    generate: (guided) => {
      const pounds = randInt(3, 6);
      const usedOz = randInt(15, 40);
      const totalOz = pounds * 16;
      const answer = totalOz - usedOz;
      const q: GeneratedQuestion = {
        problemText: `A chef bought ${pounds} pounds of shrimp for a dinner party. She used ${usedOz} ounces of shrimp for the main dish. How many ounces of shrimp does she have left?`,
        answer,
        hint: `First convert pounds to ounces (1 pound = 16 ounces), then subtract what she used.`,
        solution: `Step 1: Convert pounds to ounces: ${pounds} × 16 = ${totalOz} ounces.\nStep 2: Subtract what was used: ${totalOz} - ${usedOz} = ${answer} ounces.\nAnswer: She has ${answer} ounces of shrimp left.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${pounds} pounds to ounces. Remember: 1 pound = 16 ounces. What is ${pounds} × 16?`,
            expectedAnswer: totalOz,
            feedbackCorrect: `Correct! ${pounds} pounds = ${totalOz} ounces.`,
            feedbackIncorrect: `${pounds} × 16 = ${totalOz} ounces.`,
            highlights: [`${pounds} pounds`, `${usedOz} ounces`],
          },
          {
            instruction: `Now subtract the ounces used. What is ${totalOz} - ${usedOz}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! She has ${answer} ounces left!`,
            feedbackIncorrect: `${totalOz} - ${usedOz} = ${answer} ounces.`,
            highlights: [`${pounds} pounds`, `${usedOz} ounces`],
          },
        ];
      }
      return q;
    },
  },
  // Q10: Swimming pool — multiply lengths then convert m to cm
  {
    generate: (guided) => {
      const poolLength = randInt(20, 50);
      const lengths = randInt(8, 20);
      const totalM = poolLength * lengths;
      const answer = totalM * 100;
      const q: GeneratedQuestion = {
        problemText: `The Garfield Elementary swimming pool is ${poolLength} meters long. During swim practice, Diego swam ${lengths} lengths of the pool. How many centimeters did Diego swim in all?`,
        answer,
        hint: `First multiply the pool length by the number of lengths to get total meters, then convert to centimeters (1 m = 100 cm).`,
        solution: `Step 1: Find total meters: ${poolLength} × ${lengths} = ${totalM} meters.\nStep 2: Convert to centimeters: ${totalM} × 100 = ${answer.toLocaleString()} cm.\nAnswer: Diego swam ${answer.toLocaleString()} centimeters.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the total meters swum. What is ${poolLength} × ${lengths}?`,
            expectedAnswer: totalM,
            feedbackCorrect: `Correct! Diego swam ${totalM} meters.`,
            feedbackIncorrect: `${poolLength} × ${lengths} = ${totalM} meters.`,
            highlights: [`${poolLength} meters`, 'centimeters'],
          },
          {
            instruction: `Now convert ${totalM} meters to centimeters. What is ${totalM} × 100?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${totalM} meters = ${answer.toLocaleString()} centimeters!`,
            feedbackIncorrect: `${totalM} × 100 = ${answer.toLocaleString()} centimeters.`,
            highlights: [`${poolLength} meters`, 'centimeters'],
          },
        ];
      }
      return q;
    },
  },
  // Q11: Movie previews — hours to minutes then add
  {
    generate: (guided) => {
      const hours = randInt(1, 3);
      const previewMin = randInt(10, 25);
      const movieMin = hours * 60;
      const answer = movieMin + previewMin;
      const q: GeneratedQuestion = {
        problemText: `A movie is ${hours} hours long. The theater plays ${previewMin} minutes of previews before the movie starts. How many total minutes will pass from the start of the previews to the end of the movie?`,
        answer,
        hint: `First convert the movie length from hours to minutes (1 hour = 60 minutes), then add the preview time.`,
        solution: `Step 1: Convert hours to minutes: ${hours} × 60 = ${movieMin} minutes.\nStep 2: Add preview time: ${movieMin} + ${previewMin} = ${answer} minutes.\nAnswer: ${answer} total minutes will pass.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert the movie length to minutes. What is ${hours} × 60?`,
            expectedAnswer: movieMin,
            feedbackCorrect: `Correct! ${hours} hours = ${movieMin} minutes.`,
            feedbackIncorrect: `${hours} × 60 = ${movieMin} minutes.`,
            highlights: [`${hours} hours`, `${previewMin} minutes`, 'minutes'],
          },
          {
            instruction: `Now add the preview time. What is ${movieMin} + ${previewMin}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} total minutes!`,
            feedbackIncorrect: `${movieMin} + ${previewMin} = ${answer} minutes.`,
            highlights: [`${hours} hours`, `${previewMin} minutes`, 'minutes'],
          },
        ];
      }
      return q;
    },
  },
  // Q12: Lemonade picnic — gallons to quarts then subtract
  {
    generate: (guided) => {
      const gallons = randInt(2, 5);
      const drankQt = randInt(3, gallons * 4 - 1);
      const totalQt = gallons * 4;
      const answer = totalQt - drankQt;
      const q: GeneratedQuestion = {
        problemText: `Mrs. Patel bought ${gallons} gallons of lemonade for the school picnic. The students drank ${drankQt} quarts of it. How many quarts of lemonade were left over?`,
        answer,
        hint: `First convert gallons to quarts (1 gallon = 4 quarts), then subtract what was consumed.`,
        solution: `Step 1: Convert gallons to quarts: ${gallons} × 4 = ${totalQt} quarts.\nStep 2: Subtract quarts consumed: ${totalQt} - ${drankQt} = ${answer} quarts.\nAnswer: ${answer} quarts were left over.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${gallons} gallons to quarts. What is ${gallons} × 4?`,
            expectedAnswer: totalQt,
            feedbackCorrect: `Correct! ${gallons} gallons = ${totalQt} quarts.`,
            feedbackIncorrect: `${gallons} × 4 = ${totalQt} quarts.`,
            highlights: [`${gallons} gallons`, `${drankQt} quarts`, 'quarts'],
          },
          {
            instruction: `Now subtract what was consumed. What is ${totalQt} - ${drankQt}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! ${answer} quarts were left over!`,
            feedbackIncorrect: `${totalQt} - ${drankQt} = ${answer} quarts.`,
            highlights: [`${gallons} gallons`, `${drankQt} quarts`, 'quarts'],
          },
        ];
      }
      return q;
    },
  },
  // Q13: Trail markers — km to meters then divide by spacing
  {
    generate: (guided) => {
      const spacing = pick([250, 500]);
      const markers = randInt(4, 12);
      const totalM = spacing * markers;
      const km = totalM / 1000;
      const answer = markers;
      const q: GeneratedQuestion = {
        problemText: `A hiking trail is ${km} kilometers long. Trail markers are placed every ${spacing} meters along the path. How many trail markers are there, not counting the one at the very start of the trail?`,
        answer,
        hint: `First convert kilometers to meters (1 km = 1000 m), then divide by the spacing between markers.`,
        solution: `Step 1: Convert to meters: ${km} × 1000 = ${totalM.toLocaleString()} meters.\nStep 2: Divide by spacing: ${totalM.toLocaleString()} ÷ ${spacing} = ${answer} markers.\nAnswer: There are ${answer} trail markers (not counting the start).`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${km} kilometers to meters. What is ${km} × 1000?`,
            expectedAnswer: totalM,
            feedbackCorrect: `Correct! ${km} km = ${totalM.toLocaleString()} meters.`,
            feedbackIncorrect: `${km} × 1000 = ${totalM.toLocaleString()} meters.`,
            highlights: [`${km} kilometers`, `${spacing} meters`],
          },
          {
            instruction: `Now divide by the spacing. What is ${totalM.toLocaleString()} ÷ ${spacing}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! There are ${answer} trail markers!`,
            feedbackIncorrect: `${totalM.toLocaleString()} ÷ ${spacing} = ${answer} markers.`,
            highlights: [`${km} kilometers`, `${spacing} meters`],
          },
        ];
      }
      return q;
    },
  },
  // Q14: Baby elephant — kg to grams, find shortfall
  {
    generate: (guided) => {
      const startKg = randInt(100, 150);
      const gainKg = randInt(70, 100);
      const endKg = startKg + gainKg;
      const goalG = (gainKg + randInt(1, 10)) * 1000;
      const gainG = gainKg * 1000;
      const answer = goalG - gainG;
      const q: GeneratedQuestion = {
        problemText: `A baby elephant weighed ${startKg} kilograms at birth. By its first birthday it weighed ${endKg} kilograms. The zoo vet said a healthy baby elephant should gain about ${goalG.toLocaleString()} grams in its first year. By how many grams did this elephant fall short of the healthy goal?`,
        answer,
        hint: `First find the gain in kg (${endKg} - ${startKg}), then convert to grams (1 kg = 1000 g), then subtract from the goal.`,
        solution: `Step 1: Find the gain: ${endKg} - ${startKg} = ${gainKg} kg.\nStep 2: Convert to grams: ${gainKg} × 1000 = ${gainG.toLocaleString()} grams.\nStep 3: Find shortfall: ${goalG.toLocaleString()} - ${gainG.toLocaleString()} = ${answer.toLocaleString()} grams.\nAnswer: The elephant fell short by ${answer.toLocaleString()} grams.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, find the weight gained and convert to grams. Gain: ${endKg} - ${startKg} = ${gainKg} kg. What is ${gainKg} × 1000?`,
            expectedAnswer: gainG,
            feedbackCorrect: `Correct! ${gainKg} kg = ${gainG.toLocaleString()} grams.`,
            feedbackIncorrect: `${gainKg} × 1000 = ${gainG.toLocaleString()} grams.`,
            highlights: [`${startKg} kilograms`, `${endKg} kilograms`, `${goalG.toLocaleString()} grams`],
          },
          {
            instruction: `Now find the shortfall. What is ${goalG.toLocaleString()} - ${gainG.toLocaleString()}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The elephant fell short by ${answer.toLocaleString()} grams!`,
            feedbackIncorrect: `${goalG.toLocaleString()} - ${gainG.toLocaleString()} = ${answer.toLocaleString()} grams.`,
            highlights: [`${startKg} kilograms`, `${endKg} kilograms`, `${goalG.toLocaleString()} grams`],
          },
        ];
      }
      return q;
    },
  },
  // Q15: Fence — meters to cm then subtract
  {
    generate: (guided) => {
      const meters = randInt(6, 12);
      const haveCm = randInt(200, 600);
      const totalCm = meters * 100;
      const answer = totalCm - haveCm;
      const q: GeneratedQuestion = {
        problemText: `Owen's dad is building a fence around their backyard. He needs ${meters} meters of fencing in total. He already has ${haveCm} centimeters of fencing in the garage. How many more centimeters of fencing does he need to buy?`,
        answer,
        hint: `First convert meters to centimeters (1 m = 100 cm), then subtract what he already has.`,
        solution: `Step 1: Convert meters to centimeters: ${meters} × 100 = ${totalCm} cm.\nStep 2: Subtract what he has: ${totalCm} - ${haveCm} = ${answer} cm.\nAnswer: He needs to buy ${answer} more centimeters of fencing.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${meters} meters to centimeters. What is ${meters} × 100?`,
            expectedAnswer: totalCm,
            feedbackCorrect: `Correct! ${meters} meters = ${totalCm} centimeters.`,
            feedbackIncorrect: `${meters} × 100 = ${totalCm} centimeters.`,
            highlights: [`${meters} meters`, `${haveCm} centimeters`, 'centimeters'],
          },
          {
            instruction: `Now subtract what he already has. What is ${totalCm} - ${haveCm}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! He needs ${answer} more centimeters!`,
            feedbackIncorrect: `${totalCm} - ${haveCm} = ${answer} centimeters.`,
            highlights: [`${meters} meters`, `${haveCm} centimeters`, 'centimeters'],
          },
        ];
      }
      return q;
    },
  },
  // Q16: Potato recipe — pounds to ounces then find deficit
  {
    generate: (guided) => {
      const pounds = randInt(2, 5);
      const hasOz = randInt(20, pounds * 16 - 5);
      const totalOz = pounds * 16;
      const answer = totalOz - hasOz;
      const q: GeneratedQuestion = {
        problemText: `A recipe calls for ${pounds} pounds of potatoes. Destiny only has a kitchen scale that measures in ounces. She has ${hasOz} ounces of potatoes in her pantry. How many more ounces does she need to have enough for the recipe?`,
        answer,
        hint: `First convert pounds to ounces (1 pound = 16 ounces), then subtract what she has.`,
        solution: `Step 1: Convert pounds to ounces: ${pounds} × 16 = ${totalOz} ounces.\nStep 2: Subtract what she has: ${totalOz} - ${hasOz} = ${answer} ounces.\nAnswer: Destiny needs ${answer} more ounces.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${pounds} pounds to ounces. What is ${pounds} × 16?`,
            expectedAnswer: totalOz,
            feedbackCorrect: `Correct! ${pounds} pounds = ${totalOz} ounces.`,
            feedbackIncorrect: `${pounds} × 16 = ${totalOz} ounces.`,
            highlights: [`${pounds} pounds`, `${hasOz} ounces`, 'ounces'],
          },
          {
            instruction: `Now subtract what she has. What is ${totalOz} - ${hasOz}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Destiny needs ${answer} more ounces!`,
            feedbackIncorrect: `${totalOz} - ${hasOz} = ${answer} ounces.`,
            highlights: [`${pounds} pounds`, `${hasOz} ounces`, 'ounces'],
          },
        ];
      }
      return q;
    },
  },
  // Q17: Hallway mopping — meters to cm then divide
  {
    generate: (guided) => {
      const sectionCm = pick([400, 500, 600]);
      const sections = randInt(5, 15);
      const totalCm = sections * sectionCm;
      const meters = totalCm / 100;
      const answer = sections;
      const q: GeneratedQuestion = {
        problemText: `The school hallway is ${meters} meters long. A custodian mops it in sections of ${sectionCm} centimeters each. How many sections does he mop to clean the entire hallway?`,
        answer,
        hint: `First convert meters to centimeters (1 m = 100 cm), then divide by the section length.`,
        solution: `Step 1: Convert meters to centimeters: ${meters} × 100 = ${totalCm.toLocaleString()} cm.\nStep 2: Divide by section size: ${totalCm.toLocaleString()} ÷ ${sectionCm} = ${answer} sections.\nAnswer: He mops ${answer} sections.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${meters} meters to centimeters. What is ${meters} × 100?`,
            expectedAnswer: totalCm,
            feedbackCorrect: `Correct! ${meters} meters = ${totalCm.toLocaleString()} centimeters.`,
            feedbackIncorrect: `${meters} × 100 = ${totalCm.toLocaleString()} centimeters.`,
            highlights: [`${meters} meters`, `${sectionCm} centimeters`],
          },
          {
            instruction: `Now divide by the section length. What is ${totalCm.toLocaleString()} ÷ ${sectionCm}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! He mops ${answer} sections!`,
            feedbackIncorrect: `${totalCm.toLocaleString()} ÷ ${sectionCm} = ${answer} sections.`,
            highlights: [`${meters} meters`, `${sectionCm} centimeters`],
          },
        ];
      }
      return q;
    },
  },
  // Q18: Fish tank — gallons to quarts then find deficit
  {
    generate: (guided) => {
      const gallons = randInt(6, 12);
      const hasQt = randInt(15, gallons * 4 - 2);
      const totalQt = gallons * 4;
      const answer = totalQt - hasQt;
      const q: GeneratedQuestion = {
        problemText: `Nora's fish tank holds ${gallons} gallons of water. After cleaning it, she had only refilled it with ${hasQt} quarts. How many more quarts does she need to add to fill the tank completely?`,
        answer,
        hint: `First convert gallons to quarts (1 gallon = 4 quarts), then subtract what she has added.`,
        solution: `Step 1: Convert gallons to quarts: ${gallons} × 4 = ${totalQt} quarts.\nStep 2: Subtract quarts added: ${totalQt} - ${hasQt} = ${answer} quarts.\nAnswer: Nora needs to add ${answer} more quarts.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${gallons} gallons to quarts. What is ${gallons} × 4?`,
            expectedAnswer: totalQt,
            feedbackCorrect: `Correct! ${gallons} gallons = ${totalQt} quarts.`,
            feedbackIncorrect: `${gallons} × 4 = ${totalQt} quarts.`,
            highlights: [`${gallons} gallons`, `${hasQt} quarts`, 'quarts'],
          },
          {
            instruction: `Now subtract what she has added. What is ${totalQt} - ${hasQt}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Nora needs ${answer} more quarts!`,
            feedbackIncorrect: `${totalQt} - ${hasQt} = ${answer} quarts.`,
            highlights: [`${gallons} gallons`, `${hasQt} quarts`, 'quarts'],
          },
        ];
      }
      return q;
    },
  },
  // Q19: Carpenter board — meters to cm then subtract two cuts
  {
    generate: (guided) => {
      const meters = randInt(2, 5);
      const cutLength = randInt(60, 100);
      const cutCount = 2;
      const totalCm = meters * 100;
      const totalCut = cutCount * cutLength;
      const answer = totalCm - totalCut;
      const q: GeneratedQuestion = {
        problemText: `A carpenter has a wooden board that is ${meters} meters long. He cuts off two pieces that are each ${cutLength} centimeters long. How many centimeters of board does he have left?`,
        answer,
        hint: `First convert meters to centimeters (1 m = 100 cm), then subtract both cuts.`,
        solution: `Step 1: Convert meters to centimeters: ${meters} × 100 = ${totalCm} cm.\nStep 2: Find total cut: 2 × ${cutLength} = ${totalCut} cm.\nStep 3: Subtract: ${totalCm} - ${totalCut} = ${answer} cm.\nAnswer: He has ${answer} centimeters of board left.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${meters} meters to centimeters. What is ${meters} × 100?`,
            expectedAnswer: totalCm,
            feedbackCorrect: `Correct! ${meters} meters = ${totalCm} centimeters.`,
            feedbackIncorrect: `${meters} × 100 = ${totalCm} centimeters.`,
            highlights: [`${meters} meters`, `${cutLength} centimeters`, 'centimeters'],
          },
          {
            instruction: `Now subtract both cuts (2 × ${cutLength} = ${totalCut}). What is ${totalCm} - ${totalCut}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! He has ${answer} centimeters left!`,
            feedbackIncorrect: `${totalCm} - ${totalCut} = ${answer} centimeters.`,
            highlights: [`${meters} meters`, `${cutLength} centimeters`, 'centimeters'],
          },
        ];
      }
      return q;
    },
  },
  // Q20: Piano practice — hours to minutes then add
  {
    generate: (guided) => {
      const hours = randInt(1, 3);
      const extraMin = randInt(15, 50);
      const hoursMin = hours * 60;
      const answer = hoursMin + extraMin;
      const q: GeneratedQuestion = {
        problemText: `Serena practiced piano for ${hours} hours on Saturday and ${extraMin} minutes on Sunday. How many total minutes did she practice over the weekend?`,
        answer,
        hint: `First convert Saturday's hours to minutes (1 hour = 60 minutes), then add Sunday's minutes.`,
        solution: `Step 1: Convert hours to minutes: ${hours} × 60 = ${hoursMin} minutes.\nStep 2: Add Sunday's time: ${hoursMin} + ${extraMin} = ${answer} minutes.\nAnswer: Serena practiced ${answer} minutes total.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${hours} hours to minutes. What is ${hours} × 60?`,
            expectedAnswer: hoursMin,
            feedbackCorrect: `Correct! ${hours} hours = ${hoursMin} minutes.`,
            feedbackIncorrect: `${hours} × 60 = ${hoursMin} minutes.`,
            highlights: [`${hours} hours`, `${extraMin} minutes`, 'minutes'],
          },
          {
            instruction: `Now add Sunday's minutes. What is ${hoursMin} + ${extraMin}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Serena practiced ${answer} minutes total!`,
            feedbackIncorrect: `${hoursMin} + ${extraMin} = ${answer} minutes.`,
            highlights: [`${hours} hours`, `${extraMin} minutes`, 'minutes'],
          },
        ];
      }
      return q;
    },
  },
  // Q21: Truck blueberries — pounds to ounces then add
  {
    generate: (guided) => {
      const pounds = randInt(3, 7);
      const extraOz = randInt(20, 60);
      const truckOz = pounds * 16;
      const answer = truckOz + extraOz;
      const q: GeneratedQuestion = {
        problemText: `A truck is carrying ${pounds} pounds of blueberries to a market. The market already has ${extraOz} ounces of blueberries in stock. How many total ounces of blueberries will the market have once the truck arrives?`,
        answer,
        hint: `First convert the truck's pounds to ounces (1 pound = 16 ounces), then add the existing stock.`,
        solution: `Step 1: Convert pounds to ounces: ${pounds} × 16 = ${truckOz} ounces.\nStep 2: Add existing stock: ${truckOz} + ${extraOz} = ${answer} ounces.\nAnswer: The market will have ${answer} ounces total.`,
        njslsStandard: '4.MD.A.2',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, convert ${pounds} pounds to ounces. What is ${pounds} × 16?`,
            expectedAnswer: truckOz,
            feedbackCorrect: `Correct! ${pounds} pounds = ${truckOz} ounces.`,
            feedbackIncorrect: `${pounds} × 16 = ${truckOz} ounces.`,
            highlights: [`${pounds} pounds`, `${extraOz} ounces`, 'ounces'],
          },
          {
            instruction: `Now add the existing stock. What is ${truckOz} + ${extraOz}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! The market will have ${answer} ounces total!`,
            feedbackIncorrect: `${truckOz} + ${extraOz} = ${answer} ounces.`,
            highlights: [`${pounds} pounds`, `${extraOz} ounces`, 'ounces'],
          },
        ];
      }
      return q;
    },
  },
  // Q22: Family driving — km to meters then compare to claim
  {
    generate: (guided) => {
      const km1 = randInt(2, 4);
      const km2 = randInt(1, 3);
      const totalKm = km1 + km2;
      const totalM = totalKm * 1000;
      const claimM = (totalKm + 1) * 1000;
      const answer = claimM - totalM;
      const q: GeneratedQuestion = {
        problemText: `Leo's family drove ${km1} kilometers to the grocery store and then ${km2} kilometers to the library. Leo said they drove more than ${claimM.toLocaleString()} meters altogether. His mother said he is incorrect. By how many meters was he wrong?`,
        answer,
        hint: `First add the kilometers, then convert to meters (1 km = 1000 m), and compare to Leo's claim.`,
        solution: `Step 1: Add the distances: ${km1} + ${km2} = ${totalKm} km.\nStep 2: Convert to meters: ${totalKm} × 1000 = ${totalM.toLocaleString()} meters.\nStep 3: Find the difference from the claim: ${claimM.toLocaleString()} - ${totalM.toLocaleString()} = ${answer.toLocaleString()} meters.\nAnswer: Leo was wrong by ${answer.toLocaleString()} meters.`,
        njslsStandard: '5.MD.A.1',
      };
      if (guided) {
        q.steps = [
          {
            instruction: `First, add the distances and convert to meters. ${km1} + ${km2} = ${totalKm} km. What is ${totalKm} × 1000?`,
            expectedAnswer: totalM,
            feedbackCorrect: `Correct! ${totalKm} km = ${totalM.toLocaleString()} meters.`,
            feedbackIncorrect: `${totalKm} × 1000 = ${totalM.toLocaleString()} meters.`,
            highlights: [`${km1} kilometers`, `${km2} kilometers`, `${claimM.toLocaleString()} meters`],
          },
          {
            instruction: `Now compare to Leo's claim. What is ${claimM.toLocaleString()} - ${totalM.toLocaleString()}?`,
            expectedAnswer: answer,
            feedbackCorrect: `Excellent! Leo was wrong by ${answer.toLocaleString()} meters!`,
            feedbackIncorrect: `${claimM.toLocaleString()} - ${totalM.toLocaleString()} = ${answer.toLocaleString()} meters.`,
            highlights: [`${km1} kilometers`, `${km2} kilometers`, `${claimM.toLocaleString()} meters`],
          },
        ];
      }
      return q;
    },
  },
];

export function generateMultiplicationDivision(guided: boolean): GeneratedQuestion {
  return pick(templates).generate(guided);
}

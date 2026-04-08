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
];

export function generateMultiplicationDivision(guided: boolean): GeneratedQuestion {
  return pick(templates).generate(guided);
}

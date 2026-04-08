import type { Unit } from '../types';

export const units: Unit[] = [
  {
    id: 'unit-1',
    title: 'Multiplication & Division',
    city: 'Paris',
    country: 'France',
    description: 'Master basic multiplication and division word problems in the City of Light!',
    njslsStandards: ['4.OA.A.1', '4.OA.A.2', '4.OA.A.3'],
    contactName: 'Agent Pierre',
    contactImage: '/images/characters/contact-paris.png',
    backgroundImage: '/images/backgrounds/paris.svg',
    codePieceImage: '/images/code-pieces/piece-1.svg',
    tipId: 'cubes',
    cityDescription:
      'Welcome to Paris, the city of light. The city is known for its delicious food and incredible art, including the Mona Lisa at the Louvre. Reaching above the skyline is your destination; find the Eiffel Tower to begin today\'s task.',
    missionIntroText:
      'Agent, welcome to Paris. Agent Pierre\'s source has revealed that the keycard to the HQ entrance is hidden at the top of the Eiffel Tower. Scale the tower under cover of night and retrieve it — but the path is locked behind multiplication and division challenges. Solve them to climb higher.',
    maxPoints: 5,
  },
  {
    id: 'unit-2',
    title: 'Multistep Operations',
    city: 'New York',
    country: 'USA',
    description: 'Tackle multistep addition, subtraction, multiplication, and division in the Big Apple!',
    njslsStandards: ['4.OA.A.3', '5.OA.A.1', '5.OA.A.2'],
    contactName: 'Agent Liberty',
    contactImage: '/images/characters/contact-newyork.png',
    backgroundImage: '/images/backgrounds/newyork.svg',
    codePieceImage: '/images/code-pieces/piece-2.svg',
    tipId: 'draw-it-out',
    cityDescription:
      'Welcome to New York, the city that never sleeps. With a population of 8.6 million, it is the largest city in the United States. The city is split into 5 boroughs, your mission will be in Manhattan, the largest and most famous.',
    missionIntroText:
      'Agent, your next stop is New York City. Buried deep inside the Metropolitan Museum is Claude Monet\'s painting, The Water Lily Pond. Use the torch of knowledge to illuminate a secret inscription hidden on one of the lilies. Solve the multistep riddle it reveals to uncover the map to the secret HQ.',
    maxPoints: 5,
  },
  {
    id: 'unit-3',
    title: 'Interpreting Remainders',
    city: 'Tokyo',
    country: 'Japan',
    description: 'Learn to interpret remainders in division problems in the heart of Tokyo!',
    njslsStandards: ['4.OA.A.3', '5.NBT.B.6'],
    contactName: 'Agent Meiji',
    contactImage: '/images/characters/contact-tokyo.png',
    backgroundImage: '/images/backgrounds/tokyo.svg',
    codePieceImage: '/images/code-pieces/piece-3.svg',
    tipId: 'work-backwards',
    cityDescription:
      'Welcome to Tokyo, the most populated city in the world with a population of 41 million. This vibrant Japanese city boasts over 5 million vending machines. You\'ll need to head to a more formal locale for your mission though. Head to the Chiyoda Ward to begin.',
    missionIntroText:
      'Agent, konnichiwa! At the Imperial Palace, the emperor\'s nunchucks hold a secret — a scroll tucked inside reveals the 6-digit code to unlock the case in the HQ vault. Evade the royal guards and retrieve them, but first you must interpret the remainders to chart your path through the palace undetected.',
    maxPoints: 5,
  },
  {
    id: 'unit-4',
    title: 'Fractions',
    city: 'Cairo',
    country: 'Egypt',
    description: 'Solve fraction word problems among the ancient pyramids of Cairo!',
    njslsStandards: ['4.NF.B.3', '4.NF.B.4', '5.NF.A.2'],
    contactName: 'Agent Khufu',
    contactImage: '/images/characters/contact-cairo.png',
    backgroundImage: '/images/backgrounds/cairo.svg',
    codePieceImage: '/images/code-pieces/piece-4.svg',
    tipId: 'friendly-numbers',
    cityDescription:
      'Welcome to Cairo, the bustling hub of Egypt. Nested on the Nile River, Cairo is home to the Great Pyramids of Egypt. Get out into the desert near the pyramids so you can begin your mission.',
    missionIntroText:
      'Agent, welcome to Cairo. Cleopatra, an ancient agent of the Math Order, possessed one of the keys to the HQ vault. To continue her legacy, she sealed the key inside the tomb of her greatest mentor, Khufu. Break into the tomb and decipher her hieroglyphs — only a master of fractions can read them.',
    maxPoints: 5,
  },
  {
    id: 'unit-5',
    title: 'Measurement Units',
    city: 'Sydney',
    country: 'Australia',
    description: 'Convert and calculate measurement units down under in Sydney!',
    njslsStandards: ['4.MD.A.1', '4.MD.A.2', '5.MD.A.1'],
    contactName: 'Agent Roo',
    contactImage: '/images/characters/contact-sydney.png',
    backgroundImage: '/images/backgrounds/sydney.svg',
    codePieceImage: '/images/code-pieces/piece-5.svg',
    tipId: 'units-check',
    cityDescription:
      'Welcome to Sydney, home to over 100 beautiful beaches. Spanning over 12,400 square kilometers, it is one of the largest metropolitan areas in the world. Your mission will take place near the Sydney Harbour, get there as soon as possible so we can get to work.',
    missionIntroText:
      'G\'day, Agent! At the Sydney Opera House, secrets hide in plain sight. To get past the facial recognition scanner at the HQ vault, you will need the right mask. Agent Roo has intel on which one to grab, but the message is encoded in measurement conversions. Decipher it before time runs out.',
    maxPoints: 5,
  },
  {
    id: 'unit-6',
    title: 'Final Review & Challenge',
    city: 'Secret HQ',
    country: 'Classified',
    description: 'Use all your skills to complete the final mission and crack the code!',
    njslsStandards: ['4.OA.A.1', '4.OA.A.2', '4.OA.A.3', '5.OA.A.1', '5.OA.A.2', '5.NBT.B.6', '4.NF.B.3', '4.NF.B.4', '5.NF.A.2', '4.MD.A.1', '4.MD.A.2', '5.MD.A.1'],
    contactName: 'Commander',
    contactImage: '/images/characters/contact-hq.svg',
    backgroundImage: '/images/backgrounds/hq.svg',
    codePieceImage: '/images/code-pieces/complete.svg',
    tipId: 'cubes',
    cityDescription:
      'Welcome to the Secret HQ. This is the final destination — a hidden facility known only to top agents. Everything you have learned across the globe has led you here.',
    missionIntroText:
      'Welcome back, Agent. You have the map, the keycard, the mask, the key, and the vault code. Everything you gathered from Paris to Sydney has led to this moment. Infiltrate the secret HQ, bypass its defenses, and crack open the vault. This is the final challenge — use every skill you have learned to complete the mission.',
    maxPoints: 5,
  },
];

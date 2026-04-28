import { useEffect } from 'react';
import type { Unit } from '../../types';
import ParisCardRiddle from './riddles/ParisCardRiddle';
import NYCBridgeRiddle from './riddles/NYCBridgeRiddle';
import TokyoCodeRiddle from './riddles/TokyoCodeRiddle';
import CairoHieroglyphRiddle from './riddles/CairoHieroglyphRiddle';
import SydneyMaskRiddle from './riddles/SydneyMaskRiddle';

interface RiddleChallengeProps {
  unit: Unit;
  onComplete: () => void;
}

export default function RiddleChallenge({ unit, onComplete }: RiddleChallengeProps) {
  const hasRiddle =
    unit.id === 'unit-1' ||
    unit.id === 'unit-2' ||
    unit.id === 'unit-3' ||
    unit.id === 'unit-4' ||
    unit.id === 'unit-5';

  useEffect(() => {
    if (!hasRiddle) onComplete();
  }, [hasRiddle, onComplete]);

  switch (unit.id) {
    case 'unit-1':
      return <ParisCardRiddle unit={unit} onComplete={onComplete} />;
    case 'unit-2':
      return <NYCBridgeRiddle unit={unit} onComplete={onComplete} />;
    case 'unit-3':
      return <TokyoCodeRiddle unit={unit} onComplete={onComplete} />;
    case 'unit-4':
      return <CairoHieroglyphRiddle unit={unit} onComplete={onComplete} />;
    case 'unit-5':
      return <SydneyMaskRiddle unit={unit} onComplete={onComplete} />;
    default:
      return null;
  }
}

import type { Unit } from '../../../types';
import ImageChoiceRiddle from './ImageChoiceRiddle';

interface ParisCardRiddleProps {
  unit: Unit;
  onComplete: () => void;
}

export default function ParisCardRiddle({ unit, onComplete }: ParisCardRiddleProps) {
  return (
    <ImageChoiceRiddle
      badge="Eiffel Tower — Three Cards"
      agentName={unit.contactName}
      agentImage={unit.contactImage}
      prompt={`I didn't know there was more than one key card up here! All my inside man told me was that "the world opens for those who observe."`}
      options={[
        { id: 'lock', label: 'Lock', image: '/images/riddles/paris/card-lock.png' },
        { id: 'eye', label: 'Eye', image: '/images/riddles/paris/card-eye.png' },
        { id: 'key', label: 'Key', image: '/images/riddles/paris/card-key.png' },
      ]}
      correctId="eye"
      successText="The keycard is yours, Agent. Onward."
      onComplete={onComplete}
    />
  );
}

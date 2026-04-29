import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Unit } from '../../../types';

interface ParisCardRiddleProps {
  unit: Unit;
  onComplete: () => void;
}

type CardId = 'fish' | 'eye' | 'flower';

const HOTSPOTS: { id: CardId; left: string; top: string; size: string }[] = [
  { id: 'fish', left: '9%', top: '32%', size: '22%' },
  { id: 'eye', left: '39%', top: '51%', size: '22%' },
  { id: 'flower', left: '70%', top: '20%', size: '22%' },
];

const CORRECT: CardId = 'eye';

export default function ParisCardRiddle({ unit, onComplete }: ParisCardRiddleProps) {
  const [wrongId, setWrongId] = useState<CardId | null>(null);
  const [solved, setSolved] = useState(false);

  const handleClick = (id: CardId) => {
    if (solved) return;
    if (id === CORRECT) {
      setSolved(true);
      setWrongId(null);
      setTimeout(() => onComplete(), 1800);
    } else {
      setWrongId(id);
    }
  };

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/backgrounds/paris.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(6,8,24,0.55) 0%, rgba(6,8,24,0.92) 75%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="dossier rounded-2xl overflow-hidden" style={{ padding: '2rem 2.5rem' }}>
          {/* Badge */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span
              className="rounded-full text-sm font-medium"
              style={{
                padding: '0.35rem 1rem',
                background: 'rgba(168, 85, 247, 0.12)',
                color: '#d8b4fe',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              Eiffel Tower — Three Cards
            </span>
          </div>

          {/* Agent dialog */}
          <div className="flex items-start" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            {unit.contactImage && (
              <img
                src={unit.contactImage}
                alt={unit.contactName}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  flexShrink: 0,
                }}
              />
            )}
            <div className="flex-1">
              <p
                className="text-amber-400 font-bold"
                style={{ fontFamily: "'Fredoka', sans-serif", marginBottom: '0.35rem' }}
              >
                {unit.contactName}
              </p>
              <p className="text-gray-100 text-lg" style={{ lineHeight: '1.7' }}>
                I didn't know there was more than one keycard up here! All my inside man told me was
                that "the world opens for those who observe."
              </p>
            </div>
          </div>

          {/* Riddle image with hotspots */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '2048 / 1536',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(37, 48, 82, 0.5)',
              marginBottom: '1.25rem',
            }}
          >
            <img
              src="/images/riddles/paris/parisriddle.jpg"
              alt="Three keycards on a table"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {HOTSPOTS.map((spot) => {
              const isCorrect = solved && spot.id === CORRECT;
              const isWrong = wrongId === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => handleClick(spot.id)}
                  disabled={solved}
                  aria-label={spot.id}
                  className="hotspot-circle"
                  style={{
                    position: 'absolute',
                    left: spot.left,
                    top: spot.top,
                    width: spot.size,
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    background: 'transparent',
                    border: isCorrect
                      ? '3px solid rgba(34, 197, 94, 0.85)'
                      : isWrong
                      ? '3px solid rgba(239, 68, 68, 0.75)'
                      : '3px solid transparent',
                    boxShadow: isCorrect
                      ? '0 0 24px rgba(34, 197, 94, 0.5)'
                      : isWrong
                      ? '0 0 24px rgba(239, 68, 68, 0.4)'
                      : 'none',
                    cursor: solved ? 'default' : 'pointer',
                    padding: 0,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                />
              );
            })}
            <style>{`
              .hotspot-circle:not(:disabled):hover {
                border-color: rgba(251, 191, 36, 0.9) !important;
                box-shadow: 0 0 24px rgba(251, 191, 36, 0.5) !important;
              }
            `}</style>
          </div>

          {/* Feedback */}
          <AnimatePresence mode="wait">
            {solved && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl"
                style={{
                  padding: '1rem 1.25rem',
                  lineHeight: '1.6',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#86efac',
                }}
              >
                The keycard is yours, Agent. Onward.
              </motion.div>
            )}
            {!solved && wrongId && (
              <motion.div
                key="retry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl"
                style={{
                  padding: '1rem 1.25rem',
                  lineHeight: '1.6',
                  background: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.25)',
                  color: '#fde68a',
                }}
              >
                Not quite — try again.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

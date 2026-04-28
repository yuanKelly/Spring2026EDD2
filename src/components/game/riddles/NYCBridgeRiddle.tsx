import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Unit } from '../../../types';

interface NYCBridgeRiddleProps {
  unit: Unit;
  onComplete: () => void;
}

export default function NYCBridgeRiddle({ unit: _unit, onComplete }: NYCBridgeRiddleProps) {
  const [flipped, setFlipped] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const handleBridgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHint(null);
    setFlipped(true);
  };

  const handlePaintingClick = () => {
    if (flipped) return;
    setHint('Look closer at the symbol of unity…');
  };

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Atmospheric NYC backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/backgrounds/newyork.jpg)',
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
            The Met — Hidden Inscription
          </span>
        </div>

        {/* Riddle text */}
        <div
          className="rounded-xl text-center"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            background: 'rgba(6, 8, 24, 0.5)',
            border: '1px solid rgba(37, 48, 82, 0.5)',
            fontFamily: "'Fredoka', sans-serif",
          }}
        >
          <p className="text-amber-200 text-lg italic" style={{ lineHeight: '2' }}>
            Connecting two sides once apart
            <br />
            The secrets are within my art
            <br />
            Symbol of unity will give you your start
          </p>
        </div>

        {/* Painting / Map (flip card) */}
        <div
          style={{
            perspective: '1600px',
            width: '100%',
            marginBottom: '1.25rem',
          }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 10',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front: painting */}
            <div
              onClick={handlePaintingClick}
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                background: 'rgba(11, 15, 36, 0.6)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(37, 48, 82, 0.5)',
                cursor: flipped ? 'default' : 'pointer',
              }}
            >
              <img
                src="/images/riddles/nyc/painting.jpg"
                alt="Water Lily Pond painting"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Bridge hotspot — invisible, sized to just the bridge railings */}
              {!flipped && (
                <button
                  onClick={handleBridgeClick}
                  aria-label="Bridge in painting"
                  style={{
                    position: 'absolute',
                    left: '28%',
                    top: '24%',
                    width: '44%',
                    height: '14%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              )}
            </div>

            {/* Back: map */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'rgba(11, 15, 36, 0.6)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(251, 191, 36, 0.4)',
              }}
            >
              <img
                src="/images/riddles/nyc/map.jpg"
                alt="Map of HQ location"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '0.75rem',
                  right: '0.75rem',
                  padding: '0.6rem 0.9rem',
                  background: 'rgba(6, 8, 24, 0.85)',
                  border: '1px solid rgba(251, 191, 36, 0.35)',
                  borderRadius: '8px',
                  color: '#fde68a',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.85rem',
                  textAlign: 'center',
                }}
              >
                HQ COORDINATES — 14.5°E, 35.9°N (MEDITERRANEAN)
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feedback / continue */}
        <AnimatePresence mode="wait">
          {!flipped && hint && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl"
              style={{
                padding: '1rem 1.25rem',
                lineHeight: '1.6',
                background: 'rgba(234, 179, 8, 0.08)',
                border: '1px solid rgba(234, 179, 8, 0.25)',
                color: '#fde68a',
              }}
            >
              {hint}
            </motion.div>
          )}
          {flipped && (
            <motion.button
              key="continue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={onComplete}
              className="w-full text-midnight-950 font-bold rounded-xl text-lg"
              style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to retrieve your code piece
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </motion.div>
  );
}

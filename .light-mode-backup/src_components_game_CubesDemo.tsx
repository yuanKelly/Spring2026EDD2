import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CubesDemoProps {
  onComplete: () => void;
}

/**
 * Interactive CUBES method demo that annotates an example word problem
 * step-by-step: Circle numbers, Underline question, Box action words,
 * Evaluate, Show work.
 */

const STEPS = [
  { letter: 'C', label: 'Circle the key numbers & units', color: '#ef4444' },
  { letter: 'U', label: 'Underline the question', color: '#3b82f6' },
  { letter: 'B', label: 'Box the math "action" words', color: '#22c55e' },
  { letter: 'E', label: 'Evaluate & eliminate', color: '#a855f7' },
  { letter: 'S', label: 'Show your work & check', color: '#f59e0b' },
];

export default function CubesDemo({ onComplete }: CubesDemoProps) {
  // -1 = not started, 0..4 = active step, 5 = done
  const [activeStep, setActiveStep] = useState(-1);

  const started = activeStep >= 0;
  const visibleUpTo = activeStep; // steps 0..visibleUpTo are shown

  const advance = () => {
    if (activeStep < 4) {
      setActiveStep((s) => s + 1);
    } else {
      onComplete();
    }
  };

  // Helper: annotation class only when the step has been reached
  const anno = (step: number) => (visibleUpTo >= step ? `cubes-anno-${step}` : '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Example problem with annotations */}
      <div>
        <p
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: '#94a3b8', marginBottom: '0.5rem' }}
        >
          Example Problem
        </p>
        <div
          className="rounded-xl"
          style={{
            padding: '1rem 1.25rem 1.25rem',
            background: 'rgba(6, 8, 24, 0.7)',
            border: '1px solid rgba(37, 48, 82, 0.6)',
            lineHeight: '2.4',
            fontSize: '1.15rem',
            color: '#e2e8f0',
            overflow: 'visible',
          }}
        >
          {!started ? (
            <span>
              Sarah has 3 feet of ribbon. She needs 18 inches to wrap a gift.
              How many inches of ribbon will she have left?
            </span>
          ) : (
            <span>
              Sarah has{' '}
              <span className={anno(0)}>3 feet</span>{' '}
              of ribbon. She needs{' '}
              <span className={anno(0)}>18 inches</span>{' '}
              to wrap a gift.{' '}
              <span className={anno(1)}>
                How many inches of ribbon will she have{' '}
                <span className={anno(2)}>left</span>?
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Step cards — appear one at a time */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <AnimatePresence>
          {STEPS.map((step, i) =>
            visibleUpTo >= i ? (
              <motion.div
                key={step.letter}
                className="flex items-start rounded-xl"
                style={{
                  gap: '0.75rem',
                  padding: '0.6rem 1rem',
                  background:
                    i === activeStep
                      ? `${step.color}18`
                      : 'rgba(15, 20, 40, 0.5)',
                  border: `1.5px solid ${i === activeStep ? `${step.color}60` : 'rgba(37, 48, 82, 0.4)'}`,
                  transition: 'background 0.3s, border-color 0.3s',
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Number badge */}
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: step.color, color: '#fff' }}
                >
                  {i + 1}
                </span>
                {/* Label */}
                <div style={{ paddingTop: '0.15rem' }}>
                  <span className="font-bold" style={{ color: step.color, marginRight: '0.5rem', fontSize: '1rem' }}>
                    {step.letter}
                  </span>
                  <span className="text-gray-200" style={{ fontSize: '0.95rem' }}>
                    — {step.label}
                  </span>
                  {/* Extra detail for E and S steps */}
                  {i === 3 && visibleUpTo >= 3 && (
                    <motion.p
                      className="text-gray-400 text-sm"
                      style={{ marginTop: '0.3rem', lineHeight: '1.6' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Convert 3 feet → 36 inches, then subtract 18. No extra info to eliminate.
                    </motion.p>
                  )}
                  {i === 4 && visibleUpTo >= 4 && (
                    <motion.p
                      className="text-gray-400 text-sm"
                      style={{ marginTop: '0.3rem', lineHeight: '1.6' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      36 − 18 = 18 inches left ✓ — matches the underlined question!
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Action button */}
      <motion.button
        onClick={advance}
        className="w-full font-bold transition text-lg"
        style={{
          padding: '0.9rem',
          borderRadius: '0.75rem',
          background: !started
            ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
            : activeStep < 4
              ? `linear-gradient(135deg, ${STEPS[Math.min(activeStep + 1, 4)].color}, ${STEPS[Math.min(activeStep + 1, 4)].color}dd)`
              : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          color: activeStep >= 4 ? '#060818' : '#fff',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {!started
          ? 'Start — Step 1: Circle'
          : activeStep < 4
            ? `Next — Step ${activeStep + 2}: ${STEPS[activeStep + 1].letter}`
            : "Got it! Let's practice!"}
      </motion.button>
    </div>
  );
}

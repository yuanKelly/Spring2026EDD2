import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProblemSolvingTip } from '../../types';
import CubesDemo from './CubesDemo';

interface TourGuideProps {
  contactName: string;
  contactImage: string;
  tip: ProblemSolvingTip;
  onContinue: () => void;
}

function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}{!done && <span className="typing-cursor" />}</span>;
}

export default function TourGuide({ contactName, contactImage, tip, onContinue }: TourGuideProps) {
  const [showTip, setShowTip] = useState(false);
  const [showCubesDemo, setShowCubesDemo] = useState(false);
  const isCubes = tip.id === 'cubes';

  const renderCubesStep = (index: number) => {
    switch (index) {
      case 0:
        return (
          <>C – Circle the key <span className="cubes-anno-0">numbers and units</span></>
        );
      case 1:
        return (
          <>U – Underline the question: <span className="cubes-anno-1">what am I being asked to solve?</span></>
        );
      case 2:
        return (
          <>B – Box the math "action" words (am I going to <span className="cubes-anno-2">add, subtract, multiply, or divide</span>?)</>
        );
      case 3:
        return (
          <>E – Evaluate and eliminate: <strong style={{ color: 'var(--text-primary)' }}>what steps do I take, and what information don't I need?</strong></>
        );
      case 4:
        return (
          <>S – Show your work and check: <strong style={{ color: 'var(--text-primary)' }}>did I answer the underlined question?</strong></>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="flex-1 flex relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 80%, var(--atmosphere-near) 0%, var(--atmosphere-far) 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Content overlay */}
      <div className={`relative z-10 flex-1 flex ${showCubesDemo ? 'items-start' : 'items-end'}`} style={{ padding: '0.5in 0.75in 0.5in 0.5in' }}>

        {/* Character */}
        <motion.div
          className="shrink-0 self-end"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <div
            style={{
              width: 280,
              height: 350,
              borderRadius: '1.5rem',
              border: '3px dashed rgba(147, 180, 220, 0.6)',
              overflow: 'hidden',
            }}
          >
            <img
              src={contactImage}
              alt={contactName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </motion.div>

        {/* Speech bubble + button */}
        <div className="flex-1 flex flex-col" style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
          {/* Name label */}
          <h2
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              background: 'var(--title-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {contactName}
          </h2>

          {/* Speech bubble */}
          <div className="relative" style={{ marginBottom: '1.25rem' }}>
            {/* Tail pointing left — larger, curved look */}
            <div
              className="absolute"
              style={{
                left: '-20px',
                bottom: '2.5rem',
                width: 0,
                height: 0,
                borderTop: '16px solid transparent',
                borderBottom: '16px solid transparent',
                borderRight: '24px solid var(--bg-elevated)',
                filter: 'drop-shadow(-2px 0 4px rgba(0,0,0,0.2))',
              }}
            />
            <div
              className="dossier overflow-auto"
              style={{
                padding: '2rem 2.5rem',
                borderRadius: '2rem',
                maxHeight: showCubesDemo ? '75vh' : '50vh',
              }}
            >
              <AnimatePresence mode="wait">
                {!showTip ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-gray-200 text-lg" style={{ lineHeight: '1.9' }}>
                      <TypewriterText
                        text={`Welcome, Agent! Before we begin, let me teach you a powerful strategy — the "${tip.title}" technique. This will help you crack any word problem!`}
                      />
                    </p>
                  </motion.div>
                ) : showCubesDemo ? (
                  /* Interactive CUBES annotation demo */
                  <motion.div
                    key="cubes-demo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3
                      className="font-bold text-xl"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        color: 'var(--accent-amber-text)',
                        marginBottom: '1rem',
                      }}
                    >
                      Let's try the CUBES Method on a problem!
                    </h3>
                    <CubesDemo onComplete={onContinue} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="strategy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3
                      className="font-bold text-xl mb-3"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        color: 'var(--accent-amber-text)',
                      }}
                    >
                      {tip.title}
                    </h3>
                    <p className="text-gray-300" style={{ marginBottom: '1.25rem', lineHeight: '1.7' }}>{tip.description}</p>
                    <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {tip.steps.map((step, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start text-gray-200"
                          style={{ gap: '0.75rem' }}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.2 }}
                        >
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                            style={{
                              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                              color: '#060818',
                            }}
                          >
                            {i + 1}
                          </span>
                          <span style={{ lineHeight: '2.2', paddingTop: '0.2rem' }}>
                            {isCubes ? renderCubesStep(i) : step}
                          </span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action button */}
          {!showTip ? (
            <motion.button
              onClick={() => setShowTip(true)}
              className="w-full font-bold transition text-lg"
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                color: '#ffffff',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn the "{tip.title}" technique
            </motion.button>
          ) : showCubesDemo ? null /* CubesDemo has its own button */ : isCubes ? (
            <motion.button
              onClick={() => setShowCubesDemo(true)}
              className="w-full text-midnight-950 font-bold transition text-lg"
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try it on a problem!
            </motion.button>
          ) : (
            <motion.button
              onClick={onContinue}
              className="w-full text-midnight-950 font-bold transition text-lg"
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Got it! Let's start!
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

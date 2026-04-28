import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Unit } from '../../../types';

interface TokyoCodeRiddleProps {
  unit: Unit;
  onComplete: () => void;
}

const CORRECT_CODE = '12511814';
const LETTERS: { letter: string; number: number }[] = [
  { letter: 'L', number: 12 },
  { letter: 'E', number: 5 },
  { letter: 'A', number: 1 },
  { letter: 'R', number: 18 },
  { letter: 'N', number: 14 },
];

export default function TokyoCodeRiddle({ unit, onComplete }: TokyoCodeRiddleProps) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'correct'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = input.trim();
    if (!cleaned) return;
    if (cleaned === CORRECT_CODE) {
      setFeedback('correct');
      setTimeout(() => onComplete(), 1800);
    } else {
      setFeedback('wrong');
    }
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (feedback === 'wrong') setFeedback('idle');
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
            Imperial Palace — Hidden Scroll
          </span>
        </div>

        {/* Narrative intro */}
        <div
          className="rounded-xl"
          style={{
            padding: '1.25rem 1.5rem',
            marginBottom: '1.5rem',
            background: 'rgba(6, 8, 24, 0.5)',
            border: '1px solid rgba(37, 48, 82, 0.5)',
          }}
        >
          <p className="text-gray-100 text-lg" style={{ lineHeight: '1.8' }}>
            The nunchucks open to reveal a word, not a number! It says{' '}
            <strong className="text-amber-300 tracking-widest">"LEARN"</strong>. An inscription
            below says that <em>numbers are the universal language</em>.
          </p>
        </div>

        {/* Agent dialog */}
        <div className="flex items-start" style={{ gap: '1rem', marginBottom: '1.75rem' }}>
          {unit.contactImage && (
            <img
              src={unit.contactImage}
              alt={unit.contactName}
              style={{
                width: '64px',
                height: '64px',
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
            <p className="text-gray-100" style={{ lineHeight: '1.7' }}>
              We've been turning words into symbols all day! Maybe now we need to translate letters
              into numbers.
            </p>
          </div>
        </div>

        {/* Conversion helper */}
        <div
          className="rounded-xl"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            background: 'rgba(6, 8, 24, 0.5)',
            border: '1px solid rgba(37, 48, 82, 0.5)',
          }}
        >
          <p
            className="text-teal-400/80 text-xs"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.15em',
              marginBottom: '0.75rem',
            }}
          >
            ALPHABETICAL POSITION CIPHER (A=1, B=2, …)
          </p>
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gap: '0.6rem',
            }}
          >
            {LETTERS.map(({ letter, number }) => (
              <div
                key={letter}
                className="rounded-lg"
                style={{
                  padding: '0.6rem',
                  background: 'rgba(11, 15, 36, 0.7)',
                  border: '1px solid rgba(37, 48, 82, 0.6)',
                  textAlign: 'center',
                }}
              >
                <div
                  className="text-amber-300 font-bold"
                  style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.6rem' }}
                >
                  {letter}
                </div>
                <div
                  className="text-gray-300"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.95rem' }}
                >
                  {number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        {feedback !== 'correct' && (
          <form onSubmit={handleSubmit} className="flex" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              className="flex-1 bg-midnight-950 border border-midnight-500 rounded-xl text-white text-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition"
              style={{ padding: '0.85rem 1.25rem', letterSpacing: '0.15em' }}
              placeholder="Enter the numerical code…"
              autoFocus
            />
            <motion.button
              type="submit"
              disabled={!input.trim()}
              className="text-midnight-950 font-bold rounded-xl transition disabled:opacity-50"
              style={{
                padding: '0.85rem 2rem',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Submit
            </motion.button>
          </form>
        )}

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {feedback === 'wrong' && (
            <motion.div
              key="wrong"
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
              Not quite — try again. Translate each letter of <strong>LEARN</strong> to its
              alphabetical position and string the numbers together.
            </motion.div>
          )}
          {feedback === 'correct' && (
            <motion.div
              key="correct"
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
              Code accepted. The vault case will open with this on the final mission.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

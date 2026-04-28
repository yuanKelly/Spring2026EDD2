import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RiddleOption {
  id: string;
  label: string;
  image: string;
}

interface ImageChoiceRiddleProps {
  badge?: string;
  agentName?: string;
  agentImage?: string;
  prompt: string;
  options: RiddleOption[];
  correctId: string;
  successText: string;
  onComplete: () => void;
  /** Optional content rendered above the option grid (e.g. reference imagery for Cairo). */
  reference?: React.ReactNode;
  /** Optional atmospheric background image rendered behind the dossier card. */
  backgroundImage?: string;
}

export default function ImageChoiceRiddle({
  badge = 'Riddle',
  agentName,
  agentImage,
  prompt,
  options,
  correctId,
  successText,
  onComplete,
  reference,
  backgroundImage,
}: ImageChoiceRiddleProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const handleClick = (id: string) => {
    if (solved) return;
    setSelectedId(id);
    if (id === correctId) {
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
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
        </>
      )}
      <div className="relative z-10 max-w-4xl w-full dossier rounded-2xl overflow-hidden" style={{ padding: '2rem 2.5rem' }}>
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
            {badge}
          </span>
        </div>

        {/* Agent dialog */}
        <div className="flex items-start" style={{ gap: '1rem', marginBottom: '2rem' }}>
          {agentImage && (
            <img
              src={agentImage}
              alt={agentName ?? 'Agent'}
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
            {agentName && (
              <p
                className="text-amber-400 font-bold"
                style={{ fontFamily: "'Fredoka', sans-serif", marginBottom: '0.35rem' }}
              >
                {agentName}
              </p>
            )}
            <p className="text-gray-100 text-lg" style={{ lineHeight: '1.7' }}>
              {prompt}
            </p>
          </div>
        </div>

        {reference && <div style={{ marginBottom: '1.5rem' }}>{reference}</div>}

        {/* Options grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${Math.min(options.length, 4)}, minmax(0, 1fr))`,
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          {options.map((opt) => {
            const isCorrect = solved && opt.id === correctId;
            const isWrong = wrongId === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => handleClick(opt.id)}
                disabled={solved}
                whileHover={!solved ? { scale: 1.03 } : {}}
                whileTap={!solved ? { scale: 0.97 } : {}}
                className="rounded-xl overflow-hidden flex flex-col items-center"
                style={{
                  padding: '0.75rem',
                  background: isCorrect
                    ? 'rgba(34, 197, 94, 0.15)'
                    : isWrong
                    ? 'rgba(239, 68, 68, 0.1)'
                    : 'rgba(6, 8, 24, 0.6)',
                  border: isCorrect
                    ? '2px solid rgba(34, 197, 94, 0.6)'
                    : isWrong
                    ? '2px solid rgba(239, 68, 68, 0.5)'
                    : selectedId === opt.id
                    ? '2px solid rgba(251, 191, 36, 0.5)'
                    : '1px solid rgba(37, 48, 82, 0.5)',
                  cursor: solved ? 'default' : 'pointer',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    background: 'rgba(11, 15, 36, 0.6)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.6rem',
                  }}
                >
                  <img
                    src={opt.image}
                    alt={opt.label}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <span className="text-gray-200 text-sm font-medium">{opt.label}</span>
              </motion.button>
            );
          })}
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
              {successText}
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
  );
}

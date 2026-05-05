import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GeneratedQuestion } from '../../types';
import ReadAloud from '../ui/ReadAloud';
import FractionText from '../ui/FractionText';
import StepDiagram from './StepDiagram';
import { parseAnswer, compareAnswers } from '../../utils/answer';

/**
 * Splits text into segments, wrapping any substrings found in `highlights`
 * with a styled <mark> tag so the student can see which quantities are
 * being replaced by the variable.
 */
function highlightText(text: string, highlights: string[]): React.ReactNode {
  if (highlights.length === 0) return <FractionText text={text} />;

  // Escape regex special chars and build alternation pattern
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(regex);

  const highlightSet = new Set(highlights);
  return (
    <>
      {parts.map((part, i) =>
        highlightSet.has(part) ? (
          <mark
            key={i}
            style={{
              background: 'rgba(251, 191, 36, 0.25)',
              color: 'var(--accent-amber-text)',
              borderRadius: '4px',
              padding: '0 4px',
              border: '1px solid rgba(251, 191, 36, 0.4)',
            }}
          >
            <FractionText text={part} />
          </mark>
        ) : (
          <FractionText key={i} text={part} />
        ),
      )}
    </>
  );
}

interface GuidedQuestionProps {
  question: GeneratedQuestion;
  contactName: string;
  contactImage: string;
  onComplete: (allStepsCorrect: boolean) => void;
}

export default function GuidedQuestion({ question, contactName, contactImage, onComplete }: GuidedQuestionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
  const allStepsCorrectRef = useRef(true);
  const steps = question.steps || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || feedback !== null) return;

    const step = steps[currentStep];
    const userAnswer = parseAnswer(input);
    const expected = typeof step.expectedAnswer === 'string' ? parseFloat(step.expectedAnswer) : step.expectedAnswer;
    const correct = compareAnswers(userAnswer, expected);

    if (!correct) {
      allStepsCorrectRef.current = false;
    }

    setFeedback({
      text: correct ? step.feedbackCorrect : step.feedbackIncorrect,
      correct,
    });

    // Only auto-advance on correct answers
    if (correct) {
      setTimeout(() => {
        handleContinue();
      }, 1500);
    }
  };

  const handleContinue = () => {
    setFeedback(null);
    setInput('');
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete(allStepsCorrectRef.current);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="dossier rounded-2xl overflow-hidden" style={{ padding: '3.5rem 3rem', marginBottom: '1.5rem' }}>
        {/* Header badges */}
        <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span
            className="rounded-full text-sm font-medium"
            style={{
              padding: '0.35rem 1rem',
              background: 'rgba(59, 130, 246, 0.12)',
              color: 'var(--badge-blue-text)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            Guided Practice
          </span>
          <span className="text-midnight-500 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
            Step {currentStep + 1}/{steps.length}
          </span>
        </div>

        {/* Problem text */}
        <div className="flex justify-between items-start" style={{ marginBottom: '2rem' }}>
          <p className="text-gray-100 text-xl flex-1" style={{ lineHeight: '1.8', marginRight: '1rem' }}>
            {highlightText(question.problemText, steps[currentStep]?.highlights || [])}
          </p>
          <ReadAloud text={question.problemText} />
        </div>

        {/* Diagram (Draw a Picture strategy) */}
        {question.diagram && (
          <StepDiagram diagram={question.diagram} currentStep={currentStep} />
        )}

        {/* Contact instruction */}
        <div className="flex items-start" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '2px dashed rgba(147, 180, 220, 0.6)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img src={contactImage} alt={contactName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div
            className="flex-1 rounded-xl"
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--panel-bg)',
              border: '1px solid var(--panel-border)',
            }}
          >
            <p className="text-gray-200" style={{ lineHeight: '1.7' }}><FractionText text={steps[currentStep]?.instruction || ''} /></p>
          </div>
        </div>

        {/* Answer input */}
        <form onSubmit={handleSubmit} className="flex" style={{ gap: '0.75rem' }}>
          <input
            type="text"
            inputMode="decimal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-midnight-950 border border-midnight-500 rounded-xl text-white text-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition"
            style={{ padding: '0.85rem 1.25rem' }}
            placeholder="Your answer (e.g. 0.7 or 7/10)"
            disabled={feedback !== null}
            autoFocus
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || feedback !== null}
            className="text-midnight-950 font-bold rounded-xl transition disabled:opacity-50"
            style={{
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Check
          </motion.button>
        </form>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="rounded-xl"
                style={{
                  padding: '1rem 1.25rem',
                  lineHeight: '1.8',
                  background: feedback.correct ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${feedback.correct ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  color: feedback.correct ? 'var(--feedback-success-text)' : 'var(--feedback-error-text)',
                }}
              >
                {feedback.correct ? 'Correct! ' : 'Not quite. '}
                <FractionText text={feedback.text} />
              </div>

              {/* Show Continue button when wrong */}
              {!feedback.correct && (
                <motion.button
                  onClick={handleContinue}
                  className="w-full text-midnight-950 font-bold rounded-xl transition text-lg"
                  style={{
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    boxShadow: '0 4px 20px rgba(251, 191, 36, 0.25)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step progress dots — elongated active dot */}
      <div className="flex justify-center" style={{ gap: '0.5rem' }}>
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full transition"
            style={{
              width: i === currentStep ? '24px' : '10px',
              height: '10px',
              backgroundColor: i < currentStep ? '#22c55e' : i === currentStep ? '#fbbf24' : 'var(--bg-hover)',
              boxShadow: i === currentStep ? '0 0 8px rgba(251, 191, 36, 0.4)' : 'none',
            }}
            layout
          />
        ))}
      </div>
    </motion.div>
  );
}

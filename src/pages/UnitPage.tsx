import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { units } from '../data/units';
import { tips } from '../data/tips';
import { questionGenerators } from '../data/generators';
import { useScoring } from '../hooks/useScoring';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../contexts/AuthContext';
import type { GeneratedQuestion, SessionState } from '../types';
import MissionIntro from '../components/game/MissionIntro';
import TourGuide from '../components/game/TourGuide';
import GuidedQuestion from '../components/game/GuidedQuestion';
import IndependentQuestion from '../components/game/IndependentQuestion';
import RiddleChallenge from '../components/game/RiddleChallenge';
import CodePieceReveal from '../components/game/CodePieceReveal';
import SessionSummary from '../components/session/SessionSummary';
import ScoreDisplay from '../components/ui/ScoreDisplay';
import ProgressBar from '../components/ui/ProgressBar';
import ThemeToggle from '../components/ui/ThemeToggle';

const DEFAULT_GUIDED_COUNT = 3;

const STORAGE_KEY_PREFIX = 'mission-session-';
const getStorageKey = (uid: string, unitId: string) => `${STORAGE_KEY_PREFIX}${uid}-${unitId}`;

interface PersistedSession {
  session: SessionState;
  points: number;
  isFirstAttempt: boolean;
  currentQuestion: GeneratedQuestion | null;
}

function loadSavedSession(uid: string, unitId: string): PersistedSession | null {
  try {
    const raw = localStorage.getItem(getStorageKey(uid, unitId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSession;
    if (!parsed.session || parsed.session.unitId !== unitId) return null;
    // Revive Date
    parsed.session.startedAt = new Date(parsed.session.startedAt);
    return parsed;
  } catch {
    return null;
  }
}

export default function UnitPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const unit = units.find((u) => u.id === unitId);
  const tip = tips.find((t) => t.id === unit?.tipId);
  const GUIDED_COUNT = unit?.guidedCount ?? DEFAULT_GUIDED_COUNT;
  const { progress, completeUnit, startUnit } = useProgress();

  const piecesCollected = (() => {
    if (!progress || !unit) return 0;
    const unitsToCount = ['unit-1', 'unit-2', 'unit-3', 'unit-4', 'unit-5'];
    const completed = unitsToCount.filter((id) => progress.units[id]?.status === 'completed');
    if (unitsToCount.includes(unit.id) && !completed.includes(unit.id)) {
      return completed.length + 1;
    }
    return completed.length;
  })();

  // Synchronously rehydrate from localStorage on first render so the
  // saved-session effect below doesn't race with the default state.
  const initial = user && unitId ? loadSavedSession(user.uid, unitId) : null;

  // On re-entry, replay the briefings (mission-intro + meet-contact) so
  // students can relearn the lesson, then jump to where they left off.
  const savedPhase = initial?.session.currentPhase;
  const shouldReplayBriefings = !!savedPhase && savedPhase !== 'mission-intro';
  const resumePhaseRef = useRef<SessionState['currentPhase'] | null>(
    shouldReplayBriefings ? savedPhase! : null
  );

  const { points, maxPoints, lastChange, isFirstAttempt, isComplete, checkAnswer, resetForNextQuestion, restoreScoring } =
    useScoring(unit?.maxPoints || 5);

  const [session, setSession] = useState<SessionState>(
    initial?.session
      ? { ...initial.session, currentPhase: shouldReplayBriefings ? 'mission-intro' : initial.session.currentPhase }
      : {
          unitId: unitId || '',
          points: 0,
          questionsAttempted: 0,
          questionsCorrectFirstTry: 0,
          currentPhase: 'mission-intro',
          guidedQuestionsCompleted: 0,
          startedAt: new Date(),
        }
  );

  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(initial?.currentQuestion ?? null);
  const currentQuestionFirstTryCorrect = useRef(false);

  // Restore score on first render (useScoring's initial state is 0)
  const didRestoreRef = useRef(false);
  if (initial && !didRestoreRef.current) {
    didRestoreRef.current = true;
    // Defer to avoid setState-in-render warning
    queueMicrotask(() => restoreScoring(initial.points, initial.isFirstAttempt));
  }

  // Save session to localStorage on every meaningful change. Skip during
  // terminal phases (code-reveal/summary) since the unit is effectively done.
  useEffect(() => {
    if (!user || !unitId) return;
    if (session.currentPhase === 'code-reveal' || session.currentPhase === 'summary') return;
    const data: PersistedSession = { session, points, isFirstAttempt, currentQuestion };
    try {
      localStorage.setItem(getStorageKey(user.uid, unitId), JSON.stringify(data));
    } catch {
      // localStorage may be full or disabled; ignore.
    }
  }, [user, unitId, session, points, isFirstAttempt, currentQuestion]);

  const clearSavedSession = useCallback(() => {
    if (!user || !unitId) return;
    localStorage.removeItem(getStorageKey(user.uid, unitId));
  }, [user, unitId]);

  const generateNewQuestion = useCallback(
    (guided: boolean) => {
      if (!unitId) return;
      const generator = questionGenerators[unitId];
      if (generator) {
        setCurrentQuestion(generator(guided));
      }
    },
    [unitId]
  );

  useEffect(() => {
    if (unitId) {
      startUnit(unitId);
    }
  }, [unitId, startUnit]);

  if (!unit || !tip) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-base)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Hmm, that mission isn't on file, Agent.</p>
        <button onClick={() => navigate('/home')} className="text-amber-400 ml-2">
          Back to the world map
        </button>
      </div>
    );
  }

  const handleMissionIntroContinue = () => {
    if (unit?.id === 'unit-6') {
      // Unit-6 skips meet-contact, so consume any resume target here.
      const resume = resumePhaseRef.current;
      resumePhaseRef.current = null;
      if (resume && resume !== 'mission-intro') {
        if ((resume === 'guided' || resume === 'independent') && !currentQuestion) {
          generateNewQuestion(resume === 'guided');
        }
        setSession((s) => ({ ...s, currentPhase: resume }));
        return;
      }
      generateNewQuestion(false);
      setSession((s) => ({ ...s, currentPhase: 'independent' }));
      return;
    }
    setSession((s) => ({ ...s, currentPhase: 'meet-contact' }));
  };

  const handleTourGuideContinue = () => {
    const resume = resumePhaseRef.current;
    resumePhaseRef.current = null;
    if (resume && resume !== 'mission-intro' && resume !== 'meet-contact') {
      if ((resume === 'guided' || resume === 'independent') && !currentQuestion) {
        generateNewQuestion(resume === 'guided');
      }
      setSession((s) => ({ ...s, currentPhase: resume }));
      return;
    }
    generateNewQuestion(true);
    setSession((s) => ({ ...s, currentPhase: 'guided' }));
  };

  const handleGuidedComplete = (allStepsCorrect: boolean) => {
    const newCount = session.guidedQuestionsCompleted + 1;
    setSession((s) => ({
      ...s,
      guidedQuestionsCompleted: newCount,
      questionsAttempted: s.questionsAttempted + 1,
      questionsCorrectFirstTry: s.questionsCorrectFirstTry + (allStepsCorrect ? 1 : 0),
    }));

    if (newCount >= GUIDED_COUNT) {
      generateNewQuestion(false);
      setSession((s) => ({ ...s, currentPhase: 'independent', guidedQuestionsCompleted: newCount }));
    } else {
      generateNewQuestion(true);
      setSession((s) => ({ ...s, guidedQuestionsCompleted: newCount }));
    }
  };

  const handleIndependentAnswer = (userAnswer: number) => {
    if (!currentQuestion) return { correct: false, isFirstAttempt: true, pointsChange: 0 };
    const result = checkAnswer(userAnswer, currentQuestion.answer);
    if (result.correct && result.isFirstAttempt) {
      currentQuestionFirstTryCorrect.current = true;
    }
    return result;
  };

  const handleNextQuestion = () => {
    const wasFirstTry = currentQuestionFirstTryCorrect.current;
    currentQuestionFirstTryCorrect.current = false;
    setSession((s) => ({
      ...s,
      questionsAttempted: s.questionsAttempted + 1,
      questionsCorrectFirstTry: s.questionsCorrectFirstTry + (wasFirstTry ? 1 : 0),
    }));

    if (isComplete) {
      setSession((s) => ({ ...s, currentPhase: 'riddle' }));
    } else {
      resetForNextQuestion();
      generateNewQuestion(false);
    }
  };

  const handleRiddleComplete = () => {
    clearSavedSession();
    completeUnit(unit.id);
    setSession((s) => ({ ...s, currentPhase: 'code-reveal' }));
  };

  const handleCodeRevealContinue = () => {
    setSession((s) => ({ ...s, currentPhase: 'summary' }));
  };

  const handleSaveAndExit = () => {
    navigate('/home');
  };

  useEffect(() => {
    if (isComplete && session.currentPhase === 'independent') {
      setSession((s) => ({ ...s, currentPhase: 'riddle' }));
    }
  }, [isComplete, session.currentPhase, unit.id]);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between shrink-0 h-14 relative"
        style={{
          padding: '0 0.5in',
          background: 'linear-gradient(180deg, var(--bg-surface), var(--bg-base))',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, #2dd4bf, #f59e0b, transparent)' }}
        />

        <h1
          className="font-bold text-lg"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            background: 'var(--title-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {unit.city} — {unit.title}
        </h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={handleSaveAndExit}
            className="bg-midnight-700 hover:bg-midnight-600 rounded-lg transition text-sm whitespace-nowrap min-h-0 border border-midnight-500"
            style={{ padding: '0.35rem 1rem', color: 'var(--text-secondary)' }}
          >
            Save & Exit
          </button>
        </div>
      </header>

      {/* Game content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {session.currentPhase === 'mission-intro' && (
            <MissionIntro key="intro" unit={unit} onContinue={handleMissionIntroContinue} />
          )}

          {session.currentPhase === 'meet-contact' && (
            <TourGuide
              key="guide"
              contactName={unit.contactName}
              contactImage={unit.contactImage}
              tip={tip}
              onContinue={handleTourGuideContinue}
            />
          )}

          {session.currentPhase === 'guided' && currentQuestion && (
            <div key="guided" className="flex-1 flex flex-col items-center overflow-auto" style={{ padding: '0.5in' }}>
              <div className="w-full max-w-4xl mb-4">
                <ProgressBar
                  current={session.guidedQuestionsCompleted}
                  max={GUIDED_COUNT}
                  label="Guided Practice"
                />
              </div>
              <GuidedQuestion
                key={session.guidedQuestionsCompleted}
                question={currentQuestion}
                contactName={unit.contactName}
                contactImage={unit.contactImage}
                onComplete={handleGuidedComplete}
              />
            </div>
          )}

          {session.currentPhase === 'independent' && currentQuestion && (
            <div key="independent" className="flex-1 flex flex-col items-center overflow-auto" style={{ padding: '0.5in' }}>
              <div className="w-full max-w-2xl mb-4">
                <ScoreDisplay points={points} maxPoints={maxPoints} lastChange={lastChange} />
              </div>
              <IndependentQuestion
                key={session.questionsAttempted}
                question={currentQuestion}
                onAnswer={handleIndependentAnswer}
                onNext={handleNextQuestion}
                isFirstAttempt={isFirstAttempt}
              />
            </div>
          )}

          {session.currentPhase === 'riddle' && (
            <div key="riddle" className="flex-1 flex flex-col items-center overflow-auto" style={{ padding: '0.5in' }}>
              <RiddleChallenge unit={unit} onComplete={handleRiddleComplete} />
            </div>
          )}

          {session.currentPhase === 'code-reveal' && (
            <CodePieceReveal key="reveal" unit={unit} piecesCollected={piecesCollected} onContinue={handleCodeRevealContinue} />
          )}

          {session.currentPhase === 'summary' && (
            <SessionSummary
              key="summary"
              unit={unit}
              pointsEarned={points}
              questionsAttempted={session.questionsAttempted}
              questionsCorrectFirstTry={session.questionsCorrectFirstTry}
              startedAt={session.startedAt}
              onGoHome={() => navigate('/home')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

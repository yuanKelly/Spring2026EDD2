export interface Unit {
  id: string;
  title: string;
  city: string;
  country: string;
  description: string;
  njslsStandards: string[];
  contactName: string;
  contactImage: string;
  backgroundImage: string;
  missionBackgroundImage?: string;
  codePieceImage: string;
  tipId: string;
  cityDescription: string;
  missionIntroText: string;
  maxPoints: number;
  guidedCount?: number;
}

export interface GeneratedQuestion {
  problemText: string;
  answer: number;
  hint: string;
  solution: string;
  steps?: GuidedStep[];
  diagram?: DiagramData;
  njslsStandard: string;
}

export interface GuidedStep {
  instruction: string;
  expectedAnswer: number | string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  /** Substrings in the problemText to highlight for this step */
  highlights?: string[];
}

export interface DiagramShape {
  type: 'circle' | 'rect';
  count: number;
  label: string;
  value?: string;
  color: 'amber' | 'teal' | 'blue' | 'green';
  highlightCount?: number;
}

export interface DiagramAnnotation {
  text: string;
  position: 'below' | 'between';
  targetGroup?: number;
}

export interface DiagramStepState {
  visibleGroups: number[];
  highlightGroup?: number;
  annotations: DiagramAnnotation[];
}

export interface DiagramData {
  groups: DiagramShape[];
  stepStates: DiagramStepState[];
}

export interface ProblemSolvingTip {
  id: string;
  title: string;
  description: string;
  steps: string[];
  unitId: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  createdAt: Date;
  hasCompletedTutorial: boolean;
}

export interface UserProgress {
  uid: string;
  units: Record<string, UnitProgress>;
  lastSessionDate: Date;
}

export interface UnitProgress {
  unitId: string;
  status: 'locked' | 'not-started' | 'in-progress' | 'completed';
  timesCompleted: number;
  lastCompletedAt?: Date;
}

export interface SessionState {
  unitId: string;
  points: number;
  questionsAttempted: number;
  questionsCorrectFirstTry: number;
  currentPhase: 'mission-intro' | 'meet-contact' | 'guided' | 'independent' | 'riddle' | 'code-reveal' | 'summary';
  guidedQuestionsCompleted: number;
  startedAt: Date;
}

export type QuestionGenerator = (guided: boolean) => GeneratedQuestion;

export interface AttemptResult {
  correct: boolean;
  isFirstAttempt: boolean;
  pointsChange: number;
}

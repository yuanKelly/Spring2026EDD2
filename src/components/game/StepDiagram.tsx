import { motion, AnimatePresence } from 'framer-motion';
import type { DiagramData, DiagramShape } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

const COLOR_MAP: Record<string, string> = {
  amber: '#fbbf24',
  teal: '#2dd4bf',
  blue: '#3b82f6',
  green: '#22c55e',
};

const COLOR_MAP_DIM: Record<string, string> = {
  amber: 'rgba(251, 191, 36, 0.25)',
  teal: 'rgba(45, 212, 191, 0.25)',
  blue: 'rgba(59, 130, 246, 0.25)',
  green: 'rgba(34, 197, 94, 0.25)',
};

interface StepDiagramProps {
  diagram: DiagramData;
  currentStep: number;
}

/** Max shapes to draw individually; beyond this we show "x N" */
const MAX_DRAWN = 12;
const SHAPE_SIZE = 14;
const SHAPE_GAP = 6;
const SHAPES_PER_ROW = 6;

function getShapePositions(count: number, groupCenterX: number, startY: number) {
  const drawn = Math.min(count, MAX_DRAWN);
  const showOverflow = count > MAX_DRAWN;
  const displayCount = showOverflow ? 3 : drawn;
  const rows = Math.ceil(displayCount / SHAPES_PER_ROW);
  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < displayCount; i++) {
    const row = Math.floor(i / SHAPES_PER_ROW);
    const col = i % SHAPES_PER_ROW;
    const itemsInRow = row < rows - 1 ? SHAPES_PER_ROW : displayCount - row * SHAPES_PER_ROW;
    const rowWidth = itemsInRow * (SHAPE_SIZE * 2 + SHAPE_GAP) - SHAPE_GAP;
    const x = groupCenterX - rowWidth / 2 + col * (SHAPE_SIZE * 2 + SHAPE_GAP) + SHAPE_SIZE;
    const y = startY + row * (SHAPE_SIZE * 2 + SHAPE_GAP) + SHAPE_SIZE;
    positions.push({ x, y });
  }

  return { positions, showOverflow, displayCount };
}

function renderShapeGroup(
  group: DiagramShape,
  groupIndex: number,
  centerX: number,
  isHighlighted: boolean,
  stepIndex: number,
  isLight: boolean,
) {
  const shapeStrokeActive = isLight ? '#0b0f24' : '#fff';
  const shapeStrokeIdle = isLight ? 'rgba(11,15,36,0.25)' : 'rgba(255,255,255,0.15)';
  const valueLabelFill = isLight ? 'rgba(11,15,36,0.7)' : 'rgba(255,255,255,0.7)';
  const labelY = 20;
  const shapesStartY = 36;
  const { positions, showOverflow } = getShapePositions(group.count, centerX, shapesStartY);
  const color = COLOR_MAP[group.color] || COLOR_MAP.amber;
  const dimColor = COLOR_MAP_DIM[group.color] || COLOR_MAP_DIM.amber;

  return (
    <motion.g
      key={`group-${groupIndex}-step-${stepIndex}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: groupIndex * 0.15 }}
    >
      {/* Group label */}
      <text
        x={centerX}
        y={labelY}
        textAnchor="middle"
        fill={color}
        fontSize="13"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="600"
      >
        {group.label}
      </text>

      {/* Shapes */}
      {positions.map((pos, i) => {
        const isPartOfHighlight =
          group.highlightCount !== undefined && i < group.highlightCount;
        const shapeFill =
          group.highlightCount !== undefined
            ? isPartOfHighlight
              ? color
              : dimColor
            : color;

        return group.type === 'circle' ? (
          <motion.circle
            key={`shape-${groupIndex}-${i}`}
            cx={pos.x}
            cy={pos.y}
            r={SHAPE_SIZE}
            fill={shapeFill}
            fillOpacity={group.highlightCount !== undefined ? 1 : 0.85}
            stroke={isHighlighted ? shapeStrokeActive : shapeStrokeIdle}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            initial={{ scale: 0 }}
            animate={
              isHighlighted
                ? { scale: [1, 1.08, 1], transition: { repeat: Infinity, duration: 1.5 } }
                : { scale: 1 }
            }
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ) : (
          <motion.rect
            key={`shape-${groupIndex}-${i}`}
            x={pos.x - SHAPE_SIZE}
            y={pos.y - SHAPE_SIZE * 0.75}
            width={SHAPE_SIZE * 2}
            height={SHAPE_SIZE * 1.5}
            rx={4}
            fill={shapeFill}
            fillOpacity={group.highlightCount !== undefined ? 1 : 0.85}
            stroke={isHighlighted ? shapeStrokeActive : shapeStrokeIdle}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            initial={{ scale: 0 }}
            animate={
              isHighlighted
                ? { scale: [1, 1.08, 1], transition: { repeat: Infinity, duration: 1.5 } }
                : { scale: 1 }
            }
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        );
      })}

      {/* Overflow label */}
      {showOverflow && (
        <text
          x={centerX + 50}
          y={shapesStartY + SHAPE_SIZE}
          textAnchor="start"
          fill={color}
          fontSize="14"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
        >
          x {group.count}
        </text>
      )}

      {/* Value label below shapes */}
      {group.value && (
        <motion.text
          x={centerX}
          y={shapesStartY + Math.ceil(Math.min(group.count, showOverflow ? 3 : MAX_DRAWN) / SHAPES_PER_ROW) * (SHAPE_SIZE * 2 + SHAPE_GAP) + 16}
          textAnchor="middle"
          fill={valueLabelFill}
          fontSize="12"
          fontFamily="'JetBrains Mono', monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {group.value}
        </motion.text>
      )}
    </motion.g>
  );
}

export default function StepDiagram({ diagram, currentStep }: StepDiagramProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const annotationColor = isLight ? '#78350f' : '#fcd34d';
  const stepState = diagram.stepStates[Math.min(currentStep, diagram.stepStates.length - 1)];
  if (!stepState) return null;

  const visibleGroups = stepState.visibleGroups;
  const groupCount = visibleGroups.length;
  const svgWidth = 500;
  const svgHeight = 160;
  const sectionWidth = svgWidth / groupCount;

  return (
    <div
      className="rounded-xl"
      style={{
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
      }}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diagram illustrating the problem"
      >
        <AnimatePresence>
          {visibleGroups.map((gIdx, i) => {
            const group = diagram.groups[gIdx];
            if (!group) return null;
            const centerX = sectionWidth * i + sectionWidth / 2;
            const isHighlighted = stepState.highlightGroup === gIdx;
            return renderShapeGroup(group, gIdx, centerX, isHighlighted, currentStep, isLight);
          })}
        </AnimatePresence>

        {/* Annotations */}
        {stepState.annotations.map((ann, i) => {
          let x = svgWidth / 2;
          let y = svgHeight - 16;

          if (ann.position === 'below' && ann.targetGroup !== undefined) {
            const visIdx = visibleGroups.indexOf(ann.targetGroup);
            if (visIdx !== -1) {
              x = sectionWidth * visIdx + sectionWidth / 2;
            }
          }

          return (
            <motion.text
              key={`ann-${currentStep}-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              fill={annotationColor}
              fontSize="14"
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="600"
              initial={{ opacity: 0, y: y + 8 }}
              animate={{ opacity: 1, y }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {ann.text}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
}

import React from 'react';

/**
 * Parses text containing fractions (e.g. "1/2", "2 1/3") and renders them
 * as stacked fractions with numerator over denominator.
 * Also converts \n to <br /> for multi-line solutions.
 */
export default function FractionText({ text }: { text: string }) {
  // First split by newlines to handle multi-line solutions
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <br />}
          {renderLine(line)}
        </React.Fragment>
      ))}
    </>
  );
}

function renderLine(line: string) {
  // Match mixed numbers like "2 1/3" or plain fractions like "1/2"
  const parts = line.split(/(\d+\s+\d+\/\d+|\d+\/\d+)/g);

  return parts.map((part, i) => {
    // Check if this part is a mixed number like "2 1/3"
    const mixedMatch = part.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixedMatch) {
      const [, whole, num, den] = mixedMatch;
      return (
        <React.Fragment key={i}>
          <span>{whole}</span>
          <span className="fraction">
            <span className="fraction-num">{num}</span>
            <span className="fraction-den">{den}</span>
          </span>
        </React.Fragment>
      );
    }

    // Check if this part is a simple fraction like "1/2"
    const fracMatch = part.match(/^(\d+)\/(\d+)$/);
    if (fracMatch) {
      const [, num, den] = fracMatch;
      return (
        <span key={i} className="fraction">
          <span className="fraction-num">{num}</span>
          <span className="fraction-den">{den}</span>
        </span>
      );
    }

    // Plain text — return as-is
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

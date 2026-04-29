export function parseAnswer(input: string): number {
  const trimmed = input.trim().replace(/\s+/g, '');
  if (trimmed === '') return NaN;
  const slash = trimmed.indexOf('/');
  if (slash > 0) {
    const num = parseFloat(trimmed.slice(0, slash));
    const den = parseFloat(trimmed.slice(slash + 1));
    if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
    return NaN;
  }
  return parseFloat(trimmed);
}

export function compareAnswers(user: number, expected: number): boolean {
  if (isNaN(user) || isNaN(expected)) return false;
  if (user === expected) return true;
  const tolerance = Math.max(0.01, Math.abs(expected) * 0.01);
  return Math.abs(user - expected) <= tolerance;
}

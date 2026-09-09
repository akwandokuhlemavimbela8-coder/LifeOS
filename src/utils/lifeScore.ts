export function calculateLifeScore(domains: { name: string; score: number }[]): number {
  if (domains.length === 0) return 0;
  const sum = domains.reduce((acc, domain) => acc + domain.score, 0);
  return Math.round(sum / domains.length);
}
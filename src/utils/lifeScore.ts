export interface Domain {
  name: string;
  score: number;
}

export function calculateLifeScore(domains: Domain[]): number {
  if (!domains.length) return 0;
  const total = domains.reduce((acc, curr) => acc + curr.score, 0);
  return Math.round(total / domains.length);
}

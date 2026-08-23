import { LifeCategory, LifeScoreBreakdown } from '../types';

export interface CategoryScores {
  health: number;
  money: number;
  learning: number;
  career: number;
  relationships: number;
  mindset: number;
}

// Configurable weights as per LifeOS spec
const DEFAULT_WEIGHTS: Record<LifeCategory, number> = {
  health: 0.20,
  money: 0.20,
  learning: 0.20,
  career: 0.15,
  relationships: 0.15,
  mindset: 0.10,
};

export const LifeScoreService = {
  calculateOverallScore(scores: CategoryScores, customWeights = DEFAULT_WEIGHTS): number {
    let totalScore = 0;
    (Object.keys(scores) as LifeCategory[]).forEach((cat) => {
      const score = scores[cat] || 0;
      const weight = customWeights[cat] || 0;
      totalScore += score * weight;
    });
    return Math.round(totalScore);
  },

  getBreakdown(scores: CategoryScores, customWeights = DEFAULT_WEIGHTS): LifeScoreBreakdown[] {
    return (Object.keys(scores) as LifeCategory[]).map((cat) => ({
      category: cat,
      score: scores[cat] || 0,
      weight: customWeights[cat] * 100,
    }));
  }
};

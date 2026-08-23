export type LifeCategory = 'health' | 'money' | 'learning' | 'relationships' | 'career' | 'mindset';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  lifeScore: number;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LifeScoreBreakdown {
  category: LifeCategory;
  score: number;
  weight: number;
}

export interface GoalMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: LifeCategory;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  progress: number;
  status: 'active' | 'completed' | 'paused';
  milestones: GoalMilestone[];
  createdAt: string;
}

export interface DailyTask {
  id: string;
  title: string;
  timeBlock?: string;
  category: LifeCategory;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

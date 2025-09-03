
export type Step = 'start' | 'questioning' | 'loading' | 'result';

export interface Recommendation {
  name: string;
  description: string;
  price: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'mcq' | 'text';
  options?: string[];
}

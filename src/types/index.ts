export type Sentiment = 'positive' | 'negative' | 'neutral';
export type ModelType = 'tfidf_lr' | 'bert' | 'llm';

export interface Keyword {
  word: string;
  type: 'positive' | 'negative';
  score: number;
}

export interface ModelPrediction {
  model: ModelType;
  sentiment: Sentiment;
  confidence: number;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  processing_time_ms: number;
}

export interface AnalysisResult {
  id?: string;
  sentiment: Sentiment;
  confidence: number;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  keywords: Keyword[];
  word_count: number;
  processing_time_ms: number;
  text_input?: string;
  created_at?: string;
  ensemble_method?: string;
  models?: ModelPrediction[];
}

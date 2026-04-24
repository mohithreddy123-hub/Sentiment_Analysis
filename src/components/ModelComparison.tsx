import { ModelPrediction } from '../types';
import { Zap } from 'lucide-react';

interface Props {
  models: ModelPrediction[];
}

const MODEL_NAMES = {
  tfidf_lr: { full: 'TF-IDF + Logistic Regression', short: 'TF-IDF LR', color: 'bg-blue-50 border-blue-200' },
  bert: { full: 'BERT Transformer', short: 'BERT', color: 'bg-purple-50 border-purple-200' },
  llm: { full: 'LLM (GPT-3.5)', short: 'LLM', color: 'bg-orange-50 border-orange-200' },
};

const SENTIMENT_COLORS = {
  positive: 'text-emerald-700',
  negative: 'text-red-700',
  neutral: 'text-amber-700',
};

export default function ModelComparison({ models }: Props) {
  if (!models || models.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-slate-600" />
        <h2 className="text-slate-900 font-semibold text-base">Individual Model Predictions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {models.map((model) => {
          const modelInfo = MODEL_NAMES[model.model];
          const sentimentColor = SENTIMENT_COLORS[model.sentiment];
          const pct = Math.round(model.confidence * 100);

          return (
            <div key={model.model} className={`border rounded-xl p-4 ${modelInfo.color}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-900 text-xs font-semibold">{modelInfo.short}</p>
              </div>

              <div className="mb-3">
                <p className={`text-lg font-bold ${sentimentColor}`}>
                  {model.sentiment.charAt(0).toUpperCase() + model.sentiment.slice(1)}
                </p>
                <p className="text-slate-600 text-xs mt-0.5">{pct}% confidence</p>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Positive</span>
                  <span className="font-medium text-emerald-700">{Math.round(model.positive_score * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Negative</span>
                  <span className="font-medium text-red-700">{Math.round(model.negative_score * 100)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Neutral</span>
                  <span className="font-medium text-amber-700">{Math.round(model.neutral_score * 100)}%</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs mt-3 pt-2 border-t border-slate-300">
                {modelInfo.full}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

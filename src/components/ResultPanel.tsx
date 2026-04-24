import { Clock, FileText, Tag } from 'lucide-react';
import { AnalysisResult } from '../types';
import SentimentGauge from './SentimentGauge';
import ScoreBar from './ScoreBar';

interface Props {
  result: AnalysisResult;
}

export default function ResultPanel({ result }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5 animate-fadeIn shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-900 font-semibold text-base">Ensemble Prediction</h2>
      </div>

      <div className="flex items-center justify-center py-2">
        <SentimentGauge sentiment={result.sentiment} confidence={result.confidence} />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-slate-600 text-xs uppercase tracking-wider font-medium">Score Distribution</p>
        <ScoreBar
          label="Positive"
          value={result.positive_score}
          barColor="#059669"
          trackColor="#d1fae5"
          textColor="#059669"
        />
        <ScoreBar
          label="Negative"
          value={result.negative_score}
          barColor="#dc2626"
          trackColor="#fee2e2"
          textColor="#dc2626"
        />
        <ScoreBar
          label="Neutral"
          value={result.neutral_score}
          barColor="#d97706"
          trackColor="#fef3c7"
          textColor="#d97706"
        />
      </div>

      {result.keywords.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <p className="text-slate-600 text-xs uppercase tracking-wider font-medium flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Detected Keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((kw, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  kw.type === 'positive'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {kw.word}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
        <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-slate-500 shrink-0" />
          <div>
            <p className="text-slate-900 text-sm font-semibold">{result.word_count}</p>
            <p className="text-slate-600 text-xs">Words</p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2.5">
          <Tag className="w-4 h-4 text-slate-500 shrink-0" />
          <div>
            <p className="text-slate-900 text-sm font-semibold">{result.keywords.length}</p>
            <p className="text-slate-600 text-xs">Features</p>
          </div>
        </div>
      </div>
    </div>
  );
}

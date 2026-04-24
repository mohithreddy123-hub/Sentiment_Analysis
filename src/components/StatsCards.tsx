import { TrendingUp, Layers, Zap } from 'lucide-react';
import { AnalysisResult } from '../types';

interface Props {
  history: AnalysisResult[];
}

export default function StatsCards({ history }: Props) {
  const total = history.length;
  const avgConfidence = total > 0
    ? history.reduce((s, r) => s + r.confidence, 0) / total
    : 0;

  const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
  history.forEach((r) => sentimentCounts[r.sentiment]++);
  const dominant = total > 0
    ? (Object.entries(sentimentCounts).sort((a, b) => b[1] - a[1])[0][0] as string)
    : '—';

  const dominantLabel = dominant === '—' ? '—'
    : dominant.charAt(0).toUpperCase() + dominant.slice(1);

  const dominantColor = dominant === 'positive'
    ? 'text-emerald-700'
    : dominant === 'negative'
    ? 'text-red-700'
    : dominant === 'neutral'
    ? 'text-amber-700'
    : 'text-slate-600';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
          <Layers className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-slate-900 text-xl font-bold">{total}</p>
          <p className="text-slate-600 text-xs">Total Analyses</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-slate-900 text-xl font-bold">
            {total > 0 ? `${Math.round(avgConfidence * 100)}%` : '—'}
          </p>
          <p className="text-slate-600 text-xs">Avg. Confidence</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className={`text-xl font-bold ${dominantColor}`}>{dominantLabel}</p>
          <p className="text-slate-600 text-xs">Dominant Sentiment</p>
        </div>
      </div>
    </div>
  );
}

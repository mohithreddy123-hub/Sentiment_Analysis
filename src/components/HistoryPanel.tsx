import { History, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { AnalysisResult, Sentiment } from '../types';

interface Props {
  history: AnalysisResult[];
}

const SENTIMENT_CONFIG: Record<Sentiment, { icon: React.ReactNode; label: string; classes: string }> = {
  positive: {
    icon: <ThumbsUp className="w-3 h-3" />,
    label: 'Positive',
    classes: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  },
  negative: {
    icon: <ThumbsDown className="w-3 h-3" />,
    label: 'Negative',
    classes: 'bg-red-50 border-red-200 text-red-700',
  },
  neutral: {
    icon: <Minus className="w-3 h-3" />,
    label: 'Neutral',
    classes: 'bg-amber-50 border-amber-200 text-amber-700',
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function HistoryPanel({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        <History className="w-4 h-4 text-slate-600" />
        <h2 className="text-slate-900 font-semibold text-base">Recent Analyses</h2>
        <span className="ml-auto text-slate-600 text-xs">{history.length} record{history.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-slate-600 text-xs font-medium uppercase tracking-wider pb-3 px-1">Text</th>
              <th className="text-left text-slate-600 text-xs font-medium uppercase tracking-wider pb-3 px-1 w-28">Sentiment</th>
              <th className="text-right text-slate-600 text-xs font-medium uppercase tracking-wider pb-3 px-1 w-24">Confidence</th>
              <th className="text-right text-slate-600 text-xs font-medium uppercase tracking-wider pb-3 px-1 w-20">Words</th>
              <th className="text-right text-slate-600 text-xs font-medium uppercase tracking-wider pb-3 px-1 w-20">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {history.map((item, i) => {
              const cfg = SENTIMENT_CONFIG[item.sentiment];
              return (
                <tr key={item.id || i} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-1">
                    <p className="text-slate-700 text-xs truncate max-w-xs group-hover:text-slate-900 transition-colors">
                      {item.text_input}
                    </p>
                  </td>
                  <td className="py-3 px-1">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.classes}`}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                  </td>
                  <td className="py-3 px-1 text-right">
                    <span className="text-slate-700 text-xs font-medium tabular-nums">
                      {Math.round(item.confidence * 100)}%
                    </span>
                  </td>
                  <td className="py-3 px-1 text-right text-slate-600 text-xs tabular-nums">
                    {item.word_count}
                  </td>
                  <td className="py-3 px-1 text-right text-slate-500 text-xs">
                    {item.created_at ? timeAgo(item.created_at) : 'just now'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

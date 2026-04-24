import { Sentiment } from '../types';

interface Props {
  sentiment: Sentiment;
  confidence: number;
}

const CONFIG = {
  positive: {
    color: '#059669',
    shadow: '#05966633',
    label: 'Positive',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
  },
  negative: {
    color: '#dc2626',
    shadow: '#dc262633',
    label: 'Negative',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
  },
  neutral: {
    color: '#d97706',
    shadow: '#d9770633',
    label: 'Neutral',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
  },
};

export default function SentimentGauge({ sentiment, confidence }: Props) {
  const cfg = CONFIG[sentiment];
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - confidence * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
          />
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={cfg.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 6px ${cfg.shadow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-slate-900 font-bold text-2xl leading-none">{Math.round(confidence * 100)}%</span>
          <span className="text-slate-500 text-xs mt-1">Confidence</span>
        </div>
      </div>
      <div className={`px-4 py-1.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text} text-sm font-semibold tracking-wide`}>
        {cfg.label}
      </div>
    </div>
  );
}

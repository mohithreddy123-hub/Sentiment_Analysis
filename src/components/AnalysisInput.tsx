import { useState } from 'react';
import { Sparkles, Loader2, RotateCcw, Hash } from 'lucide-react';

interface Props {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function AnalysisInput({ onAnalyze, isLoading }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onAnalyze(text.trim());
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-slate-900 font-semibold text-base">Text Input</h2>
        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
          <Hash className="w-3.5 h-3.5" />
          <span>{text.length} / 5000</span>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 5000))}
          placeholder="Paste social media text, reviews, comments, or any user-generated content here for sentiment analysis..."
          className="w-full h-44 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all leading-relaxed"
        />
        {text.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-slate-600" />
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!text.trim() || isLoading}
        className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Analyze Sentiment</span>
          </>
        )}
      </button>

      <div className="pt-1 border-t border-slate-200 grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Model', value: 'Ensemble' },
          { label: 'Algorithms', value: '3' },
          { label: 'Classes', value: '3' },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-slate-900 text-sm font-semibold">{item.value}</p>
            <p className="text-slate-500 text-xs">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

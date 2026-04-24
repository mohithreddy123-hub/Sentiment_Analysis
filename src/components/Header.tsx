import { Brain, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900 font-bold text-lg leading-tight tracking-tight">Sentiment Analysis Tool</h1>
          </div>
        </div>

      </div>
    </header>
  );
}

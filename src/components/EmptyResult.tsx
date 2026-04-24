import { BarChart2 } from 'lucide-react';

export default function EmptyResult() {
  return (
    <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-64 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
        <BarChart2 className="w-6 h-6 text-slate-400" />
      </div>
      <div className="text-center">
        <p className="text-slate-600 text-sm font-medium">No analysis yet</p>
        <p className="text-slate-500 text-xs mt-1">Submit text to see the ensemble prediction</p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-48">
        {[85, 60, 40].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

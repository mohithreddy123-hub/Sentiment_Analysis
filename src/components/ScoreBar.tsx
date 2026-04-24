interface Props {
  label: string;
  value: number;
  barColor: string;
  trackColor: string;
  textColor: string;
}

export default function ScoreBar({ label, value, barColor, trackColor, textColor }: Props) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-xs">{label}</span>
        <span className="text-xs font-semibold" style={{ color: textColor }}>{pct}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ backgroundColor: trackColor }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

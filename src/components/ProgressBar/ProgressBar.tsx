import './ProgressBar.css';

interface Props {
  /** 0–100. Values outside the range are clamped for display. */
  value: number;
  /** Accessible name, e.g. "Self-reported progress". */
  label: string;
}

/** A percentage with a bar. The number is always visible; the bar only reinforces it. */
export function ProgressBar({ value, label }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-bar__value">{pct}%</span>
    </div>
  );
}

import type { Status } from '../../data/types';
import './StatusBadge.css';

const LABELS: Record<Status, string> = {
  'on-track': 'On track',
  'at-risk': 'At risk',
  'off-track': 'Off track',
  complete: 'Complete',
};

/** A self-reported status. Always renders its label as text; color only reinforces it. */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {LABELS[status]}
    </span>
  );
}

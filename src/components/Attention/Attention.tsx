import type { ReactNode } from 'react';
import './Attention.css';

/**
 * A computed fact past a policy threshold (stale status, overdue date).
 * Emphasis by weight only: no color, because color is reserved for self-reported status.
 */
export function Attention({ children }: { children: ReactNode }) {
  return <span className="attention">{children}</span>;
}

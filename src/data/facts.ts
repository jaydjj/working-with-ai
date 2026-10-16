import type { IsoDate, Project } from './types';

const DAY_MS = 86_400_000;

/** Whole days from `from` to `to` (positive when `to` is later). Both are ISO dates. */
export function daysBetween(from: IsoDate, to: IsoDate): number {
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / DAY_MS);
}

/** Facts computed from a project's own data, relative to the dataset's as-of date. */
export interface ProjectFacts {
  /** Days since the owner last set status. */
  statusAgeDays: number;
  /** Days until due; negative when overdue; null when there is no due date. */
  dueInDays: number | null;
  /** Share of tasks done, 0–100; null when there are no tasks. */
  tasksDonePct: number | null;
  openBlockers: number;
  /** Age in days of the oldest open blocker; null when none are open. */
  oldestBlockerDays: number | null;
}

export function projectFacts(p: Project, asOf: IsoDate): ProjectFacts {
  const open = p.blockers.filter((b) => !b.resolvedAt);
  return {
    statusAgeDays: daysBetween(p.statusUpdatedAt, asOf),
    dueInDays: p.dueDate ? daysBetween(asOf, p.dueDate) : null,
    tasksDonePct: p.tasks.total > 0 ? Math.round((100 * p.tasks.done) / p.tasks.total) : null,
    openBlockers: open.length,
    oldestBlockerDays: open.length ? Math.max(...open.map((b) => daysBetween(b.openedAt, asOf))) : null,
  };
}

export type Status = 'on-track' | 'at-risk' | 'off-track' | 'complete';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
/** ISO date, YYYY-MM-DD. */
export type IsoDate = string;

export interface Person { id: string; name: string; role: string }
export interface Team { id: string; name: string }

export interface Blocker {
  id: string;
  title: string;
  openedAt: IsoDate;
  resolvedAt: IsoDate | null;
  ownerId: string;
}

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  teamId: string;
  memberIds: string[];
  priority: Priority;
  /** Self-reported by the owner. */
  status: Status;
  /** Self-reported by the owner, 0–100. */
  progress: number;
  statusUpdatedAt: IsoDate;
  startDate: IsoDate;
  dueDate: IsoDate | null;
  tasks: { total: number; done: number };
  /** Tasks completed per week, aligned with meta.weekStarts. */
  weeklyCompleted: number[];
  dependsOn: string[];
  blockers: Blocker[];
}

export interface ActivityEvent {
  id: string;
  date: IsoDate;
  projectId: string;
  actorId: string;
  type: 'status_update' | 'blocker_opened' | 'blocker_resolved' | 'comment' | 'due_date_changed';
  text: string;
}

export interface Meta {
  /** Fixed "today" for the dataset. All relative wording is computed from this, never the real clock. */
  asOf: IsoDate;
  weekStarts: IsoDate[];
  label: string;
}

export interface Dataset {
  meta: Meta;
  people: Person[];
  teams: Team[];
  projects: Project[];
  activity: ActivityEvent[];
}

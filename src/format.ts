const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Formats an ISO date (YYYY-MM-DD) as "12 Oct 2026". */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso + 'T00:00:00Z'));
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** "today", "yesterday", "45 days ago". */
export function formatAgo(days: number): string {
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${plural(days, 'day')} ago`;
}

/** "Due today", "Due in 18 days", "17 days overdue". */
export function formatDue(daysUntil: number): string {
  if (daysUntil === 0) return 'Due today';
  if (daysUntil > 0) return daysUntil === 1 ? 'Due tomorrow' : `Due in ${plural(daysUntil, 'day')}`;
  return `${plural(-daysUntil, 'day')} overdue`;
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Formats an ISO date (YYYY-MM-DD) as "12 Oct 2026". */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso + 'T00:00:00Z'));
}

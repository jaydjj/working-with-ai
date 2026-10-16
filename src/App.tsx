import { dataset, isStress } from './data';
import type { Project } from './data/types';
import { formatAgo, formatDate, formatDue } from './format';
import { projectFacts } from './data/facts';
import { STALE_AFTER_DAYS } from './policy';
import { Attention } from './components/Attention/Attention';
import { Table, type Column } from './components/Table/Table';
import { StatusBadge } from './components/StatusBadge/StatusBadge';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { AppFooter } from './components/AppFooter/AppFooter';
import './App.css';

const peopleById = new Map(dataset.people.map((p) => [p.id, p]));
const rows = [...dataset.projects].sort((a, b) => a.name.localeCompare(b.name));
const factsById = new Map(rows.map((p) => [p.id, projectFacts(p, dataset.meta.asOf)]));
const facts = (p: Project) => factsById.get(p.id)!;

const columns: Column<Project>[] = [
  { key: 'name', header: 'Project', wrap: true, width: '22%', render: (p) => <span className="app__project-name">{p.name}</span> },
  {
    key: 'owner',
    header: 'Owner',
    width: '14%',
    render: (p) => {
      const name = peopleById.get(p.ownerId)?.name ?? 'Unassigned';
      return <span title={name}>{name}</span>;
    },
  },
  {
    key: 'status',
    header: 'Status',
    note: 'self-reported · age computed',
    width: '17%',
    render: (p) => <StatusBadge status={p.status} />,
    detail: (p) => {
      const days = facts(p).statusAgeDays;
      const text = `Updated ${formatAgo(days)}`;
      return p.status !== 'complete' && days > STALE_AFTER_DAYS ? <Attention>{text}</Attention> : text;
    },
  },
  {
    key: 'progress',
    header: 'Progress',
    note: 'self-reported · tasks counted',
    width: '17%',
    render: (p) => <ProgressBar value={p.progress} label="Self-reported progress" />,
    detail: (p) => {
      const pct = facts(p).tasksDonePct;
      return pct === null ? 'No tasks' : `${pct}% of tasks done`;
    },
  },
  {
    key: 'due',
    header: 'Due',
    note: 'set by owner',
    width: '16%',
    render: (p) => {
      const days = facts(p).dueInDays;
      if (days === null) return 'No due date';
      // A finished project isn't overdue or upcoming; the data has no completion date, so show the plain date.
      if (p.status === 'complete') return formatDate(p.dueDate!);
      const text = formatDue(days);
      return <span title={formatDate(p.dueDate!)}>{days < 0 ? <Attention>{text}</Attention> : text}</span>;
    },
  },
  {
    key: 'blockers',
    header: 'Blockers',
    note: 'logged by team',
    width: '14%',
    render: (p) => {
      const n = facts(p).openBlockers;
      return n ? `${n} open` : 'None open';
    },
    detail: (p) => {
      const days = facts(p).oldestBlockerDays;
      return days === null ? null : `oldest ${days === 1 ? '1 day' : `${days} days`}`;
    },
  },
];

export function App() {
  const asOf = formatDate(dataset.meta.asOf);
  return (
    <div className="app">
      <header className="app__header">
        <p className="app__eyebrow">{dataset.meta.label}</p>
        <h1 className="app__title">Project portfolio</h1>
        <p className="app__summary">{rows.length} projects · as of {asOf}</p>
        {isStress && (
          <p className="app__stress" role="status">
            Stress data: messy values for layout testing. <a href="./">Back to normal data</a>
          </p>
        )}
      </header>
      <main>
        <Table caption="Projects with owner, self-reported status and progress, due date and open blockers" columns={columns} rows={rows} rowKey={(p) => p.id} />
      </main>
      <AppFooter asOf={asOf} />
    </div>
  );
}

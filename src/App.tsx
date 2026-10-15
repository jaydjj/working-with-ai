import { dataset, isStress } from './data';
import type { Project } from './data/types';
import { formatDate } from './format';
import { Table, type Column } from './components/Table/Table';
import { StatusBadge } from './components/StatusBadge/StatusBadge';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { AppFooter } from './components/AppFooter/AppFooter';
import './App.css';

const peopleById = new Map(dataset.people.map((p) => [p.id, p]));
const rows = [...dataset.projects].sort((a, b) => a.name.localeCompare(b.name));

const columns: Column<Project>[] = [
  { key: 'name', header: 'Project', wrap: true, width: '44%', render: (p) => <span className="app__project-name">{p.name}</span> },
  {
    key: 'owner',
    header: 'Owner',
    width: '20%',
    render: (p) => {
      const name = peopleById.get(p.ownerId)?.name ?? 'Unassigned';
      return <span title={name}>{name}</span>;
    },
  },
  { key: 'status', header: 'Status', note: 'self-reported', width: '16%', render: (p) => <StatusBadge status={p.status} /> },
  { key: 'progress', header: 'Progress', note: 'self-reported', width: '20%', render: (p) => <ProgressBar value={p.progress} label="Self-reported progress" /> },
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
        <Table caption="Projects with owner, self-reported status and self-reported progress" columns={columns} rows={rows} rowKey={(p) => p.id} />
      </main>
      <AppFooter asOf={asOf} />
    </div>
  );
}

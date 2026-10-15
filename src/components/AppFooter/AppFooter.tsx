import './AppFooter.css';

export function AppFooter({ asOf }: { asOf: string }) {
  return (
    <footer className="app-footer">
      <span>Fictional data, as of {asOf}.</span>
      <a href="docs/">Design system and decision log</a>
    </footer>
  );
}

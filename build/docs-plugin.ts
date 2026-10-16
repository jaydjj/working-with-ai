/**
 * Renders docs/*.md to HTML at build time, styled with the app's own tokens.
 * The markdown is the source of truth; the generated HTML is never edited by hand.
 * Output: /docs/index.html plus /docs/<name>.html for each markdown file.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { Marked } from 'marked';
import type { Plugin } from 'vite';

const root = resolve(import.meta.dirname, '..');
const docsDir = resolve(root, 'docs');
/** Preferred nav order; any other docs follow alphabetically. */
const ORDER = ['plan', 'design-system', 'decisions', 'discovery', 'opportunities'];
/** The app's font, self-hosted next to the docs pages so every viewer sees the same type. */
const FONT_FILE = resolve(root, 'node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2');
const FONT_FACE = `@font-face { font-family: "Plus Jakarta Sans Variable"; font-style: normal; font-display: swap; font-weight: 200 800; src: url(font.woff2) format("woff2"); }`;

interface Doc { slug: string; title: string; html: string }

const marked = new Marked({
  renderer: {
    // Cross-links between docs are written as ./other.md in the source.
    link({ href, tokens }) {
      const target = href.replace(/^(\.\/)?([\w-]+)\.md(#.*)?$/, '$2.html$3');
      return `<a href="${target}">${this.parser.parseInline(tokens)}</a>`;
    },
  },
});

function loadDocs(): Doc[] {
  if (!existsSync(docsDir)) return [];
  const slugs = readdirSync(docsDir).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
  slugs.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  return slugs.map((slug) => {
    const md = readFileSync(resolve(docsDir, `${slug}.md`), 'utf8');
    const title = md.match(/^#\s+(.+)$/m)?.[1] ?? slug;
    return { slug, title, html: marked.parse(md) as string };
  });
}

function rank(slug: string) {
  const i = ORDER.indexOf(slug);
  return i === -1 ? ORDER.length : i;
}

function page(docs: Doc[], current: string, title: string, body: string) {
  const tokens = readFileSync(resolve(root, 'src/tokens.css'), 'utf8');
  const css = readFileSync(resolve(import.meta.dirname, 'docs.css'), 'utf8');
  const nav = docs
    .map((d) => `<a href="${d.slug}.html"${d.slug === current ? ' aria-current="page"' : ''}>${d.title}</a>`)
    .join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22%3E%3Crect width=%2216%22 height=%2216%22 rx=%223%22 fill=%22%234651d9%22/%3E%3C/svg%3E" />
<title>${title} · Portfolio docs</title>
<style>${FONT_FACE}\n${tokens}\n${css}</style>
</head>
<body>
<header class="docs-header">
  <a class="docs-back" href="../">← Portfolio</a>
  <nav class="docs-nav" aria-label="Docs">${nav}</nav>
</header>
<main class="docs-body">${body}</main>
<footer class="docs-footer">Generated from <code>docs/${current === 'index' ? '*' : current}.md</code>. Edit the markdown, not this page.</footer>
</body>
</html>`;
}

function render(): Map<string, string> {
  const docs = loadDocs();
  const files = new Map<string, string>();
  const list = docs.map((d) => `<li><a href="${d.slug}.html">${d.title}</a></li>`).join('');
  files.set('index.html', page(docs, 'index', 'Docs', `<h1>Docs</h1><p>Living documentation for the portfolio dashboard, read by the designer and by AI.</p><ul>${list}</ul>`));
  for (const d of docs) files.set(`${d.slug}.html`, page(docs, d.slug, d.title, d.html));
  return files;
}

export function docsPlugin(): Plugin {
  return {
    name: 'docs',
    generateBundle() {
      for (const [name, source] of render()) {
        this.emitFile({ type: 'asset', fileName: `docs/${name}`, source });
      }
      this.emitFile({ type: 'asset', fileName: 'docs/font.woff2', source: readFileSync(FONT_FILE) });
    },
    configureServer(server) {
      server.watcher.add(docsDir);
      server.middlewares.use((req, res, next) => {
        if (req.url?.endsWith('/docs/font.woff2')) {
          res.setHeader('Content-Type', 'font/woff2');
          return res.end(readFileSync(FONT_FILE));
        }
        const m = req.url?.match(/\/docs\/([\w-]*\.html)?(\?.*)?$/);
        if (!m) return next();
        const html = render().get(m[1] || 'index.html');
        if (!html) return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
      });
    },
  };
}

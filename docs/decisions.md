# Decision log

What was chosen, what else was considered, and who decided. **Designer** means Jayd decided. **AI default, open to review** means Claude set it up to get started and it stands until the designer says otherwise.

Type is **policy** (what something is), **design** (how it looks or behaves) or **engineering** (how it's built).

| # | Decision | Type | Alternatives considered | Decided by |
|---|---|---|---|---|
| 1 | Feature: portfolio dashboard for a fictional mid-size software company (Northwind Software). Baseline table shows project, owner, self-reported status, self-reported progress. | design | — | Designer (brief) |
| 2 | Stack: React, Vite, TypeScript, local JSON, CSS tokens, colocated component CSS, markdown docs. No UI or state library. | engineering | — | Designer (brief) |
| 3 | Dataset "as of" date fixed at **12 Oct 2026**. | policy | Real clock (rejected: wording drifts) | AI default, open to review |
| 4 | Tokens in two layers: raw palette, then semantic tokens. Components may only use semantic tokens. | engineering | Single flat token list | AI default, open to review |
| 5 | Status shows as a pill with dot and text label. Column headers carry a "self-reported" note. | design | Text only; color only (rejected: violates principle 2) | AI default, open to review |
| 6 | Progress bar is neutral gray, not tinted by status. | design | Tint by status (rejected: implies the bar is a judgment) | AI default, open to review |
| 7 | Project names wrap; other cells stay on one line and truncate. | design | Truncate names (hides the identifying text) | AI default, open to review |
| 8 | Default sort is alphabetical by project name. | design | Data order; by status | AI default, open to review |
| 9 | Publishing: `main` deploys to the site root, frozen `baseline` branch deploys to `/baseline/`, both from one GitHub Actions run. | engineering | Tags (not available here); separate repos | Designer (brief) |
| 10 | Docs are rendered from `docs/*.md` to `/docs/` at build time using the app's tokens. | engineering | Hand-written HTML; a docs framework | Designer (brief) |

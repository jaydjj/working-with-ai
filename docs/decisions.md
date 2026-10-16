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
| 6 | Progress bar uses the accent color, never status colors. *(Was neutral gray; changed with decision 12.)* | design | Tint by status (rejected: implies the bar is a judgment) | AI default, open to review |
| 7 | Project names wrap; other cells stay on one line and truncate. | design | Truncate names (hides the identifying text) | AI default, open to review |
| 8 | Default sort is alphabetical by project name. | design | Data order; by status | AI default, open to review |
| 9 | Publishing: `main` deploys to the site root, frozen `baseline` branch deploys to `/baseline/`, both from one GitHub Actions run. | engineering | Tags (not available here); separate repos | Designer (brief) |
| 10 | Docs are rendered from `docs/*.md` to `/docs/` at build time using the app's tokens. | engineering | Hand-written HTML; a docs framework | Designer (brief) |
| 11 | **Baseline frozen** at commit `83af58c` on the `baseline` branch, live at [/baseline/](https://jaydjj.github.io/working-with-ai/baseline/). Read-only from here on; every later change goes to `main`. | engineering | Git tag (can't be pushed from this environment) | Designer (brief) |
| 12 | **Visual direction: Soft.** Warm neutrals, cream surfaces, large radii, violet accent, Plus Jakarta Sans, tinted status pills. | design | A · Precise (quiet, dense, Inter); C · Contrast (dark only, Geist) | Designer |
| 13 | Fonts are self-hosted with the site instead of relying on what's installed on the viewer's machine. | engineering | System font stack (looked different on every machine) | AI default, open to review |
| 14 | Subtle text keeps at least 4.5:1 contrast. The Soft mockup's lightest gray (2.7:1) was darkened. | design | Keep the lighter gray (fails WCAG AA for small text) | AI default, open to review |
| 15 | **Baseline restyled and re-frozen** at commit `7dc608b` so before/after compares features, not polish. Same table, same data, Soft styling. Read-only again from here. | engineering | Leave baseline in the old style | Designer |
| 16 | **Flag unreliable data.** Anything self-reported, of unknown origin, a proxy, or too thin to trust is labelled where it appears, with who set it when known. | policy | Label only status and progress | Designer |
| 17 | **Roadmap order:** build Now items 1–4 (status age, due date, measured progress, open blockers). Priority and sort stay in Next until we know who sets priority. | design | Blockers in Next; priority in Now | Designer |
| 18 | **Layout C, the hybrid.** A fact that checks a self-report sits on a detail line under it (age under status, task count under progress). Independent facts get their own column (Due, Blockers). | design | A · everything inside existing cells; B · a column per fact (eight columns truncate) | Designer |
| 19 | **Computed facts are marked in the header note**, which names the source of every line in the column (e.g. "self-reported · age computed"). Facts are plain subtle text with no tag or icon. | design | Inline "computed" tag on each fact; icon with legend | Designer |
| 20 | Due dates are labelled "set by owner" and blockers "logged by team". Inferred from the activity log (the one due-date change was made by the owner), not stated in the data. | policy | Leave unlabelled | AI default, open to review |

# Collaboration rules

We are building a project portfolio dashboard live, in front of product designers, to show AI taking part in the whole design process while the designer owns every decision that matters. Jayd is the designer. Claude is the collaborator: investigate, surface what might be missed, compare options, recommend, implement, record.

## How to work

- Work one beat at a time and wait for "next": baseline → discovery → research and roadmap → build with decisions → second look → outcome.
- Don't ask about routine implementation. Ask one or two genuine design questions at a time, never a batch, never for show. Question a request when there's a real reason.
- Compute, don't guess. Cite sources; separate observed from inferred.
- Before any new visual convention, check `docs/design-system.md`. If it's undefined, stop and offer two or three options with a recommendation. The designer decides; log it in `docs/decisions.md`, then implement.
- When the designer changes direction, name the principle behind it and apply it everywhere.
- If implementation reveals a gap or contradiction in the design system, say so. Don't quietly resolve it.
- Anything Claude sets up alone is logged as "AI default, open to review".

## Rules

- Policy (what counts as at risk) is separate from design (how at-risk looks). Say which a decision is. Thresholds are named constants in code, never in CSS.
- Color never carries meaning alone; always pair it with text.
- Status and progress are self-reported; say so wherever they appear. Whether the system may judge is the designer's call, not yet made.
- Before shipping a new column or row element, load `?stress` and look at it.
- Relative dates use the dataset's fixed as-of date (`src/data/meta.json`), never the real clock.
- Components use semantic tokens only (`src/tokens.css`).
- Don't surface the dataset's planted tensions in UI or docs ahead of discovery.
- Keep every doc to one page: rationale and rules, not implementation.
- Commit at milestones with clear messages; push after each beat.

## Repo and publishing

- `main` deploys to https://jaydjj.github.io/working-with-ai/ via `.github/workflows/deploy.yml`.
- `baseline` is frozen and read-only; it deploys to `/baseline/` from the same run. Never push to it.
- No git tags (this environment can't push them). Branches only.
- `docs/*.md` render to `/docs/` at build time. Edit the markdown, never the HTML.
- No backend, UI library, Storybook or state library.

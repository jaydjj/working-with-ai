# Design system

Intent and rules for the portfolio dashboard. Implementation lives in `src/`; this page says *why* and *when*. It starts small on purpose and grows from the work. Anything set up without the designer is marked as an AI default in the [decision log](./decisions.md).

## Principles

1. **Say who said it.** Status and progress are self-reported by project owners. Wherever they appear, the UI says so. Facts the system can compute are a different kind of information and must never be dressed up as the owner's word, or the other way around. The same goes for any data that's unreliable (of unknown origin, a proxy, or too thin to trust): flag it where it appears.
2. **Color never carries meaning alone.** Every color-coded element also has text. Color reinforces; it never replaces.
3. **Real data sets the layout.** Design for the longest name, the oldest date and the missing value, not the tidy average. Check every new column or row element against `?stress` data before shipping it.

## Policy and design are separate

- **Policy** decides what something *is* (what counts as at risk, how many days makes a status stale). Policy values are named constants in code, never buried in CSS or copy.
- **Design** decides how it *looks* (how at-risk is shown).
- Every entry in the decision log says which one it is.

## Visual direction: Soft

Warm off-white canvas, cream surfaces, generous spacing, large radii and a single violet accent. Typography is Plus Jakarta Sans, self-hosted so every viewer sees the same type. Color is kept for meaning (status) and the one accent; everything else is warm neutral.

## Tokens

- Two layers in `src/tokens.css`: a raw palette (`--palette-*`) and semantic tokens (`--color-*`, `--space-*`, `--font-*`, `--radius-*`).
- Components use semantic tokens only. A component that needs a new meaning gets a new semantic token, not a palette value.
- Status colors exist as `--color-status-<status>-bg | -fg | -dot` and are reserved for self-reported status.
- Text tokens, including `--color-text-subtle`, keep at least 4.5:1 contrast on surfaces. Small, quiet text still carries meaning (for example "self-reported").
- The accent (`--color-accent`) marks interactive and neutral data elements, never a judgment.

## Components

| Component | Use it for | Rules |
|---|---|---|
| **Table** | Lists of records with comparable attributes | Sits on a borderless card with a soft shadow. Headers are sentence case. One column holds the primary text and wraps; all other columns stay on one line and truncate with the full value available on hover. Header notes sit under the column name and say where every line in the column comes from ("self-reported", "set by owner", "self-reported · age computed"). A cell may carry one **detail line**: a fact that checks the value above it, in small subtle text. A fact that stands on its own gets a column instead. |
| **StatusBadge** | A self-reported project status | Always shows the label. Only for status as reported by the owner. |
| **ProgressBar** | A 0–100 percentage | The number is always visible. Uses the accent color, never status colors: progress is not a judgment. |
| **Attention** | A computed fact past a policy threshold (status older than the stale limit, a date past due) | Weight only: full-strength text in semibold. Never a color, since color is reserved for self-reported status. The words must still say what's wrong on their own. |
| **AppFooter** | Data provenance and the link to these docs | One per page. States the as-of date. |

## Patterns

- **Computed facts.** Facts the system derives (status age, share of tasks done, blocker age) are plain text, never badges or bars, so they can't be mistaken for the owner's word. Their source is named in the header note, not on every row.
- **Missing values** are stated in words that say what's missing ("No due date", "None open"). Never a blank or a dash.
- **Provenance.** Every column says who set its data. When the source is unknown, say "origin unknown" rather than leaving it blank.

- **Dates.** The dataset has a fixed "as of" date. Relative wording ("due in 3 days") is computed from it, never from the real clock. Absolute dates read as `12 Oct 2026`.
- **Stress data.** Add `?stress` to the URL to load messy data (very long names, many blockers, very old statuses, far-off and long-overdue dates).

## Open questions

- Should the system ever judge a project's health, or only show facts beside the owner's status?
- What is the default sort order, and is it the designer's or the data's?
- Dark mode: needed for this audience, or not?

# Discovery

What data we have, what the best tools do with the same kind of data, and what we could do now without collecting anything new. Numbers are computed from `src/data/` as of **12 Oct 2026**. **Observed** means read from the data or a product's own docs; **inferred** is Claude's reading.

## Data inventory

14 projects, 10 people, 4 teams, 59 activity events (30 status updates, 18 comments, 7 blockers opened, 3 resolved, 1 due date moved). The table shows 4 of 15 project fields.

| Field | What it holds | Shown |
|---|---|---|
| `name`, `ownerId` | Project and owner | Yes |
| `status`, `progress` | Self-reported by the owner | Yes |
| `priority` | 1 critical, 6 high, 5 medium, 2 low | No |
| `teamId`, `memberIds` | 4 teams; 2–4 people per project | No |
| `startDate`, `dueDate` | Due date missing on 3 projects | No |
| `statusUpdatedAt` | When the owner last set status | No |
| `tasks` | Done and total task counts | No |
| `weeklyCompleted` | Tasks done per week, last 6 weeks | No |
| `dependsOn` | 3 projects depend on another | No |
| `blockers` | 7 total, 4 open, each with an owner and dates | No |
| `activity` | Status changes, comments and blocker events since 20 Jul | No |

## What best-in-class tools do

Compared: **Linear**, **Asana Portfolios**, **Atlassian Projects** and **Jira Plans**, chosen because they're widely praised for UX and all cover portfolio status. *(observed, sources below)*

- **Health stays human.** In Linear, Asana and Atlassian Projects, a person sets on track / at risk / off track. Linear tried computing it from velocity and found progress "is not something that can be predicted based on quantitative data alone."
- **Instead, they surround it with facts.** Linear marks a stale report "Update missing" and shows it in grey. Its project graph plots scope, completed work and a predicted finish date based on velocity. Asana measures progress from tasks completed.
- **Change is visible.** Linear lists property changes, such as target dates, alongside the updates. Atlassian makes it "crystal clear when a project's status or target date changes."
- **Blockers and risks are part of the update.** Asana's status template has a blockers block, and Atlassian spotlights risks and decisions every week.
- **They show how projects depend on each other.** Jira Plans draws dependencies on the timeline and warns when work is scheduled before something it depends on is finished.
- **They show who carries the load.** Asana has a workload view and can sort by status, owner or custom field.

## Gaps, mapped to data we already have

| Gap | Pattern | Our data | What it would show today |
|---|---|---|---|
| Status age | Linear "Update missing" | `statusUpdatedAt` | 4 of 13 active projects haven't been updated in over 14 days (Admin Tool Accessibility: 45 days). The 14-day cut-off is Claude's placeholder; the real threshold is a policy call. |
| Measured progress beside reported | Asana task progress | `tasks` | Payments reports 75%, but its tasks are 46% done. Data Warehouse reports 55%, with tasks 80% done. |
| Pace and projection | Linear project graph | `weeklyCompleted`, `tasks` | Payments' weekly completions fell from 11 to 1, with 52 tasks left and the due date 18 days away |
| Dates and lateness | Asana due dates, timeline | `dueDate`, `startDate` | Admin Tool Accessibility is 17 days overdue but reports on track. 3 projects have no date. |
| Blockers | Asana, Atlassian updates | `blockers` | 4 open; the oldest (PCI, waiting on the auditor) has been open 49 days |
| Dependencies | Jira Plans warnings | `dependsOn`, `dueDate` | Payments (due 30 Oct) depends on PCI (due 13 Nov) |
| Workload | Asana workload | `memberIds` | Chen Wei is on 10 of 13 active projects; the next most is 5 |
| Change history | Linear, Atlassian | `activity` | Observability went from on track to off track in 4 weeks; Billing's due date moved 2 weeks |
| Sort and summary | Asana sort, status counts | `priority`, `status`, `teamId` | The only critical project sits 9th, because the sort is alphabetical |

## What we can do now

Every gap above uses data we already collect. Nothing needs a backend or new input. *(inferred)* The cheapest wins with the most effect are status age, measured progress and due dates beside the owner's status. Each one turns a contradiction that's invisible today into something you can read in one line. Blockers, dependencies and workload come next. A computed health verdict is the one pattern none of these tools ship, and it's still an open question for the designer.

## Sources

[Linear: project updates](https://linear.app/docs/initiative-and-project-updates) · [Linear: how we built project updates](https://linear.app/now/how-we-built-project-updates) · [Linear: project graph](https://linear.app/docs/project-graph) · [Asana: portfolio management](https://help.asana.com/s/article/portfolio-management) · [Asana: portfolio progress](https://help.asana.com/s/article/portfolio-progress-and-reporting) · [Atlassian: what is a project](https://support.atlassian.com/platform-experiences/docs/what-is-a-project/) · [Atlassian: project communication](https://www.atlassian.com/software/atlas/project-communication) · [Jira Plans: warnings](https://support.atlassian.com/jira-software-cloud/docs/what-are-warnings-in-advanced-roadmaps) · [Jira Plans: dependency warnings (community)](https://community.atlassian.com/forums/Advanced-Planning-in-Jira/Dependency-warning-explaination/m-p/3059690)

# Roadmap

Now / Next / Later, built from the gaps in [Discovery](./discovery.md). Every item uses data we already collect. Numbers are as of **12 Oct 2026**. **Value** is how much it changes what a reader decides; **confidence** is how sure we are the data supports it. Items are placed by value and confidence first; dependencies and effort break ties. The designer decides.

## Now: can I trust this status, and what's in the way?

| Improvement | User problem | Evidence | Data | Depends on | Value | Confidence |
|---|---|---|---|---|---|---|
| **1. Status age** ("updated 45 days ago") | Can't tell whether a status is current | 4 of 13 active projects not updated in over 14 days; Linear flags "Update missing" | `statusUpdatedAt` | Stale threshold (policy) | High | High |
| **2. Due date**, worded relative to the as-of date | Can't see what's late or close | Admin Tool Accessibility is 17 days overdue and reports on track; 3 projects have no date | `dueDate` | How a missing date reads (design) | High | High |
| **3. Measured progress** beside reported | The reported % can't be checked | Payments: 75% reported, 46% of tasks done. Data Warehouse: 55% reported, 80% done. Asana measures progress from tasks. | `tasks` | How a computed fact looks next to a self-reported one (design) | High | Medium: task counts are a proxy too |
| **4. Open blockers**: count and oldest age | Blockers are invisible | 4 open; the oldest has been open 49 days | `blockers` | Space in the row, or a detail view | High | High |

## Next: what matters most

| Improvement | User problem | Evidence | Data | Depends on | Value | Confidence |
|---|---|---|---|---|---|---|
| **5. Priority, sort and status summary** | The most important work is buried | The only critical project sits 9th of 14 | `priority`, `status` | Default sort (open question); who sets priority | Medium | Medium: priority's origin is unknown (not marked self-reported or system-set) |
| **6. Weekly pace** trend | Can't see work slowing down | Payments went from 11 tasks a week to 1 | `weeklyCompleted` | Chart convention (design system) | Medium | Medium: only 6 weeks of data |

## Later: needs a second view or a policy call

| Improvement | User problem | Evidence | Data | Depends on | Value | Confidence |
|---|---|---|---|---|---|---|
| **7. Dependencies** with date conflicts | Knock-on risk is hidden | Payments (due 30 Oct) depends on PCI (due 13 Nov) | `dependsOn`, `dueDate` | Project detail view | High, for few projects | Medium |
| **8. Workload by person** | One person can become a bottleneck | Chen Wei is on 10 of 13 active projects | `memberIds` | A second view | Medium | Medium: membership isn't time spent |
| **9. Project history** | Can't see how a project got here | Observability went from on track to off track in 4 weeks; Billing's due date moved | `activity` | Project detail view | Medium | High |
| **10. Projected finish** | Can't tell if the due date is realistic | Payments has 52 tasks left and 18 days | `weeklyCompleted`, `tasks` | Whether the system may judge (open) | Medium | Low: Linear's own projection carries ±40% |

## Order

**Chosen by the designer:** build 1 to 4 now. Item 5 stays in Next; before it starts, find out who sets priority. Sortable headers are the extra work that keeps it there. Items 7 to 9 wait for a project detail view. Item 10 waits for the decision on whether the system may judge.

# Job Tracker

Monorepo for a job application tracker. The product ships in two phases: a Google Apps Script backend first, then a Hono API that takes its place. The frontend stays in one workspace across both phases.

## Phases

### V1 — Apps Script

`backend/v1-apps-script` is the first backend. It runs as a Google Apps Script web app so the tracker can work against Google services without a separate server. The frontend calls this Apps Script endpoint.

### V2 — Hono

`backend/v2-hono` is the second backend. It reimplements the same API with [Hono](https://hono.dev). The frontend keeps its current home; only the server behind it changes.

## Layout

| Path | Role |
| --- | --- |
| `frontend/` | Client app, shared by V1 and V2 |
| `backend/v1-apps-script/` | Google Apps Script backend |
| `backend/v2-hono/` | Hono backend |
| `docs/architecture.md` | Architecture notes |
| `docs/diagrams/` | Diagrams |
| `docs/ui-mockups/` | UI mockups |

## Workspaces

The root `package.json` defines npm workspaces for `frontend`, `backend/v1-apps-script`, and `backend/v2-hono`. Each workspace has a minimal `package.json` and no dependencies installed yet.

```bash
npm install
```

# V2 Hono

Node API that will replace the Apps Script backend. Hono serves the routes, and `tsx` runs the TypeScript entry file directly.

## Run locally

From this folder:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

`npm run dev` runs `tsx src/index.ts`. The process reads `PORT` from the environment and listens on `http://localhost:8787` when that variable is left at the example value.

From the repo root, after a workspace install:

```powershell
npm run dev -w @job-tracker/v2-hono
```

## Routes

| Method | Path | Status |
| --- | --- | --- |
| GET | `/listJobs` | stub |
| GET | `/getJob` | stub |
| POST | `/createJob` | stub |
| POST | `/updateJob` | stub |
| POST | `/deleteJob` | stub |
| GET | `/listInterviews` | stub |
| GET | `/getInterview` | stub |
| POST | `/createInterview` | stub |
| POST | `/updateInterview` | stub |
| POST | `/deleteInterview` | stub |
| GET | `/getAnalysis` | stub |
| POST | `/scrape` | V2 stub |
| POST | `/ai` | V2 stub |
| GET | `/listApplications` | V2 stub |

Each handler returns `{}`. `src/lib/response.ts` exports `ok()` and `err()` for the JSON envelope those handlers will use later.

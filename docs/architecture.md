# Architecture

## 0. Purpose

A personal web app to track job applications, interview processes, and (in V2)
add AI-powered scraping + resume generation. Data lives in Google Sheets.
Frontend is React. Backend evolves from Google Apps Script (V1) to Hono/Node (V2)
without changing the frontend contract.

## 1. Guiding Principles

- Repository Pattern: frontend talks to a stable API contract, never to storage directly.
- Two-phase delivery: V1 ships fast on Apps Script; V2 upgrades backend with zero FE changes.
- Cost-first: $0 hosting through V1, ≤$5/mo in V2 (OpenAI pay-as-you-go).
- No files in V1. Resume output is copyable text only. V2 keeps it text-only too.
- Secrets never touch the browser.

## 2. Version Roadmap

### Version 1 — Personal Job Tracker (MVP)

Features:

- Create / edit / list jobs (link, company, uniqueId, date, location, role, techStack, status, currentStep, notes)
- Create / edit / list interview steps tied to a job
- Dashboard with simple charts (jobs by status, by month, by tech)
- Visual tracking of each job's pipeline

Storage: Google Sheets (Jobs, Interviews sheets)
Backend: Google Apps Script Web App (`doGet`, `doPost`)
Frontend: React + Vite + TS, deployed on Vercel

### Version 2 — Deep Details + AI

Adds:

- Paste a job link → auto-scrape title, location, JD text → save
- With JD, call OpenAI → generate tailored resume (copyable block, no file)
- Save all application-form text answers per job
- Optional: richer dashboard analytics

Backend: migrate to Hono on Node (Cloudflare Workers / Vercel functions)
Same FE contract. Apps Script endpoints retired.
Storage: still Google Sheets (via `googleapis`), optional Postgres later.

## 3. System Architecture

### Version 1

┌──────────────────────┐
│ React + Vite (FE) │
│ - JobList, JobDetail │
│ - InterviewEditor │
│ - Dashboard │
└──────────┬───────────┘
│ fetch(JSON)
┌──────────▼───────────┐
│ Apps Script Web App │
│ doGet → read │
│ doPost → create/upd │
└──────────┬───────────┘
│ SpreadsheetApp
┌──────────▼───────────┐
│ Google Sheets │
│ - Jobs │
│ - Interviews │
└──────────────────────┘

### Version 2

┌──────────────────────┐
│ React + Vite (FE) │ (unchanged)
└──────────┬───────────┘
│ same JSON contract
┌──────────▼───────────┐
│ Hono API (Node) │
│ /jobs /interviews │
│ /scrape /ai/resume │
│ /applications │
└──┬────────┬──────────┘
│ │
│ ├──► OpenAI API (resume gen)
│ ├──► Scraper (Cheerio / fetch)
│ └──► Google Sheets API
│
┌──▼───────────────┐
│ Google Sheets │ (unchanged schema)
└──────────────────┘

## 4. API Contract (frozen across V1→V2)

All endpoints return `{ ok: boolean, data?: T, error?: string }`.

GET /listJobs
GET /getJob?id=:jobId
GET /listInterviews?jobId=:jobId
GET /analysis → aggregated stats
POST /createJob { job fields }
POST /updateJob { jobId, ...fields }
POST /deleteJob { jobId }
POST /createInterview { jobId, ...fields }
POST /updateInterview { interviewId, ...fields }
POST /deleteInterview { interviewId }

V2-only (added later, same contract):
POST /scrapeJob { url } → { title, location, description }
POST /generateResume { jobId, tone? } → { text }
POST /saveApplicationForm { jobId, answers: [{ question, answer }] }

## 5. Data Model (Google Sheets)

### Sheet: Jobs

| jobId | link | company | date | location | role | techStack | status | currentStep | notes | createdAt | updatedAt |

### Sheet: Interviews

| interviewId | jobId | round | date | type | interviewer | notes | outcome | createdAt | updatedAt |

### Sheet: Applications (V2)

| appId | jobId | question | answer | savedAt |

### Sheet: Analysis (formulas only)

- COUNTIF by status, by tech, by month
- Pivot tables feeding charts

## 6. Frontend Structure

src/
main.tsx
App.tsx
routes/
JobList.tsx
JobDetail.tsx
Dashboard.tsx
components/
JobForm.tsx
InterviewList.tsx
StatusBadge.tsx
PipelineTracker.tsx
Charts/
JobsByStatus.tsx
JobsByMonth.tsx
api/
client.ts # fetch wrapper, base URL from env
jobs.ts # typed calls
interviews.ts
hooks/
useJobs.ts # TanStack Query
useInterviews.ts
types/
job.ts
interview.ts
lib/
validation.ts # Zod schemas

## 7. Backend Structure

### V1 — Apps Script

Code.gs
doGet(e)
doPost(e)
SheetService.gs
getJobs / getJob / createJob / updateJob / deleteJob
getInterviews / createInterview / updateInterview / deleteInterview
AnalysisService.gs
getAnalysis()

### V2 — Hono

src/
index.ts # Hono app, route mounting
routes/
jobs.ts
interviews.ts
analysis.ts
scrape.ts # V2
ai.ts # V2
applications.ts # V2
services/
jobService.ts
interviewService.ts
analysisService.ts
scrapeService.ts # V2
aiService.ts # V2
repositories/
jobRepo.interface.ts
jobRepo.sheets.ts
interviewRepo.sheets.ts
applicationRepo.sheets.ts
integrations/
sheets.ts # googleapis wrapper
openai.ts # V2
scraper.ts # V2
lib/
env.ts # Zod-validated env
response.ts # ok/error helpers

## 8. Environment & Secrets

V1 (Apps Script):

- Script Properties: SHEET_ID, API_TOKEN (shared secret)
- FE env: VITE_API_URL, VITE_API_TOKEN

V2 (Hono):

- .env: SHEET_ID, GOOGLE_SERVICE_ACCOUNT_JSON, OPENAI_API_KEY, API_TOKEN
- FE env unchanged

## 9. Deployment

V1: Vercel (FE) + Apps Script Web App (BE)
V2: Vercel (FE) + Cloudflare Workers or Vercel Functions (Hono BE)
Sheets stays as DB in both. Postgres is a future swap behind the repo interface.

## 10. Non-Goals

- No file/PDF generation in V1 or V2 (text only)
- No multi-user auth beyond a shared token
- No mobile app
- No real-time collaboration

## 11. Migration Path V1 → V2

1. Build Hono backend with same endpoints as Apps Script.
2. Point VITE_API_URL to Hono. FE works unchanged.
3. Add V2 endpoints incrementally.
4. Retire Apps Script.
5. Repos keep the same interface → later Postgres swap is one file.

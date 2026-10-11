# V1 Apps Script

Google Apps Script backend for the job tracker. These files are the script project. [clasp](https://github.com/google/clasp) pushes them to Apps Script, and the script is deployed as a Web App that returns JSON.

`.clasp.json` is gitignored. Copy the example and fill in the script id before pushing.

## One-time setup

1. Turn on the Apps Script API: [script.google.com/home/usersettings](https://script.google.com/home/usersettings).
2. Install clasp and log in:

```powershell
npm install -g @google/clasp
clasp login
```

3. Create a standalone script from this folder, or reuse one you already have:

```powershell
cd backend/v1-apps-script
clasp create --title "Job Tracker" --type standalone --rootDir .
```

`clasp create` writes `.clasp.json`. If the script already exists, copy the example instead and paste the script id from **Project settings**:

```powershell
Copy-Item .clasp.json.example .clasp.json
```

4. In the Apps Script editor, open **Project settings > Script properties** and add `API_TOKEN`. `assertToken()` compares the request's `token` query parameter with that value.

## Push

From `backend/v1-apps-script`:

```powershell
clasp push
```

## Deploy as a Web App

Create a deployment:

```powershell
clasp deploy --description "Initial web app"
```

The manifest deploys the app as the user who owns the script, accessible to anyone. The command prints a deployment id and a Web App URL. Put that URL in `frontend/.env` as `VITE_API_URL`.

After later edits, push and update the same deployment so the URL stays stable:

```powershell
clasp push
clasp deploy --deploymentId <DEPLOYMENT_ID> --description "Update web app"
```

You can do the same in the editor under **Deploy > Manage deployments**. Choose type **Web app**, execute as **Me**, and set access to **Anyone**.

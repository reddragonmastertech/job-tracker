import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./lib/env";
import { aiRoute } from "./routes/ai";
import { analysisRoute } from "./routes/analysis";
import { applicationsRoute } from "./routes/applications";
import { interviewsRoute } from "./routes/interviews";
import { jobsRoute } from "./routes/jobs";
import { scrapeRoute } from "./routes/scrape";

const app = new Hono();

app.route("/", jobsRoute);
app.route("/", interviewsRoute);
app.route("/", analysisRoute);
app.route("/", scrapeRoute);
app.route("/", aiRoute);
app.route("/", applicationsRoute);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Listening on http://localhost:${info.port}`);
  },
);

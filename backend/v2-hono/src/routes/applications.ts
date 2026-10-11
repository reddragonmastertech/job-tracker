import { Hono } from "hono";

export const applicationsRoute = new Hono();

applicationsRoute.get("/listApplications", (c) => {
  // TODO: List generated applications. V2 only.
  return c.json({});
});

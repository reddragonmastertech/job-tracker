import { Hono } from "hono";
import {
  createInterview,
  deleteInterview,
  getInterview,
  listInterviews,
  updateInterview,
} from "../services/interviewService";

export const interviewsRoute = new Hono();

interviewsRoute.get("/listInterviews", (c) => c.json(listInterviews()));
interviewsRoute.get("/getInterview", (c) => c.json(getInterview()));
interviewsRoute.post("/createInterview", (c) => c.json(createInterview()));
interviewsRoute.post("/updateInterview", (c) => c.json(updateInterview()));
interviewsRoute.post("/deleteInterview", (c) => c.json(deleteInterview()));

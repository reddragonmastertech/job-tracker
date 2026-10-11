import { Hono } from "hono";
import { getAnalysis } from "../services/analysisService";

export const analysisRoute = new Hono();

analysisRoute.get("/getAnalysis", (c) => c.json(getAnalysis()));

import { Hono } from "hono";
import { generate } from "../services/aiService";

export const aiRoute = new Hono();

aiRoute.post("/ai", (c) => c.json(generate()));

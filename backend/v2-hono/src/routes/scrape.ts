import { Hono } from "hono";
import { scrape } from "../services/scrapeService";

export const scrapeRoute = new Hono();

scrapeRoute.post("/scrape", (c) => c.json(scrape()));

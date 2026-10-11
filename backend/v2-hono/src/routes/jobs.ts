import { Hono } from "hono";
import { createJob, deleteJob, getJob, listJobs, updateJob } from "../services/jobService";

export const jobsRoute = new Hono();

jobsRoute.get("/listJobs", (c) => c.json(listJobs()));
jobsRoute.get("/getJob", (c) => c.json(getJob()));
jobsRoute.post("/createJob", (c) => c.json(createJob()));
jobsRoute.post("/updateJob", (c) => c.json(updateJob()));
jobsRoute.post("/deleteJob", (c) => c.json(deleteJob()));

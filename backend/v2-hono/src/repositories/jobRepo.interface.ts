export interface JobRepo {
  listJobs(): Promise<object>;
  getJob(id: string): Promise<object>;
  createJob(input: object): Promise<object>;
  updateJob(id: string, patch: object): Promise<object>;
  deleteJob(id: string): Promise<object>;
}

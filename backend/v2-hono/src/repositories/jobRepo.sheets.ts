import type { JobRepo } from "./jobRepo.interface";

export const sheetsJobRepo: JobRepo = {
  async listJobs() {
    // TODO: Read job rows from the spreadsheet.
    return {};
  },

  async getJob(_id) {
    // TODO: Find the job row with this id.
    return {};
  },

  async createJob(_input) {
    // TODO: Append a job row and return the created job.
    return {};
  },

  async updateJob(_id, _patch) {
    // TODO: Update the job row with this id and return the updated job.
    return {};
  },

  async deleteJob(_id) {
    // TODO: Delete the job row with this id and return the deleted id.
    return {};
  },
};

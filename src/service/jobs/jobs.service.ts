import { JobsRepository } from "../../repository/jobs/jobs.repository";
import type { Job } from "../../entity/jobs/jobs.entity";

export class JobsService {
  constructor(private readonly repo = new JobsRepository()) {}

  async create(data: Partial<Job>): Promise<Job> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Job[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Job | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Job>
  ): Promise<Job | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

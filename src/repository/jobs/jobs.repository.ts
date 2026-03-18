import { AppDataSource } from "../../configs/psqllDB.config";
import { Job } from "../../entity/jobs/jobs.entity";

export class JobsRepository {
  private get repo() {
    return AppDataSource.getRepository(Job);
  }

  async create(data: Partial<Job>): Promise<Job> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Job[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Job | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Job>
  ): Promise<Job | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

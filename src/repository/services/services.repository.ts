import { AppDataSource } from "../../configs/psqllDB.config";
import { Service } from "../../entity/service/service.entity";

export class ServicesRepository {
  private get repo() {
    return AppDataSource.getRepository(Service);
  }

  async create(data: Partial<Service>): Promise<Service> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Service[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Service | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Service>
  ): Promise<Service | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

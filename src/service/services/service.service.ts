import { ServicesRepository } from "../../repository/services/services.repository";
import type { Service } from "../../entity/service/service.entity";

export class ServicesService {
  constructor(private readonly repo = new ServicesRepository()) {}

  async create(data: Partial<Service>): Promise<Service> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Service[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Service | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Service>
  ): Promise<Service | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

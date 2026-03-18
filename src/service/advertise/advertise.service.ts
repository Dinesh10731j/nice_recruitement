import type { Advertise } from "../../entity/advertise/advertise.entity";
import { AdvertiseRepository } from "../../repository/advertise/advertise.repository";

export class AdvertiseService {
  constructor(private readonly repo = new AdvertiseRepository()) {}

  async create(data: Partial<Advertise>): Promise<Advertise> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Advertise[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Advertise | null> {
    return this.repo.findById(id);
  }

  async update(id: string, data: Partial<Advertise>): Promise<Advertise | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

import { AppDataSource } from "../../configs/psqllDB.config";
import { Advertise } from "../../entity/advertise/advertise.entity";

export class AdvertiseRepository {
  private get repo() {
    return AppDataSource.getRepository(Advertise);
  }

  async create(data: Partial<Advertise>): Promise<Advertise> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Advertise[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Advertise | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(id: string, data: Partial<Advertise>): Promise<Advertise | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

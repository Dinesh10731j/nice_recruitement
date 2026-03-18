import { AppDataSource } from "../../configs/psqllDB.config";
import { Client } from "../../entity/clients/clients.entity";

export class ClientsRepository {
  private get repo() {
    return AppDataSource.getRepository(Client);
  }

  async create(data: Partial<Client>): Promise<Client> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Client[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Client | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Client>
  ): Promise<Client | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

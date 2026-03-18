import { ClientsRepository } from "../../repository/clients/clients.repository";
import type { Client } from "../../entity/clients/clients.entity";

export class ClientsService {
  constructor(private readonly repo = new ClientsRepository()) {}

  async create(data: Partial<Client>): Promise<Client> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Client[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Client | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Client>
  ): Promise<Client | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

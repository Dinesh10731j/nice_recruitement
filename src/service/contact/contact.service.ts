import { ContactRepository } from "../../repository/contact/contact.repository";
import type { Contact } from "../../entity/contact/contact.entity";

export class ContactService {
  constructor(private readonly repo = new ContactRepository()) {}

  async create(data: Partial<Contact>): Promise<Contact> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Contact[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Contact | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Contact>
  ): Promise<Contact | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

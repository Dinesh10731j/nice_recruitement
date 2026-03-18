import { AppDataSource } from "../../configs/psqllDB.config";
import { Contact } from "../../entity/contact/contact.entity";

export class ContactRepository {
  private get repo() {
    return AppDataSource.getRepository(Contact);
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Contact[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Contact | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Contact>
  ): Promise<Contact | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

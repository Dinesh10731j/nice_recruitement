import { AppDataSource } from "../../configs/psqllDB.config";
import { Certificate } from "../../entity/certificate/certificate.entity";

export class CertificateRepository {
  private get repo() {
    return AppDataSource.getRepository(Certificate);
  }

  async create(data: Partial<Certificate>): Promise<Certificate> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Certificate[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Certificate | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Certificate>
  ): Promise<Certificate | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

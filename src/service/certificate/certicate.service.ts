import { CertificateRepository } from "../../repository/certificate/certificate.repository";
import type { Certificate } from "../../entity/certificate/certificate.entity";

export class CertificateService {
  constructor(private readonly repo = new CertificateRepository()) {}

  async create(data: Partial<Certificate>): Promise<Certificate> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Certificate[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Certificate | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Certificate>
  ): Promise<Certificate | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

import { AppDataSource } from "../../configs/psqllDB.config";
import { Testimonial } from "../../entity/testimonials/testimonials.entity";

export class TestimonialsRepository {
  private get repo() {
    return AppDataSource.getRepository(Testimonial);
  }

  async create(data: Partial<Testimonial>): Promise<Testimonial> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Testimonial[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Testimonial | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Testimonial>
  ): Promise<Testimonial | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

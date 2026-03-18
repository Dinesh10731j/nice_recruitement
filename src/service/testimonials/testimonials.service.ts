import { TestimonialsRepository } from "../../repository/testimonials/testimonials.repository";
import type { Testimonial } from "../../entity/testimonials/testimonials.entity";

export class TestimonialsService {
  constructor(private readonly repo = new TestimonialsRepository()) {}

  async create(data: Partial<Testimonial>): Promise<Testimonial> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Testimonial[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Testimonial | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Testimonial>
  ): Promise<Testimonial | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

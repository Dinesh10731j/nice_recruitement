import { AppDataSource } from "../../configs/psqllDB.config";
import { Blog } from "../../entity/blogs/blogs.entity";

export class BlogsRepository {
  private get repo() {
    return AppDataSource.getRepository(Blog);
  }

  async create(data: Partial<Blog>): Promise<Blog> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Blog[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Blog | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<Blog>
  ): Promise<Blog | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

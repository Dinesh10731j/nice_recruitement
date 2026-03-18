import { BlogsRepository } from "../../repository/blogs/blogs.repository";
import type { Blog } from "../../entity/blogs/blogs.entity";

export class BlogsService {
  constructor(private readonly repo = new BlogsRepository()) {}

  async create(data: Partial<Blog>): Promise<Blog> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Blog[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<Blog | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<Blog>
  ): Promise<Blog | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

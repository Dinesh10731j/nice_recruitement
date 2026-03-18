import { GalleryRepository } from "../../repository/gallery/gallery.repository";
import type { GalleryItem } from "../../entity/gallery/gallery.entity";

export class GalleryService {
  constructor(private readonly repo = new GalleryRepository()) {}

  async create(data: Partial<GalleryItem>): Promise<GalleryItem> {
    return this.repo.create(data);
  }

  async findAll(): Promise<GalleryItem[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<GalleryItem | null> {
    return this.repo.findById(id);
  }

  async update(
    id: string,
    data: Partial<GalleryItem>
  ): Promise<GalleryItem | null> {
    return this.repo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    return this.repo.remove(id);
  }
}

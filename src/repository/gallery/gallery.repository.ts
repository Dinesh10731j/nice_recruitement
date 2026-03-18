import { AppDataSource } from "../../configs/psqllDB.config";
import { GalleryItem } from "../../entity/gallery/gallery.entity";

export class GalleryRepository {
  private get repo() {
    return AppDataSource.getRepository(GalleryItem);
  }

  async create(data: Partial<GalleryItem>): Promise<GalleryItem> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<GalleryItem[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<GalleryItem | null> {
    return this.repo.findOne({ where: { id } as any });
  }

  async update(
    id: string,
    data: Partial<GalleryItem>
  ): Promise<GalleryItem | null> {
    await this.repo.update({ id } as any, data);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete({ id } as any);
  }
}

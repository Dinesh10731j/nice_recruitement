import { AppDataSource } from "../../configs/psqllDB.config";
import { NewsLetterSubscriber } from "../../entity/news-letter/news-letter-subscriber.entity";

export class NewsLetterRepository {
  private get repo() {
    return AppDataSource.getRepository(NewsLetterSubscriber);
  }

  async findByEmail(email: string): Promise<NewsLetterSubscriber | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<NewsLetterSubscriber | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createSubscriber(email: string): Promise<NewsLetterSubscriber> {
    const entity = this.repo.create({ email });
    return this.repo.save(entity);
  }

  async listAll(): Promise<NewsLetterSubscriber[]> {
    return this.repo.find();
  }

  async listActiveEmails(): Promise<string[]> {
    const rows = await this.repo.find({ where: { isActive: true } });
    return rows.map((r) => r.email);
  }

  async deleteById(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}

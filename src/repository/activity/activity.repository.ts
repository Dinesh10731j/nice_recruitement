import { AppDataSource } from "../../configs/psqllDB.config";
import { UserActivity } from "../../entity/activity/user-activity.entity";

export class ActivityRepository {
  private get repo() {
    return AppDataSource.getRepository(UserActivity);
  }

  async create(data: Partial<UserActivity>): Promise<UserActivity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<UserActivity[]> {
    return this.repo.find({ order: { createdAt: "DESC" } });
  }
}

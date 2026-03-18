import type { UserActivity } from "../../entity/activity/user-activity.entity";
import { ActivityRepository } from "../../repository/activity/activity.repository";

export class ActivityService {
  constructor(private readonly repo = new ActivityRepository()) {}

  async log(data: Partial<UserActivity>): Promise<UserActivity> {
    return this.repo.create(data);
  }

  async list(): Promise<UserActivity[]> {
    return this.repo.findAll();
  }
}

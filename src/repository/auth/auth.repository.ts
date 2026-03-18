import { AppDataSource } from "../../configs/psqllDB.config";
import { User } from "../../entity/user/user.entity";

export class AuthRepository {
  private get repo() {
    return AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findByEmailWithReset(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "role",
        "isActive",
        "password",
        "resetTokenHash",
        "resetTokenExpiresAt",
      ],
    });
  }

  async findByResetTokenHash(hash: string): Promise<User | null> {
    return this.repo.findOne({
      where: { resetTokenHash: hash } as any,
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "role",
        "isActive",
        "password",
        "resetTokenHash",
        "resetTokenExpiresAt",
      ],
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
      select: [
        "id",
        "email",
        "firstName",
        "lastName",
        "role",
        "isActive",
        "password",
      ],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.repo.update({ id }, { password });
  }

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    await this.repo.update({ id }, data);
  }

  async setResetToken(
    id: string,
    resetTokenHash: string | null,
    resetTokenExpiresAt: Date | null
  ): Promise<void> {
    await this.repo.update(
      { id },
      { resetTokenHash, resetTokenExpiresAt }
    );
  }
}

import DataLoader from "dataloader";
import { AppDataSource } from "../../configs/psqllDB.config";
import { User } from "../../entity/user/user.entity";

// 🔹 Batch function for users
const batchUsers = async (ids: readonly string[]) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.findByIds([...ids]);

  // map results in same order as ids
  const userMap = new Map(users.map(user => [user.id, user]));

  return ids.map(id => userMap.get(id) || null);
};

// 🔹 Create all loaders
const loaders = () => {
  return {
    userLoader: new DataLoader(batchUsers),
  };
};

export { loaders };
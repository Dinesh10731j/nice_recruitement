import jwt from "jsonwebtoken";
import { AppDataSource } from "../../configs/psqllDB.config";
import { User } from "../../entity/user/user.entity";

export const context = async ({ req ,res}: any) => {
  // ✅ get token from cookies instead of headers
  const token = req.cookies?.token;

  let user = null;

  try {
    if (token) {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      const userRepository = AppDataSource.getRepository(User);

      user = await userRepository.findOne({
        where: { id: decoded.id },
      });
    }
  } catch (error) {
    user = null;
  }

  return {
    user,
    res,
    repositories: {
      userRepository: AppDataSource.getRepository(User),
    },
  };
};
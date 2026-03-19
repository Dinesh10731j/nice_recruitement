import { User, UserRole } from "../../entity/user/user.entity";
import { AppDataSource } from "../../configs/psqllDB.config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../../configs/env.config";
import { Message } from "../../constant/message.interface";
const { CREATED } = Message;



const userRepository = AppDataSource.getRepository(User);

const resolvers = {
  Mutation: {
    register: async (_: any, { input }: any, context: any) => {
      const { res } = context; // ✅ make sure you get res from context
      const { firstName, lastName, email, password } = input;

      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) throw new Error("User with this email already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: UserRole.USER,
        isActive: true,
      });

      await userRepository.save(user);

      const token = jwt.sign({ id: user.id }, envConfig.ACCESS_TOKEN_SECRET!, {
        expiresIn: "7d",
      });

      // ✅ set cookie
      if (res) {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      return {
        message: CREATED,
        token,
      };
    },
  },
  Query: {
    hello: () => "Hello World!",
  },
};

export default resolvers;
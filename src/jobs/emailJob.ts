import { User } from "../entity/user/user.entity";
import { emailQueue } from "../queues/email.queue";

export const enqueueWelcomeEmail = async (user: User): Promise<void> => {
  await emailQueue.add("welcome-email", {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};

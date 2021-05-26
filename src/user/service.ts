import boom from "@hapi/boom";
import { nanoid } from "nanoid";

import { userRepo } from "./repo";
import type { User, UserSignupPayload } from "./types";

export class UserService {
  signup({ username, email }: UserSignupPayload): User {
    if (userRepo.findByUsername(username))
      throw boom.badRequest(
        `A user with the username "${username}" already exists.`
      );
    if (userRepo.findByEmail(email))
      throw boom.badRequest(`A user with the email "${email}" already exists`);

    const user = userRepo.insert({
      id: nanoid(),
      username,
      email,
      created_at: new Date(),
    });

    return user;
  }
  list(): User[] {
    const users = userRepo.list();
    return users;
  }
}

export const userService = new UserService();

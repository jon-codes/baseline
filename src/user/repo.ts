import { User } from "./types";

const userDb: User[] = [];

class UserRepo {
  list(): User[] {
    return userDb;
  }
  find(id: string): User | undefined {
    return userDb.find(usr => usr.id === id);
  }
  findByUsername(username: string): User | undefined {
    return userDb.find(usr => usr.username === username);
  }
  findByEmail(email: string): User | undefined {
    return userDb.find(usr => usr.email === email);
  }
  insert(user: User): User {
    userDb.push(user);
    return user;
  }
}

export const userRepo = new UserRepo();

import { Session, User } from "next-auth";

interface NewUser extends User {
  userID: string;
}

interface NewSession extends Session {
  user: NewUser;
}

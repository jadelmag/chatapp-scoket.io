import { User } from "@/interfaces/user.interfaces";

export interface SigninProps {
  name: string;
  email: string;
  password: string;
}

export interface SigninResponse {
  ok: boolean;
  msg: string;
  token: string;
  user: User;
}

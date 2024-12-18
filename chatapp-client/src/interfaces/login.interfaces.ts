import { User } from "@/interfaces/user.interfaces";

export interface LoginProps {
  email: string;
  password: string;
  rememberme: boolean;
}

export interface LoginResponse {
  ok: boolean;
  token: string;
  user: User;
}

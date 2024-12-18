import { User } from "@/interfaces/user.interfaces";

export interface RenewTokenResponse {
  ok: boolean;
  user: User;
  token: string;
}

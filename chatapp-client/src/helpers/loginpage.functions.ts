import { KEY } from "@/constants/localstorage.constants";
import {
    removeItemOnLocalStorage,
    saveOnLocalStorage,
} from "@/helpers/localstorage.functions";

export const rememberUser = (remember: boolean, email: string) => {
  if (remember) {
    saveOnLocalStorage(KEY.EMAIL, email);
  } else {
    removeItemOnLocalStorage(KEY.EMAIL);
  }
};

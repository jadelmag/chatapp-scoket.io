import { KEY } from "@/constants/localstorage.constants";
import { useChatContext } from "@/context/chatcontext";
import {
  loadOnLocalStorage,
  removeItemOnLocalStorage,
  saveOnLocalStorage,
} from "@/helpers/localstorage.functions";
import { LoginResponse } from "@/interfaces/login.interfaces";
import { RenewTokenResponse } from "@/interfaces/renewtoken.interface";
import { SigninResponse } from "@/interfaces/signin.interfaces";
import { CHAT_TYPE } from "@/reducers/chatreducer";
import {
  requestWithOutToken,
  requestWithToken,
} from "@/services/requests.functions";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface AuthUserContextProps {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
}

interface AuthContextProps {
  auth: AuthUserContextProps;
  login: (email: string, password: string) => Promise<boolean>;
  signin: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifytoken: () => Promise<boolean>;
}

const initialState: AuthUserContextProps = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [auth, setAuth] = useState<AuthUserContextProps>(initialState);
  const { dispatch } = useChatContext();

  const login = async (email: string, password: string): Promise<boolean> => {
    const resp: LoginResponse = await requestWithOutToken(
      "login",
      email,
      password,
      "POST"
    );

    if (resp.ok) {
      const { user, token } = resp;
      saveOnLocalStorage(KEY.TOKEN, token);
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }
    return resp.ok;
  };

  const signin = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const resp: SigninResponse = await requestWithOutToken(
      "login/new",
      email,
      password,
      "POST",
      name
    );
    if (resp.ok) {
      const { token, user } = resp;
      saveOnLocalStorage(KEY.TOKEN, token);
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }
    return resp.ok;
  };

  const logout = () => {
    removeItemOnLocalStorage(KEY.TOKEN);

    dispatch({
      type: CHAT_TYPE.RESET_CHAT,
    });

    setAuth({
      uid: null,
      name: null,
      email: null,
      checking: false,
      logged: false,
    });
  };

  const verifytoken = useCallback(async () => {
    const token = loadOnLocalStorage(KEY.TOKEN);
    let verified = false;
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      verified = false;
    } else {
      const resp: RenewTokenResponse = await requestWithToken("login/renew");
      if (resp.ok) {
        const { user, token } = resp;
        saveOnLocalStorage(KEY.TOKEN, token);
        setAuth({
          uid: user.uid,
          checking: false,
          logged: true,
          name: user.name,
          email: user.email,
        });
        verified = true;
      } else {
        setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
        });
        verified = false;
      }
    }
    return verified;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        signin,
        logout,
        verifytoken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

import { useAuthContext } from "@/auth/authcontext";
import { KEY } from "@/constants/localstorage.constants";
import { ROUTE } from "@/constants/routes.constants";
import { loadOnLocalStorage } from "@/helpers/localstorage.functions";
import { rememberUser } from "@/helpers/loginpage.functions";
import { LoginProps } from "@/interfaces/login.interfaces";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/login-register.css";

const initialState: LoginProps = {
  email: "",
  password: "",
  rememberme: false,
};

export const LoginPage = () => {
  const [form, setForm] = useState<LoginProps>(initialState);

  const { login } = useAuthContext();

  useEffect(() => {
    const email: string | null = loadOnLocalStorage(KEY.EMAIL);
    if (email) {
      setForm((prevForm: LoginProps) => ({
        ...prevForm,
        email,
        rememberme: true,
      }));
    }
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const onHandleCheckbox = () => {
    setForm({ ...form, rememberme: !form.rememberme });
  };

  const allSuccess = (): boolean => {
    const { email, password } = form;
    return email.length > 0 && password.length > 0 ? true : false;
  };

  const onHandleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    rememberUser(form.rememberme, form.email);
    const { email, password } = form;
    const ok = await login(email, password);
    if (!ok) {
      Swal.fire({
        title: "Error",
        text: "Verifique el usuario o la contraseña",
        icon: "error",
      });
    }
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onHandleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - LOG IN</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          aria-label="email"
          className="input100"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onHandleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          aria-label="password"
          className="input100"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onHandleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div
          aria-label="checkbox-area"
          className="col"
          onClick={onHandleCheckbox}
        >
          <input
            aria-label="checkbox"
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
            name="rememberme"
            readOnly
            checked={form.rememberme}
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-end">
          <Link className="txt1" to={ROUTE.AUTH_SIGNIN}>
            Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          aria-label="submit-button"
          disabled={!allSuccess()}
          type="submit"
          className="login100-form-btn"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

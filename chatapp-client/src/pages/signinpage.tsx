import { useAuthContext } from "@/auth/authcontext";
import { ROUTE } from "@/constants/routes.constants";
import { SigninProps } from "@/interfaces/signin.interfaces";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const initialState: SigninProps = {
  name: "",
  email: "",
  password: "",
};

export const SigninPage = () => {
  const [form, setForm] = useState<SigninProps>(initialState);
  const { signin } = useAuthContext();

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const allSuccess = (): boolean => {
    const { name, email, password } = form;
    return name.length > 0 && email.length > 0 && password.length > 0
      ? true
      : false;
  };

  const onHandleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password } = form;
    const ok = await signin(name, email, password);
    if (!ok) {
      Swal.fire({
        title: "Error",
        text: "Ya existe un usuario con ese email",
        icon: "error",
      });
    }
  };

  return (
    <form
      className="login100-form validate-form flex-sb flex-w"
      onSubmit={onHandleSubmit}
    >
      <span className="login100-form-title mb-3">Chat - SIGN IN</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          aria-label="name"
          className="input100"
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onHandleChange}
        />
        <span className="focus-input100"></span>
      </div>

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
        <div className="col text-end">
          <Link className="txt1" to={ROUTE.AUTH_LOGIN}>
            Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          aria-label="submit-button"
          type="submit"
          disabled={!allSuccess()}
          className="login100-form-btn"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};

import { ROUTE } from "@/constants/routes.constants";
import { LoginPage } from "@/pages/loginpage";
import { SigninPage } from "@/pages/signinpage";
import { Navigate, Route, Routes } from "react-router-dom";

export const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Routes>
            <Route path={ROUTE.LOGIN} element={<LoginPage />} />
            <Route path={ROUTE.SIGNIN} element={<SigninPage />} />
            <Route
              path={ROUTE.DEFAULT}
              element={<Navigate to={ROUTE.AUTH_LOGIN} replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

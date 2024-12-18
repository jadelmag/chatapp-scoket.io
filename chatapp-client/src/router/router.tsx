import { useAuthContext } from "@/auth/authcontext";
import { Loader } from "@/components/loader";
import { PrivateRoute } from "@/components/privateroute";
import { PublicRoute } from "@/components/publicroute";
import { ROUTE } from "@/constants/routes.constants";
import { ChatPage } from "@/pages/chatpage";
import { AuthRouter } from "@/router/authrouter";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const Router: React.FC = (): JSX.Element => {
  const { auth, verifytoken } = useAuthContext();

  useEffect(() => {
    verifytoken();
  }, [verifytoken]);

  if (auth.checking) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path={ROUTE.AUTH} element={
          <PublicRoute isAuthenticated={auth.logged}>
            <AuthRouter />
          </PublicRoute>
        } />
        <Route path={ROUTE.CHAT} element={
          <PrivateRoute isAuthenticated={auth.logged}>
            <ChatPage />
          </PrivateRoute>
        } />
        <Route
          path={ROUTE.DEFAULT}
          element={<Navigate to={ROUTE.AUTH_LOGIN} replace />}
        />
      </Routes>
    </>
  );
};

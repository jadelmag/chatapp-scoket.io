import { ROUTE } from "@/constants/routes.constants";
import React from "react";
import { Navigate } from "react-router-dom";

export interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  return isAuthenticated ? children : <Navigate to={ROUTE.AUTH} />;
};

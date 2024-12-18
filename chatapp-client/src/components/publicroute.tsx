import { ROUTE } from "@/constants/routes.constants";
import React from "react";
import { Navigate } from "react-router-dom";

export interface PublicRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  return !isAuthenticated ? children : <Navigate to={ROUTE.CHAT} />;
};

import React, { ReactElement } from "react";
import { Navigate, Route } from "react-router-dom";

interface Props {
  children: ReactElement
}

export const AuthRouter: React.FC<Props> = ({ children }) => {
  const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

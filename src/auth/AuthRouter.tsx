import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "universal-cookie";

interface Props {
  children: ReactElement;
}

export const AuthRouter: React.FC<Props> = ({ children }) => {
  const cookie = new Cookie();
  const isLoggedIn = cookie.get("session");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

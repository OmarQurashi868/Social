import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "universal-cookie";

interface Props {
  children: ReactElement;
}

export const AuthRouter: React.FC<Props> = ({ children }) => {
  const cookie = new Cookie();
  // TODO: add actual user verification and sessions
  const isLoggedIn = cookie.get("sessionId");
  return isLoggedIn != null ? children : <Navigate to="/login" />;
};

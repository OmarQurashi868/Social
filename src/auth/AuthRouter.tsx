import React, { ReactElement, useState, useEffect } from "react";
import Cookie from "universal-cookie";
import verifyLogin from "./VerifyLogin";
import Home from "../home/Home";
import Login from "./Login";
import Register from "./Register";

interface Props {}
const sessionlessRoutes = ["/login", "/register"];
const sessionRoutes = ["/home", "/"];

const AuthRouter: React.FC<Props> = () => {
  const cookie = new Cookie();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [path, setPath] = useState("/");
  const userId = cookie.get("userId");
  const sessionId = cookie.get("sessionId");

  useEffect(() => {
    verifyLogin(cookie.get("userId"), cookie.get("sessionId")).then((res) => {
      setIsLoggedIn(res);
    });
  }, [userId, sessionId]);

  useEffect(() => { 
    if (sessionlessRoutes.includes(window.location.pathname)) {
      if (!isLoggedIn) {
        setPath(window.location.pathname);
      } else {
        history.pushState({}, "", "/");
        setPath("/");
      }
    } else if (sessionRoutes.includes(window.location.pathname)) {
      if (isLoggedIn) {
        setPath(window.location.pathname);
      } else {
        setPath("/login");
      }
    } else {
      console.log(isLoggedIn)
      if (isLoggedIn) {
        history.pushState({}, "", "/");
        setPath("/");
      } else {
        // history.pushState({}, "", "/login");
        setPath("/login");
      }
    }
  }, [isLoggedIn]);


  // history.pushState({}, "", path);
  switch (path) {
    case "/login":
      return <Login />;
    case "/register":
      return <Register />;
    case "/":
      return <Home />;
    default:
      history.pushState({}, "", "loading");
      return <div>Default</div>;
  }
};

export default AuthRouter;

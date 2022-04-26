import React from "react";
import Cookie from "universal-cookie";
import {useNavigate} from "react-router-dom"

interface Props {}

export const Home: React.FC<Props> = () => {
  let navigate = useNavigate();

  const cookie = new Cookie();
  const username = cookie.get("session");
  const logoutHandler = () => {
    cookie.remove("session");
    navigate("/login")
  };

  return (
    <div>
      HOME PAGE
      <br />
      Logged in as {username}
      <br />
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

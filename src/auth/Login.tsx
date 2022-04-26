import React, { useRef, useState } from "react";
import Cookie from "universal-cookie";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Card } from "../UI/Card";
import { useNavigate } from "react-router-dom";

interface Props {}

export const Login: React.FC<Props> = () => {
  let navigate = useNavigate();
  const cookie = new Cookie();
  const [errorState, setErrorState] = useState("e");
  let statusCode = 0;

  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO: send http post request to backend for verification and confirmation
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: {
          username: nameRef.current?.value,
          password: passRef.current?.value,
        },
      }),
    })
      .then((res) => {
        statusCode = res.status
        if (statusCode === 200) {
          cookie.set("session", nameRef.current?.value, { path: "/" });
          navigate("/");
        }
        return res.json();
      })
      .then((res) => {
        if (statusCode != 200) setErrorState(res.message);
      });
  };

  const isLoggedIn = cookie.get("session");

  const registerPath = `${window.location.origin}/register`;

  return !isLoggedIn ? (
    <Card className={styles.Center}>
      Welcome back
      <form onSubmit={submitHandler} className={styles.Form}>
        {errorState.length > 1 && (
          <div className={styles.Error}>{errorState}</div>
        )}
        <div>
          Username:
          <input type="text" id="username" ref={nameRef} autoComplete="off" />
        </div>
        <div>
          Password:
          <input type="password" id="password" ref={passRef} />
        </div>
        <button type="submit" id="submitBtn">
          Log in
        </button>
      </form>
      <div>
        New user? <a href={registerPath}>Register</a>
      </div>
    </Card>
  ) : (
    <Navigate to="/" />
  );
};

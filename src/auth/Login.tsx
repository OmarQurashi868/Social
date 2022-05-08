import React, { useRef, useState } from "react";
import Cookie from "universal-cookie";
import { Navigate } from "react-router-dom";
import styles from "../UI/Form.module.css";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

interface Props {}

export const Login: React.FC<Props> = () => {
  let navigate = useNavigate();
  const cookie = new Cookie();
  const [errorState, setErrorState] = useState("e");
  const [btnLoading, setBtnLoading] = useState(false);
  let statusCode = 0;

  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setBtnLoading(true);
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
        setBtnLoading(false);
        statusCode = res.status;
        if (statusCode === 200) {
          setErrorState("e");
        }
        return res.json();
      })
      .then((res) => {
        if (statusCode != 200) setErrorState(res.message);
        else {
          cookie.set("sessionId", res._id, { path: "/" });
          navigate("/");
        }
      });
  };

  const changeHandler = () => {
    setErrorState("e");
  };

  const isLoggedIn = cookie.get("sessionId");

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
          <input
            type="text"
            id="username"
            ref={nameRef}
            autoComplete="off"
            onChange={changeHandler}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            id="password"
            ref={passRef}
            onChange={changeHandler}
          />
        </div>
        <Button type="submit" id="submitBtn" isLoading={btnLoading}>
          Log in
        </Button>
      </form>
      <div>
        New user? <a href={registerPath}>Register</a>
      </div>
    </Card>
  ) : (
    <Navigate to="/" />
  );
};

import React, { useRef, useState } from "react";
import Cookie from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { Card } from "../UI/Card";

interface Props {}

export const Register: React.FC<Props> = () => {
  const cookie = new Cookie();
  let navigate = useNavigate();
  const [errorState, setErrorState] = useState([{ message: "e", key: "e" }]);
  let statusCode = 0;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const pass2Ref = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO: send http post request to backend for verification and confirmation
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: {
          username: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passRef.current?.value,
          passwordConfirm: pass2Ref.current?.value,
        },
      }),
    })
      .then((res) => {
        statusCode = res.status;
        if (statusCode === 201) {
          setErrorState([{ message: "e", key: "e" }]);
          cookie.set("session", nameRef.current?.value, { path: "/" });
          navigate("/");
        }
        return res.json();
      })
      .then((res) => {
        if (statusCode != 201) {
          console.log(res);
          if (res?.message?.errors) {
            let errors: { message: string; key: string }[] = [];
            for (const error in res.message.errors) {
              const errorData = {
                message: res.message.errors[error].message,
                key: error,
              };
              errors.push(errorData);
            }
            setErrorState(errors);
          }
          else if (res?.message?.code) {
            if (res?.message?.code === 11000) {
              const errorMessage = `${Object.keys(res.message.keyPattern)[0]} is already used`
              errorMessage[0].toUpperCase();
              const errorData = [{
                message: errorMessage,
                key: Object.keys(res.message.keyPattern)[0]
              }]
              setErrorState(errorData);
            }
          }
        }
      });
  };

  const isLoggedIn = cookie.get("session");

  const loginPath = `${window.location.origin}/login`;

  return !isLoggedIn ? (
    <Card className={styles.Center}>
      Welcome
      <form onSubmit={submitHandler} className={styles.Form}>
        {errorState[0].message != "e" &&
          errorState.map((e) => (
            <div className={styles.Error} key={e.key}>
              {e.message}
            </div>
          ))}
        Username:
        <input type="text" id="username" ref={nameRef} autoComplete="off" />
        Email:
        <input type="email" id="email" ref={emailRef} autoComplete="off" />
        Password:
        <input type="password" id="password" ref={passRef} />
        Confirm password:
        <input type="password" id="password2" ref={pass2Ref} />
        <button type="submit" id="submitBtn">
          Register
        </button>
      </form>
      <div>
        Already registered? <a href={loginPath}>Log in</a>
      </div>
    </Card>
  ) : (
    <Navigate to="/" />
  );
};

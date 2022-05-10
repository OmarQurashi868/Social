import React, { useRef, useState } from "react";
import Cookie from "universal-cookie";
import styles from "../UI/Form.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

interface Props {}

const Register: React.FC<Props> = () => {
  const cookie = new Cookie();
  const [errorState, setErrorState] = useState([{ message: "e", key: "e" }]);
  const [btnLoading, setBtnLoading] = useState(false);
  let statusCode = 0;

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const pass2Ref = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setBtnLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: {
          username: nameRef.current?.value.trim(),
          email: emailRef.current?.value.trim(),
          password: passRef.current?.value,
          passwordConfirm: pass2Ref.current?.value,
        },
      }),
    })
      .then((res) => {
        statusCode = res.status;
        setBtnLoading(false);
        if (statusCode === 201) {
          setErrorState([{ message: "e", key: "e" }]);
        }
        return res.json();
      })
      .then((res) => {
        if (statusCode != 201) {
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
          } else if (res?.message?.code) {
            if (res?.message?.code === 11000) {
              const errorMessage = `${
                Object.keys(res.message.keyPattern)[0]
              } is already used`;
              errorMessage[0].toUpperCase();
              const errorData = [
                {
                  message: errorMessage,
                  key: Object.keys(res.message.keyPattern)[0],
                },
              ];
              setErrorState(errorData);
            }
          }
        } else {
          cookie.set("userId", res._id, { path: "/" });
          cookie.set("sessionId", res.sessionId, { path: "/" });
          window.location.href = "/";
        }
      });
  };

  const changeHandler = () => {
    setErrorState([{ message: "e", key: "e" }]);
  };

  const loginPath = `${window.location.origin}/login`;

  return (
    <Card className={styles.Center}>
      Welcome
      <form onSubmit={submitHandler} className={styles.Form}>
        {errorState[0].message != "e" &&
          errorState.map((e) => (
            <div className={styles.Error} key={e.key}>
              {e.message}
            </div>
          ))}
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
          Email:
          <input
            type="email"
            id="email"
            ref={emailRef}
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

        <div>
          Confirm password:
          <input
            type="password"
            id="password2"
            ref={pass2Ref}
            onChange={changeHandler}
          />
        </div>

        <Button type="submit" id="submitBtn" isLoading={btnLoading}>
          Register
        </Button>
      </form>
      <div>
        Already registered? <a href={loginPath}>Log in</a>
      </div>
    </Card>
  );
};

export default Register;

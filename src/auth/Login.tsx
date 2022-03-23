import React, { useRef } from "react";

interface Props {}

export const Login: React.FC<Props> = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO: send http post request to backend for verification and confirmation
    console.log(nameRef.current?.value, passRef.current?.value);
  };

  return (
    <form onSubmit={submitHandler}>
      Username:
      <input type="text" id="username" ref={nameRef} />
      Password:
      <input type="password" id="password" ref={passRef} />
      <button type="submit" id="submitBtn">
        Submit
      </button>
    </form>
  );
};

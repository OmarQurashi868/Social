import React, { useRef } from "react";

interface Props {}

export const Register: React.FC<Props> = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const pass2Ref = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO: send http post request to backend for verification and confirmation
    console.log(nameRef.current?.value, passRef.current?.value);
  };

  return (
    <form onSubmit={submitHandler}>
      Username:
      <input type="text" id="username" ref={nameRef} />
      Email:
      <input type="email" id="email" ref={emailRef} />
      Password:
      <input type="password" id="password" ref={passRef} />
      Confirm password:
      <input type="password" id="password2" ref={pass2Ref} />
      <button type="submit" id="submitBtn">
        Submit
      </button>
    </form>
  );
};

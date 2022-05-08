import React, { useRef } from "react";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Button from "../UI/Button";
import formStyles from "../UI/Form.module.css";
import Card from "../UI/Card";

interface Props {}

export const Home: React.FC<Props> = () => {
  let navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const cookie = new Cookie();
  // TODO: Show name instead of id
  const username = cookie.get("sessionId");
  const logoutHandler = () => {
    cookie.remove("sessionId");
    navigate("/login");
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(titleRef.current?.value, contentRef.current?.value)
  }

  return (
    <div>
      Welcome {username}
      <button onClick={logoutHandler}>Logout</button>
      <Card>
        <form className={formStyles.Form} onSubmit={submitHandler}>
          <div className={styles.Flex}>
            Title
            <input
              type="text"
              id="username"
              ref={titleRef}
              autoComplete="off"
            />
          </div>
          <div className={styles.Flex}>
            Content
            <textarea
              id="username"
              ref={contentRef}
              autoComplete="off"
            />
          </div>
          <Button type="submit">Post</Button>
        </form>
      </Card>
      <Card>POSTS HERE!!!</Card>
    </div>
  );
};

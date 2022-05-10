import React, { useRef, useState } from "react";
import Cookie from "universal-cookie";
import styles from "./Home.module.css";
import Button from "../UI/Button";
import formStyles from "../UI/Form.module.css";
import Card from "../UI/Card";

interface Props {}

const Home: React.FC<Props> = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [username, setUsername] = useState("Loading");

  const cookie = new Cookie();
  
  fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/getuserinfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userData: {
        _id: cookie.get("userId"),
        sessionId: cookie.get("sessionId"),
      },
    }),
  }).then((res) => {
    return res.json()
  }).then((res) => {
    setUsername(res.userData.username);
  })

  const logoutHandler = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/removesession`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: {
          _id: cookie.get("userId"),
          sessionId: cookie.get("sessionId"),
        },
      }),
    }).then(() => {
      cookie.remove("userId");
      cookie.remove("sessionId");
      window.location.href = "/login"
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(titleRef.current?.value, contentRef.current?.value);
  };

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
            <textarea id="username" ref={contentRef} autoComplete="off" />
          </div>
          <Button type="submit">Post</Button>
        </form>
      </Card>
      <Card>POSTS HERE!!!</Card>
    </div>
  );
};

export default Home;
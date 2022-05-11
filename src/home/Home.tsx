import React, { useRef, useState } from "react";
import Cookie from "universal-cookie";
import styles from "./Home.module.css";
import Card from "../UI/Card";
import NewPost from "./posts/NewPost";
import PostList from "./posts/PostList";

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
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setUsername(res.userData.username);
    });

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
      window.location.href = "/login";
    });
  };

  return (
    <div>
      Welcome {username}
      <button onClick={logoutHandler}>Logout</button>
      <NewPost />
      <PostList />
    </div>
  );
};

export default Home;

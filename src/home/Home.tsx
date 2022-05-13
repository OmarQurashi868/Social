import React, { useEffect, useRef, useState } from "react";
import Cookie from "universal-cookie";
import PostList from "./posts/PostList";

interface Props {}

const Home: React.FC<Props> = () => {
  const [username, setUsername] = useState("Loading");

  const cookie = new Cookie();

  useEffect(() => {
    let isMounted = true;
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
        if (res?.userData?.username && isMounted)
          setUsername(res.userData.username);
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
      <PostList />
    </div>
  );
};

export default Home;

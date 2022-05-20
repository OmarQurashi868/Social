import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [username, setUsername] = useState("Loading");

  const cookie = new Cookie();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (cookie.get("userId") && cookie.get("sessionId")) {
      try {
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/getuserinfo/${cookie.get(
            "userId"
          )}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res?.userData?.username && isMounted)
              setUsername(res.userData.username);
          });
      } catch (err: any) {
        alert(`Error occured: ${err}`);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const logoutHandler = () => {
    try {
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
    } catch (err: any) {
      alert(`Error occured: ${err}`);
    }
  };
  return (
    <div className={styles.Navbar}>
      <div
        className={styles.Title}
        onClick={() => (window.location.href = "/")}
      >
        <span>social</span>
      </div>
      <div className={styles.Account} onClick={() => console.log("hi")}>
        <span>{username}</span>
      </div>
    </div>
  );
};

export default Navbar;

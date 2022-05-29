import { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import styles from "./Navbar.module.css";
import VerifyLogin from "../auth/VerifyLogin";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const [username, setUsername] = useState("Loading");

  const [dropdown, setDropdown] = useState(false);

  const cookie = new Cookie();

  useEffect(() => {
    let isMounted = true;
    if (cookie.get("userId") && cookie.get("sessionId")) {
      try {
        VerifyLogin().then((res) => {
          if (res) {
            fetch(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/auth/getuserinfo/${cookie.get("userId")}`,
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
          }
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

  const dropdownToggle = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className={styles.Navbar}>
      <div
        className={styles.Title}
        onClick={() => (window.location.href = "/")}
      >
        <span>social</span>
      </div>
      <div
        className={styles.Account}
        id="dropdown-button"
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
      >
        <span>{username}</span>
        <Dropdown isEnabled={dropdown}>
          <li>Profile</li>
          <li onClick={logoutHandler}>Log out</li>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;

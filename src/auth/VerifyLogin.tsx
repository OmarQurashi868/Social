import Cookie from "universal-cookie";

const verifyLogin = async (): Promise<boolean> => {
  const cookie = new Cookie();
  if (cookie.get("userId") == null || cookie.get("sessionId") == null) {
    cookie.remove("userId");
    cookie.remove("sessionId");
    return false;
  }
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/verifylogin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: {
          _id: cookie.get("userId"),
          sessionId: cookie.get("sessionId"),
        },
      }),
    }
  );
  // fix the bugs here
  if (response.status == 200) {
    // await fetch update session
    return true;
  } else {
    cookie.remove("userId");
    cookie.remove("sessionId");
    window.location.href = "/login"
    return false;
  }
};

export default verifyLogin;

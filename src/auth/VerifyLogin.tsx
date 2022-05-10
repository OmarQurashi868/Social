const verifyLogin = async (
  userId: string,
  sessionId: string
): Promise<boolean> => {
  if (userId == null || sessionId == null) return false;
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verifylogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userData: {
        _id: userId,
        sessionId: sessionId,
      },
    }),
  });
  // fix the bugs here
  if (response.status == 200) return true
  else return false
};

export default verifyLogin;

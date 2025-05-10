const login = async () => {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "testuser",
      password: "testpass",
    }),
  });

  const data = await response.json();
  console.log("レスポンス:", data);
};

login();

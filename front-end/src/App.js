import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const reqBody = {
      username: "hoviet",
      password: "123456",
    };
    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => Promise.all([response.json(), response.headers]))
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
      });
  }, []);

  useEffect(() => {
    console.log(`Jwt is: ${jwt}`);
  }, [jwt]);

  return (
    <div className="App">
      <div>{jwt}</div>
    </div>
  );
}

export default App;

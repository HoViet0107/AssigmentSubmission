import { useEffect } from "react";
import "./App.scss";
import { useLocalState } from "./store/UseLocalStorage";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if (!jwt) {
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
    }
  }, [jwt, setJwt]);

  useEffect(() => {
    console.log(`Jwt is: '${jwt}'`);
  }, [jwt]);

  return (
    <div className="App">
      <div>{jwt}</div>
    </div>
  );
}

export default App;

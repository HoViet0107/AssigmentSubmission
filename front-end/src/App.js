import { useEffect } from "react";
import "./App.scss";
import { useLocalState } from "./store/UseLocalStorage";
import { Route, Routes } from "react-router-dom";
// component import
import DashBoard from "./components/DashBoard/index.jsx";
import HomePage from "./components/HomePage";

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

  // useEffect(() => {
  //   console.log(`Jwt is: '${jwt}'`);
  // }, [jwt]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>

      <Route path="/dashboard" element={<DashBoard />}></Route>
    </Routes>
  );
}

export default App;

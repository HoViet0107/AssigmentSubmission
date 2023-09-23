import React, { useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// library
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// css
import "react-notifications/lib/notifications.css";
import ajax from "src/service/fetchService";

const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = (type) => {
    if (!jwt) {
      const reqBody = {
        username: username,
        password: password,
      };
      ajax("api/auth/login", false, "POST", reqBody)
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
          window.location.href = "dashboard";
        })
        .catch((message) => {
          NotificationManager.warning(
            "Invalid login attempt!",
            "Warning",
            2000
          );
        });
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="email"
          id="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button id="submit" type="submit" onClick={sendLoginRequest}>
          Submit
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Login;

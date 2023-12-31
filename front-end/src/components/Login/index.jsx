import React, { useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// library
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
// css
import "./style.scss";
// component
import "react-notifications/lib/notifications.css";
import CusButton from "src/components/CustomTag/CusButton/CusButton";
import CusInput from "src/components/CustomTag/CusInput/CusInput";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginRequest = (type) => {
    const reqBody = {
      username: username,
      password: password,
    };
    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        console.log("responseding...");
        return Promise.all([response.json(), response.headers]);
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        if (username === "" || password === "") {
          NotificationManager.warning(
            "Tên đăng nhập hoặc mật khẩu không được để trống!",
            "Warning",
            2000
          );
        } else {
          NotificationManager.warning(
            "Tên đăng nhập hoặc mật khẩu không đúng!",
            "Warning",
            2000
          );
        }
      });
    console.log("log");
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="flex-div">
        <div className="imgContainer"></div>
        <div className="loginInput">
          <CusInput
            htmlFor={"username"}
            type="text"
            id="username"
            onChange={handleUsernameChange}
            placeHolder="Hoviet, hoviet123, ..."
            changeValue={username}
            // message={"Tên đăng nhập không hợp lệ!"}
            condition={"Tên không được chứa khoảng trắng\nhoặc ký tự đặc biệt!"}
            labelVisible={true}
          >
            Tên đăng nhập
          </CusInput>
          <CusInput
            htmlFor={"password"}
            type="password"
            id="password"
            onChange={handlePasswordChange}
            changeValue={password}
            // message={"Mật khẩu không hợp lệ!"}
            condition={
              "Mật khẩu phải dài hơn 6 ký tự,\n không được chứa khoảng trắng"
            }
            labelVisible={true}
          >
            Mật khẩu
          </CusInput>

          <CusButton
            id="submit"
            type="submit"
            onClick={sendLoginRequest}
            // onClick={() => {
            //   console.log(username, " ", password);
            // }}
          >
            Submit
          </CusButton>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Login;

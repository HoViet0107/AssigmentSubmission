import React from "react";

const Login = () => {
  return (
    <div>
      <div>
        <label htmlFor="username">username</label>
        <input type="email" id="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" id="password" />
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useLocalState } from "src/store/UseLocalStorage";

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  return (
    <div>
      <h1>JWT is:</h1>
      <p>{jwt}</p>
    </div>
  );
};

export default DashBoard;

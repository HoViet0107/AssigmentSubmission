import React from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "src/store/UseLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  console.log(`jwt key: ${jwt}, private-route log`);
  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

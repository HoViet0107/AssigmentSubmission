import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajax from "src/service/fetchService";
import { useLocalState } from "src/store/UseLocalStorage";

const PrivateRoute = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log("1: isValid: ", isValid, ", isLoading: ", isLoading);
  // console.log(`jwt key: ${jwt}, private-route log`);
  if (jwt) {
    ajax(`/api/auth/validate?token=${jwt}`, jwt, "GET").then((isValidRes) => {
      setIsValid(isValidRes);
      setIsLoading(false);
      console.log("2: isValid: ", isValid, ", isLoading: ", isLoading);
    });
  } else {
    console.log("3: isValid: ", isValid, ", isLoading: ", isLoading);
    navigate("/login");
  }
  console.log("4: isValid: ", isValid, ", isLoading: ", isLoading);
  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    navigate("/login")
  );
};

export default PrivateRoute;

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      console.log("Timeout");
    }, 1000);

    ajax(`/api/auth/validate?token=${jwt}`, jwt, "GET")
      .then((isValidRes) => {
        setIsValid(isValidRes);
        setIsLoading(false);
        clearTimeout(timeout);
      })
      .catch(() => {
        setIsLoading(false);
        clearTimeout(timeout);
      });

    return () => {
      clearTimeout(timeout);
    };
  }, [jwt]);

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    navigate("/login")
  );
};

export default PrivateRoute;

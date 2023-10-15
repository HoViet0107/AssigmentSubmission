import React from "react";
import { useLocalState } from "src/store/UseLocalStorage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  return (
    <div>
      <button
        onClick={() => {
          setJwt(null);
          navigate("/login");
        }}
      >
        LogOut
      </button>
    </div>
  );
};

export default Header;

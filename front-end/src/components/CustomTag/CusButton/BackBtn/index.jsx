import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const BackBtn = (url) => {
  const navigate = useNavigate();
  return (
    <div className="back-btn-container">
      <div
        onClick={() => {
          navigate(url.url);
        }}
      >
        Cancel
      </div>
    </div>
  );
};

export default BackBtn;

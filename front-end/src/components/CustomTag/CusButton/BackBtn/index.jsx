import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

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

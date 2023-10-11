import React from "react";
import "./style.scss";
const Dialog = ({ message, onDialog }) => {
  return (
    <div onClick={() => onDialog(false)}>
      <h3 style={{ color: "#111", fontSize: "16px" }}>{message}</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => onDialog(true)}
          style={{
            background: "red",
            color: "white",
            padding: "10px",
            marginRight: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Yes
        </button>
        <button
          onClick={() => onDialog(false)}
          style={{
            background: "green",
            color: "white",
            padding: "10px",
            marginLeft: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Dialog;

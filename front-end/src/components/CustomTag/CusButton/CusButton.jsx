import "./style.scss";
import React from "react";

const CusButton = ({ children, ...attributes }) => {
  return (
    <button className="btn" type="button" {...attributes}>
      {children}
    </button>
  );
};

export default CusButton;

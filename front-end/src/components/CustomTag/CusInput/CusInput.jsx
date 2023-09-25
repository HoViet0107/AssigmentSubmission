import React, { useEffect, useState } from "react";
import "./style.scss";

// validate
import {
  validateUsername,
  validatePassword,
  getPMessage,
  getUMessage,
} from "src/validate/validate";

const CusInput = ({
  children,
  htmlFor,
  type,
  id,
  onChange,
  placeHolder,
  changeValue,
  condition,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [conditionTitle, setConditionTitle] = useState(condition);

  useEffect(() => {
    if (htmlFor === "username") {
      setIsValid(validateUsername(changeValue));
      setMessage(getUMessage);
    }
    if (htmlFor === "password") {
      setIsValid(validatePassword(changeValue));
      setMessage(getPMessage);
    }

    if (inputValue !== "") {
      setConditionTitle("");
    } else {
      setConditionTitle(condition);
    }
  }, [isValid, changeValue, htmlFor, inputValue, condition]);

  return (
    <div className="input-container">
      <label className="form__label" htmlFor={htmlFor}>
        {children}
      </label>
      <span className="inputSpan">
        <input
          className="form__field"
          type={type}
          id={id}
          onChange={(e) => {
            onChange(e);
            setInputValue(e.target.value);
          }}
          required
          placeholder={placeHolder}
          accept="text/plain"
        />
        {inputValue === "" ? (
          <span style={{ color: "red" }}>*</span>
        ) : (
          <span style={{ color: "#f2f3f2" }}>*</span>
        )}
      </span>
      {/* condition notification */}
      {isValid || inputValue === "" ? (
        <p
          className="conditionTitle"
          style={{ fontStyle: "italic", whiteSpace: "pre-line" }}
        >
          {conditionTitle}
        </p>
      ) : (
        <p className="conditionTitle" style={{ color: "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CusInput;

// InputField.js
import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";

function InputField({ placeholder }) {
  const { inputValue, setInputValue } = useContext(TaskContext);
  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder}
      style={{ marginRight: "10px" }}
    />
  );
}

export default InputField;

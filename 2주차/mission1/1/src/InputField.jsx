import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";

function InputField({ placeholder, isTitle }) {
  const { inputTitle, setInputTitle, inputDescription, setInputDescription } =
    useContext(TaskContext);

  const handleChange = (e) => {
    if (isTitle) {
      setInputTitle(e.target.value);
    } else {
      setInputDescription(e.target.value);
    }
  };

  return (
    <input
      type="text"
      value={isTitle ? inputTitle : inputDescription}
      onChange={handleChange}
      placeholder={placeholder}
      style={{
        padding: "8px",
        marginRight: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "200px",
      }}
    />
  );
}

export default InputField;

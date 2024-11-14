// AddButton.js
import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";

function AddButton({ label, onClick }) {
  const { addTask } = useContext(TaskContext);
  return (
    <button onClick={onClick || addTask} style={{ marginRight: "10px" }}>
      {label}
    </button>
  );
}

export default AddButton;

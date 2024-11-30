import React, { useContext } from "react";
import { TaskContext } from "./TaskContext";

function AddButton({ label }) {
  const { addNewTask } = useContext(TaskContext);

  return (
    <button
      onClick={addNewTask}
      style={{
        padding: "8px 12px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

export default AddButton;

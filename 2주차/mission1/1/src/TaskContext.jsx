// TaskContext.js
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // 새로운 할 일 추가
  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, id: Date.now() }]);
      setInputValue("");
    }
  };

  // 할 일 삭제
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 수정 시작
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  // 수정 완료
  const completeEditing = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        inputValue,
        editIndex,
        editValue,
        setInputValue,
        setEditValue,
        addTask,
        deleteTask,
        startEditing,
        completeEditing,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

import React, { createContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const queryClient = useQueryClient();

  // Input state for adding new tasks
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  // Edit task state
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // Mutations
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  // Function to add a new task
  const addNewTask = () => {
    if (!inputTitle.trim() || !inputDescription.trim()) {
      alert("제목과 내용을 입력하세요."); // Validation
      return;
    }

    addTaskMutation.mutate(
      {
        title: inputTitle.trim(),
        content: inputDescription.trim(),
      },
      {
        onSuccess: () => {
          alert("Task가 등록되었습니다!"); // Success notification
          setInputTitle(""); // Clear the input fields
          setInputDescription("");
        },
        onError: (error) => {
          console.error("Task 등록 실패:", error); // Log error
          alert("Task 등록에 실패했습니다. 다시 시도해주세요."); // Error notification
        },
      }
    );
  };

  // Update task
  const updateExistingTask = (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);

    if (!taskToUpdate) {
      console.error("Task not found for updating");
      return;
    }

    updateTaskMutation.mutate({
      id,
      updatedTask: {
        title: editTitle || taskToUpdate.title,
        description: editDescription || taskToUpdate.description,
        isChecked: taskToUpdate.isChecked,
      },
    });

    setEditIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Remove task
  const removeTask = (id) => {
    deleteTaskMutation.mutate(id);
  };

  // Toggle check state
  const toggleCheck = (id, isChecked) => {
    updateTaskMutation.mutate({
      id,
      updatedTask: { isChecked: !isChecked },
    });
  };

  // Start editing
  const startEditing = (index) => {
    setEditIndex(index);
    setEditTitle(tasks[index].title);
    setEditDescription(tasks[index].description);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        inputTitle,
        setInputTitle,
        inputDescription,
        setInputDescription,
        addNewTask, // 제공
        removeTask,
        toggleCheck,
        editIndex,
        editTitle,
        setEditTitle,
        editDescription,
        setEditDescription,
        startEditing,
        updateExistingTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

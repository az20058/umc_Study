import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskById } from "./api";

function TaskDetail() {
  const { id } = useParams(); // URL에서 id 가져오기

  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id), // 특정 Task 가져오기
  });

  if (isLoading) return <p>Loading task...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "500px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{task.title}</h2>
      <p style={{ color: "gray", marginBottom: "20px" }}>{task.content}</p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Status: {task.checked ? "완료" : "진행 중"}
      </p>
      <p style={{ fontSize: "12px", color: "gray" }}>
        최근 수정일: {new Date(task.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

export default TaskDetail;

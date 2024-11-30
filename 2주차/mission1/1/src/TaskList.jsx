import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, toggleTaskCheck, updateTask, deleteTask } from "./Api";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const queryClient = useQueryClient();
  const [editTaskId, setEditTaskId] = useState(null); // 수정 중인 태스크 ID
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const navigate = useNavigate();

  // 서버에서 데이터 가져오기
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // 체크박스 상태 변경 Mutation
  const toggleCheckMutation = useMutation({
    mutationFn: toggleTaskCheck,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // 데이터 다시 가져오기
    },
    onError: (error) => {
      console.error("체크 상태 업데이트 실패:", error);
      alert("체크 상태를 업데이트하는 데 실패했습니다."); // 에러 처리
    },
  });

  // 태스크 수정 Mutation
  const updateTaskMutation = useMutation({
    mutationFn: () => updateTask(editTaskId, editTitle, editDescription),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // 데이터 다시 가져오기
      setEditTaskId(null); // 수정 모드 종료
    },
    onError: (error) => {
      console.error("태스크 업데이트 실패:", error);
      alert("태스크를 업데이트하는 데 실패했습니다."); // 에러 처리
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // 데이터 다시 가져오기
    },
    onError: (error) => {
      console.error("태스크 삭제 실패:", error);
      alert("태스크를 삭제하는 데 실패했습니다."); // 에러 처리
    },
  });

  const handleSave = (id) => {
    updateTaskMutation.mutate({
      id,
      title: editTitle,
      content: editDescription,
    });
  };

  if (isLoading) return <p>Loading tasks...</p>; // 로딩 상태 처리
  if (isError) return <p>Error: {error.message}</p>; // 에러 처리

  return (
    <div>
      {tasks[0].length === 0 ? (
        <p>No tasks found.</p> // 데이터가 없을 때 표시
      ) : (
        tasks[0].map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: task.checked ? "#f0f8ff" : "#fff",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={task.checked}
              onClick={(e) => e.stopPropagation()}
              onChange={() =>
                toggleCheckMutation.mutate({
                  id: task.id,
                  checked: !task.checked, // 현재 상태의 반대 값을 전송
                })
              }
              style={{ marginRight: "10px" }}
            />
            <div
              style={{ flexGrow: 1 }}
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              {editTaskId === task.id ? (
                // 수정 모드
                <div>
                  <input
                    type="text"
                    value={editTitle} // 수정 제목 표시
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목을 입력하세요" // 기본 값 확인을 위한 placeholder
                    style={{
                      marginBottom: "5px",
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <textarea
                    value={editDescription} // 수정 내용 표시
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="내용을 입력하세요" // 기본 값 확인을 위한 placeholder
                    style={{
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 버블링 방지
                      handleSave(task.id); // 저장 로직 실행
                    }}
                    style={{
                      marginTop: "5px",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    저장
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 버블링 방지
                      setEditTaskId(null); // 수정 모드 취소
                    }}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : (
                // 읽기 모드 (제목 + 내용 표시)
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      textDecoration: task.checked ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      color: "gray",
                      textDecoration: task.checked ? "line-through" : "none",
                      marginTop: "5px", // 제목과 내용 간격 추가
                    }}
                  >
                    {task.content}
                  </div>
                </div>
              )}
            </div>

            {editTaskId === task.id ? null : (
              <button
                onClick={() => {
                  setEditTaskId(task.id); // 수정 모드 활성화
                  setEditTitle(task.title); // 기존 제목 로드
                  setEditDescription(task.content); // 기존 내용 로드
                }}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                수정
              </button>
            )}
            <button
              onClick={() => deleteTaskMutation.mutate(task.id)}
              style={{
                marginLeft: "10px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;

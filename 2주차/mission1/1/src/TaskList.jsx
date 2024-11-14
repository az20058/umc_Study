// TaskList.js
import { useContext } from "react";
import { TaskContext } from "./TaskContext";
import InputField from "./InputField";
import AddButton from "./AddButton";

function TaskList() {
  const {
    tasks,
    editIndex,
    editValue,
    deleteTask,
    startEditing,
    completeEditing,
    setEditValue,
  } = useContext(TaskContext);

  return (
    <div style={{ marginTop: "20px" }}>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "10px" }}>{index + 1}.</span>
          {editIndex === index ? (
            <>
              <InputField
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <AddButton
                onClick={() => completeEditing(index)}
                label="수정 완료"
              />
            </>
          ) : (
            <>
              <span style={{ marginRight: "10px" }}>{task.text}</span>
              <AddButton onClick={() => deleteTask(task.id)} label="삭제하기" />
              <AddButton
                onClick={() => startEditing(index)}
                label="수정 진행"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;

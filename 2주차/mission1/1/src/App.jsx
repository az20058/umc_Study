import { useState } from 'react';
import './App.css';
import InputField from './InputField'; // InputField 컴포넌트 import
import AddButton from './AddButton'; // AddButton 컴포넌트 import

function App() {
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
    <div style={{ padding: "20px" }}>
      <InputField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일 입력"
      />
      <AddButton onClick={addTask} label="할 일 등록" />

      <div style={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <div key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px" }}>{index + 1}.</span>

            {editIndex === index ? (
              <>
                <InputField
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <AddButton onClick={() => completeEditing(index)} label="수정 완료" />
              </>
            ) : (
              <>
                <span style={{ marginRight: "10px" }}>{task.text}</span>
                <AddButton onClick={() => deleteTask(task.id)} label="삭제하기" />
                <AddButton onClick={() => startEditing(index)} label="수정 진행" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

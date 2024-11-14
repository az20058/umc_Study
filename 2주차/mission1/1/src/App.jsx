// App.js
import "./App.css";
import { TaskProvider } from "./TaskContext";
import TaskList from "./TaskList"; // 새로 만든 TaskList 컴포넌트 import
import InputField from "./InputField";
import AddButton from "./AddButton";

function App() {
  return (
    <TaskProvider>
      <div style={{ padding: "20px" }}>
        <InputField placeholder="할 일 입력" />
        <AddButton label="할 일 등록" />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;

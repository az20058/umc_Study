import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./TaskContext";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import InputField from "./InputField";
import AddButton from "./AddButton";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <InputField placeholder="제목 입력" isTitle={true} />
                    <InputField placeholder="내용 입력" isTitle={false} />
                    <AddButton label="등록" />
                  </div>
                  <TaskList />
                </>
              }
            />
            <Route path="/tasks/:id" element={<TaskDetail />} />
          </Routes>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;

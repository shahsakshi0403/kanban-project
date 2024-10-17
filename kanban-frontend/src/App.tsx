// import { Route, Router, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/Login";
import TaskPage from "./pages/tasks/tasks";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;

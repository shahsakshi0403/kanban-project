import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/Login";
import TaskPage from "./pages/tasks/tasks";
import SignupPage from "./pages/signup/Signup";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

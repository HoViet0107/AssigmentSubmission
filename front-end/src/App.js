import "./App.scss";
import { Route, Routes } from "react-router-dom";
// component import
import DashBoard from "./components/DashBoard/index.jsx";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import AssignmentView from "./components/AssignmentView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

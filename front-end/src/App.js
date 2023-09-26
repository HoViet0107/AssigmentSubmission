import { Route, Routes } from "react-router-dom";
// component import
import DashBoard from "./components/DashBoard/index.jsx";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import AssignmentView from "./components/AssignmentView";
// scss
import "./App.scss";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

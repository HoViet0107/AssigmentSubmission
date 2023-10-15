import { Route, Routes } from "react-router-dom";
// component import
import DashBoard from "./components/DashBoard/index.jsx";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import AssignmentView from "./components/AssignmentView";
import CodeReviewerDashboard from "./components/CodeReviewerDashboard";
// scss
import "./App.scss";
import Header from "./components/Header/index.jsx";
import { useLocalState } from "./store/UseLocalStorage.js";
import { useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const getRolesFromJwt = () => {
    if (jwt) {
      const decoded_jwt = jwt_decode(jwt);
      return decoded_jwt.authorities;
    }
    return [];
  };
  const [roles, setRoles] = useState(getRolesFromJwt());
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                <CodeReviewerDashboard />
              ) : (
                <DashBoard />
              )}
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

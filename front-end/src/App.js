import "./App.scss";
import { Route, Routes } from "react-router-dom";
// component import
import DashBoard from "./components/DashBoard/index.jsx";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;

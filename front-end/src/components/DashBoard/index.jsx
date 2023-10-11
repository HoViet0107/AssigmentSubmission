import React, { useEffect, useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// eslint-disable-next-line no-unused-vars

import ajax from "src/service/fetchService";
import { NotificationManager } from "react-notifications";
import "./style.scss";
import Assignment from "./Assignment";
import CusButton from "src/components/CustomTag/CusButton/CusButton";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState({
    branch: "",
    githubUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // fetch assignment from db
  useEffect(() => {
    ajax("api/assignments", jwt, "GET")
      .then((assignmentsData) => {
        setAssignments(assignmentsData);
      })
      .catch(() => {
        return (window.location.href = "login");
      });
    setIsLoading(true);
  }, [jwt]);

  // create assignment
  const createAssignMent = () => {
    ajax("/api/assignments", jwt, "POST")
      .then((assignment) => {
        // console.log(assignment);
        navigate(`/assignments/${assignment.id}`);
      })
      .catch((message) => {
        console.log(`create assignment error: ${message}`);
        NotificationManager.error(message, "Warning", 2000);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-btn">
        <CusButton
          // onClick={() => console.log("create assignments")}
          onClick={createAssignMent}
        >
          New Assignment!
        </CusButton>
      </div>
      <div className="card-container">
        <div className="card-item">
          {assignments && assignments.length >= 0 && isLoading === true ? (
            assignments.map((assignment) => (
              <Assignment key={assignment.id} assignment={assignment} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

import React, { useEffect, useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// eslint-disable-next-line no-unused-vars

import ajax from "src/service/fetchService";
import "./style.scss";
import Assignment from "src/components/DashBoard/Assignment";

const CodeReviewerDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState({
    branch: "",
    githubUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="dashboard-container">
      <h1>Code Reviewer dashboard</h1>
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

export default CodeReviewerDashboard;

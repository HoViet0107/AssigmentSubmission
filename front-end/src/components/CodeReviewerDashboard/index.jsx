import React, { useEffect, useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// eslint-disable-next-line no-unused-vars

import ajax from "src/service/fetchService";
import "./style.scss";
import Assignment from "./Assignment";

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
    // console.log(jwt);
  }, [jwt]);

  return (
    <div className="cd-dashboard-container">
      <h1>Code Reviewer dashboard</h1>
      {/* <div className="assignment-wrapper in-review"></div> */}
      <div className="assignment-wrapper reviewed">
        <h3>Chờ xét duyệt</h3>
        <div className="card-container">
          <div className="card-item">
            {assignments && assignments.length >= 0 && isLoading === true ? (
              assignments.map((assignment) => (
                <Assignment
                  key={assignment.id}
                  assignment={assignment}
                  jwt={{ jwt }}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="assignment-wrapper needs-update"></div> */}
    </div>
  );
};

export default CodeReviewerDashboard;

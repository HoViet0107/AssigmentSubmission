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
  }, [jwt]);

  const handleAssignmentStatusChange = (updatedAssignment) => {
    console.log("assignment from parent comp: ", updatedAssignment);
  };

  useEffect(() => {
    console.log("Father comp assignment change? ", assignments);
  }, [assignments]);
  return (
    <div className="cd-dashboard-container">
      <h1>Code Reviewer dashboard</h1>
      <div className="assignment-wrapper reviewed">
        <h3>Chờ xét duyệt</h3>
        <div className="card-container">
          <div className="card-item">
            {assignments && assignments.length >= 0 && isLoading === true ? (
              Object.values(assignments)
                .filter((assignment) => assignment.status === "Submitted")
                .map((assignment) => (
                  <Assignment
                    key={assignment.id}
                    assignment={assignment}
                    onClaim={handleAssignmentStatusChange}
                  />
                ))
            ) : (
              <></>
            )}
          </div>
          <div className="card-item">
            {Object.values(assignments).filter((assignment) => {
              return assignment.status === "Submitted";
            }).length <= 0 && <div>Không tìm thấy assignment nào!</div>}
          </div>
        </div>
      </div>
      <div className="assignment-wrapper in-review">
        <h3>Đang xét duyệt</h3>
        <div className="card-container">
          <div className="card-item">
            {assignments && assignments.length >= 0 && isLoading === true ? (
              Object.values(assignments)
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => (
                  <Assignment
                    key={assignment.id}
                    assignment={assignment}
                    jwt={{ jwt }}
                  />
                ))
            ) : (
              <></>
            )}
          </div>
          <div className="card-item">
            {Object.values(assignments).filter(
              (assignment) => assignment.status === "In Review"
            ).length <= 0 && <div>Không tìm thấy assignment nào!</div>}
          </div>
        </div>
      </div>

      <div className="assignment-wrapper needs-update">
        <h3>Cần cập nhật</h3>
        <div className="card-container">
          <div className="card-item">
            {assignments && isLoading === true ? (
              Object.values(assignments)
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => {
                  return (
                    <Assignment key={assignment.id} assignment={assignment} />
                  );
                })
            ) : (
              <></>
            )}
          </div>
          <div className="card-item">
            {Object.values(assignments).filter(
              (assignment) => assignment.status === "Needs Update"
            ).length <= 0 && <div>Không tìm thấy assignment nào!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewerDashboard;

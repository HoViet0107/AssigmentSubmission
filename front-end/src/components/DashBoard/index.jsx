import React, { useEffect, useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import ajax from "src/service/fetchService";
import { NotificationManager } from "react-notifications";
import "./style.scss";

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState({
    branch: "",
    githubUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // create assignment
  const createAssignMent = () => {
    ajax("api/assignments", jwt, "POST")
      .then((assignment) => {
        window.location.href = `assignments/${assignment.id}`;
      })
      .catch((message) => {
        NotificationManager.error(message, "Warning", 2000);
      });
  };

  // fetch assignment from db
  useEffect(() => {
    ajax("api/assignments", jwt, "GET").then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
    setIsLoading(true);
  }, [jwt]);

  return (
    <div className="container">
      {assignments && assignments.length > 0 && isLoading === true ? (
        assignments.map((assignment) => (
          <div key={assignment.id}>
            <Link to={`/assignments/${assignment.id}`}>
              Assignment ID: {assignment.id}
            </Link>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={createAssignMent}>click!</button>
    </div>
  );
};

export default DashBoard;

import React, { useEffect, useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// css
import "./style.scss";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  // create assignment
  const createAssignMent = () => {
    fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json();
        }
      })
      .then((assignment) => {
        window.location.href = `assignment/${assignment.id}`;
      });
  };

  // fetch assignment from db
  useEffect(() => {
    fetch("api/assignments", {
      headers: {
        "Content-Type": "application.json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignmentsData) => {
        setAssignments(assignmentsData);
      });
  }, [jwt]);
  console.log(assignments);

  return (
    <div className="container">
      {assignments ? (
        assignments.map((assignment) => (
          <div key={assignment.id}>
            <Link to={`/assignments/${assignment.id}`}>
              Assignment ID: {assignment.id}
            </Link>
          </div>
        ))
      ) : (
        <></>
      )}
      <button onClick={createAssignMent}>click!</button>
    </div>
  );
};

export default DashBoard;

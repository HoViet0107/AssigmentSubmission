import React, { useEffect, useState } from "react";
import { useLocalState } from "src/store/UseLocalStorage";

const AssignmentView = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  // eslint-disable-next-line no-unused-vars
  const [assignment, setAssignment] = useState(null);

  useEffect(
    (response) => {
      fetch(`/api/assignments/${assignmentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return response.json();
          }
        })
        .then((assignmentData) => {
          setAssignment(assignmentData);
        });
    },
    [assignmentId, jwt]
  );

  return (
    <div>
      <h1>Assignment {assignmentId}</h1>
      {assignment ? (
        <>
          <h2>Status: {assignment.status}</h2>
          <h3>
            Branch:
            <input type="text" id="branch" />
          </h3>
          <h3>
            Github URL: <input type="url" id="gitHubUrl" />
          </h3>

          <button>Submit</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;

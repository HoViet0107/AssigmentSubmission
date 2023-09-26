import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ajax from "src/service/fetchService";
import { useLocalState } from "src/store/UseLocalStorage";
import CusButton from "src/components/CustomTag/CusButton/CusButton";

const AssignmentView = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  // eslint-disable-next-line no-unused-vars
  const [assignment, setAssignment] = useState(null);

  const updateAssignment = (props, value) => {
    const newAssignment = { ...assignment };
    newAssignment[props] = value;
    setAssignment(newAssignment);
  };

  useEffect(
    (response) => {
      ajax(`/api/assignments/${assignmentId}`, jwt, "GET").then(
        (assignmentData) => {
          setAssignment(assignmentData);
        }
      );
    },
    [assignmentId, jwt]
  );

  const save = () => {
    ajax(`/api/assignments/${assignmentId}`, jwt, "PUT", assignment)
      .then(
        NotificationManager.success(
          "Cập nhật assignment thành công!",
          "Success!"
        )
      )
      .then((assignmentData) => {
        setAssignment(assignmentData);
      })
      .catch((message) => {
        NotificationManager.warning(message, "Warning", 2000);
      });
  };

  return (
    <div>
      <h1>Assignment {assignmentId}</h1>
      {assignment ? (
        <>
          <h2>Status: {assignment.status}</h2>
          <h3>
            Branch:
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
            />
          </h3>
          <h3>
            Github URL:{" "}
            <input
              type="url"
              id="gitHubUrl"
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignment.githubUrl}
            />
          </h3>

          <CusButton onClick={save}>Submit</CusButton>
          <NotificationContainer />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;

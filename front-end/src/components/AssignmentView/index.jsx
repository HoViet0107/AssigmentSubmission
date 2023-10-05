import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ajax from "src/service/fetchService";
import { useLocalState } from "src/store/UseLocalStorage";
import CusButton from "src/components/CustomTag/CusButton/CusButton";
// scss
import "./style.scss";

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
    if (assignment.branch !== "" && assignment.githubUrl !== "") {
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
    } else {
      NotificationManager.warning(
        "Vui lòng nhập đầy đủ thông tin!",
        "Warning",
        2000
      );
    }
  };

  return (
    <div className="assignment-v-container">
      {assignment ? (
        <div className="assignment-v-items">
          <div className="assignment-v-head-status">
            <h1>{assignment.name}</h1>
            <h2 className="assignment-v-status">{assignment.status}</h2>
          </div>
          <h3 className="assignment-v-input">
            <label>Branch:</label>
            <input
              className="v-input-item"
              type="text"
              id="branch"
              onChange={(e) => {
                updateAssignment("branch", e.target.value);
              }}
              value={assignment.branch}
              required
            />
          </h3>
          <h3 className="assignment-v-input">
            <label>Github URL:</label>
            <input
              className="v-input-item"
              type="url"
              id="gitHubUrl"
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignment.githubUrl}
              required
            />
          </h3>

          <CusButton onClick={save}>Submit</CusButton>
          <NotificationContainer />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;

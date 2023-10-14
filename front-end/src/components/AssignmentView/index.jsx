import React, { useEffect, useRef, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ajax from "src/service/fetchService";
import { useLocalState } from "src/store/UseLocalStorage";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./style.scss";
import CusButton from "../CustomTag/CusButton/CusButton";

const AssignmentView = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  // eslint-disable-next-line no-unused-vars
  const [fAssignment, setFAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: 0,
    status: null,
  });

  const updateAssignment = (props, value) => {
    const newAssignment = { ...fAssignment };
    newAssignment[props] = value;
    setFAssignment(newAssignment);
  };

  const [fAssignmentEnums, setFAssignmentEnums] = useState([]);
  const [fAssignmentStatuses, setFAssignmentStatuses] = useState([]);

  const prevAssignmentValue = useRef(fAssignment);

  // get data
  useEffect(
    (response) => {
      ajax(`/api/assignments/${assignmentId}`, jwt, "GET").then(
        (assignmentResponse) => {
          let assignmentData = assignmentResponse;
          setFAssignment(assignmentData.assignment);
          setFAssignmentEnums(assignmentData.assignmentEnums);
          setFAssignmentStatuses(assignmentData.assignmentStatusEnums);
        }
      );
    },
    [assignmentId, jwt]
  );

  useEffect(() => {
    if (
      prevAssignmentValue.current.status !== null &&
      prevAssignmentValue.current.status !== fAssignment.status
    ) {
      persist();
    }
    prevAssignmentValue.current = fAssignment;
  }, [fAssignment]);

  const persist = () => {
    ajax(`/api/assignments/${fAssignment.number}`, jwt, "PUT", fAssignment)
      .then((assignmentData) => {
        setFAssignment(assignmentData);
        NotificationManager.success("!", "Success!");
      })
      .catch((message) => {
        NotificationManager.warning(message, "Warning", 2000);
      });
  };
  const save = () => {
    if (
      fAssignment.branch !== "" &&
      fAssignment.githubUrl !== "" &&
      fAssignment.branch !== null &&
      fAssignment.githubUrl !== null &&
      fAssignment.number !== null
    ) {
      // update status
      if (fAssignment.status === fAssignmentStatuses[0].status) {
        updateAssignment("status", fAssignmentStatuses[1].status);
      } else {
        persist();
      }
    } else {
      NotificationManager.warning(
        "Hãy nhập đầy đủ các trường!",
        "Warning",
        2000
      );
    }
  };

  return (
    <div className="assignment-v-container">
      {fAssignment ? (
        <div className="assignment-v-items">
          <div className="assignment-v-head-status">
            <h1>
              Assignment #
              {fAssignment.number === 0 ||
              fAssignment.number === "Chọn Assignment" ? (
                <></>
              ) : (
                fAssignment.number
              )}
            </h1>
            <h2 className="assignment-v-status">{fAssignment.status}</h2>
          </div>
          <h3 className="assignment-v-input">
            <p>Assignment Number:</p>
            <select
              name="assignmentEnum"
              id="assignmentEnum"
              onChange={(e) => {
                // onChangeHandle(e, setSelectedAssignment);
                updateAssignment("number", e.target.value);
              }}
              value={fAssignment.number}
            >
              {fAssignmentEnums?.map((assignEnum) => {
                return (
                  <option key={assignEnum.assignmentNum}>
                    {assignEnum.assignmentNum}
                  </option>
                );
              })}
            </select>
          </h3>
          <h3 className="assignment-v-input">
            <label>Branch:</label>
            <input
              className="v-input-item"
              type="text"
              id="branch"
              onChange={(e) => {
                updateAssignment("branch", e.target.value);
              }}
              value={fAssignment.branch}
              required={true}
            />
          </h3>
          <h3 className="assignment-v-input">
            <label>Github URL:</label>
            <input
              className="v-input-item"
              type="url"
              id="gitHubUrl"
              onChange={(e) => {
                updateAssignment("githubUrl", e.target.value);
              }}
              value={fAssignment.githubUrl}
              required={true}
            />
          </h3>

          <div className="assignment-btn-container">
            <CusButton onClick={save}>Submit</CusButton>
          </div>
          <NotificationContainer />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;

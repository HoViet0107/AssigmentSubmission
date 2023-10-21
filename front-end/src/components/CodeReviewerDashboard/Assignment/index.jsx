import React, { useEffect, useState } from "react";
// library
import { decodedJwt } from "src/customFunc/customFunc";
// scss
import "./style.scss";
import ajax from "src/service/fetchService";
import { useLocalState } from "src/store/UseLocalStorage";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Assignment = (assignment) => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isClaimClicked, setIsClaimClicked] = useState(false);

  useEffect(() => {
    if (isClaimClicked) {
      if (jwt) {
        const user = {
          username: decodedJwt(jwt).sub,
          authorities: decodedJwt(jwt).authorities,
        };
        const updateAssignment = { ...assignment };
        updateAssignment.status = "In Review";
        updateAssignment.codeReviewer = user;
        assignment.assignment.status = "In Review";
        // ajax(
        //   `/api/assignment/${assignment.assignment.id}`,
        //   jwt,
        //   "PUT",
        //   updateAssignment
        // ).then((updatedAssignment) => {
        //   // TODO: update the view for the assignment that changed
        //   NotificationManager.success("!", "Success!");
        // });
      }
      setIsClaimClicked(!isClaimClicked);
      console.log("Assignment comp assignment change: ", assignment);
      // return assignment;
    }
  }, [assignment, isClaimClicked, jwt]);

  const claimAssignment = () => {
    setIsClaimClicked(!isClaimClicked);
    assignment.onClaim(assignment);
  };
  useEffect(() => {
    console.log("Assignment comp assignment status change: ", assignment);
  }, [assignment]);
  return (
    <div className="assignment-container">
      <div className="card-content">
        <h3 className="card-title">
          Assignment #{assignment.assignment.number}
        </h3>
        <h4 className="card-subtitle">{assignment.assignment.status}</h4>
        <p className="card-details">
          <b>GitHubUrl: </b>
          <span>{assignment.assignment.githubUrl}</span>
        </p>
        <p className="card-details">
          <b>Branch: </b>
          <span>{assignment.assignment.branch}</span>
        </p>
      </div>
      <div className="btn-container">
        <button onClick={claimAssignment}>Claim</button>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Assignment;

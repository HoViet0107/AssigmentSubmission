import React from "react";
// library
import { Link } from "react-router-dom";
//icon
import { AiOutlineEdit } from "react-icons/ai";
// scss
import "./style.scss";

const Assignment = (assignment) => {
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
        <Link to={`/assignments/${assignment.assignment.id}`}>
          <AiOutlineEdit />
        </Link>
      </div>
    </div>
  );
};

export default Assignment;

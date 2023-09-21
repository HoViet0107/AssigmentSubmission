import React from "react";
import { useLocalState } from "src/store/UseLocalStorage";
// css
import "./style.scss";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const DashBoard = () => {
  // eslint-disable-next-line no-unused-vars
  const [jwt, setJwt] = useLocalState("", "jwt");

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

  return (
    <div className="container">
      <button onClick={createAssignMent}>
        click!
        {/* <Link to="/assignments">New Assignment</Link> */}
      </button>
    </div>
  );
};

export default DashBoard;

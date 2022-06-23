import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Logs() {
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState("entry");
  const navigate = useNavigate();

  return (
    <div className="position-div-center bg-light bg-shadow ">
      <div
        className="d-flex-col-center"
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          position: "relative",
          top: "5%",
        }}
      >
        <div style={{ fontSize: "1.2rem" }}>Logs</div>
        <div>
          <a
            style={{
              fontSize: "1.2rem",
            }}
            onClick={() => navigate("/entry")}
          >
            Back
          </a>
        </div>
      </div>
      <nav style={{ marginTop: "1.2rem" }}>
        <ul
          className="d-flex-col-center"
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            listStyle: "none",
          }}
        >
          <li>
            <a onClick={() => setData("entry")}>Entry</a>
          </li>
          <li>
            <a onClick={() => setData("exit")}>Exit</a>
          </li>
        </ul>
      </nav>
      <div style={{ marginTop: "0.8rem", height: "75%" }}>
        <ul
          className="d-flex-col-center"
          style={{
            listStyle: "none",
            overflowY: "auto",
            height: "100%",
            justifyContent: "normal",
          }}
        >
          {data === "entry"
            ? authData.entries.map((elem) => {
                return <li key={elem._id}>{`entry: ${elem.entry}`}</li>;
              })
            : authData.exits.map((elem) => {
                return <li key={elem._id}>{`exit: ${elem.exit}`}</li>;
              })}
        </ul>
      </div>
    </div>
  );
}

export default Logs;

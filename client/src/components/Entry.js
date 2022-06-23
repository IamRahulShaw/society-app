import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Entry() {
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogEntry = async () => {
    try {
      const { data } = await axios.get("/api/users/logentry", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { doc } = data;
      setAuthData({
        ...authData,
        entries: [...(Array.from(doc.entries) ?? null)],
        exits: [...(Array.from(doc.exits) ?? null)],
      });
      navigate("/logs");
    } catch (e) {
      navigate("/login");
    }
  };

  const onLogExit = async () => {
    try {
      const { data } = await axios.get("/api/users/logexit", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { doc } = data;
      setAuthData({
        ...authData,
        entries: [...(Array.from(doc.entries) ?? null)],
        exits: [...(Array.from(doc.exits) ?? null)],
      });
      navigate("/logs");
    } catch (e) {
      navigate("/login");
    }
  };

  return (
    <div className="position-div-center bg-light bg-shadow ">
      <div
        className="d-flex-col-center"
        style={{ flexDirection: "row", fontSize: "2rem" }}
      >
        Hello Rahul
      </div>
      <div id="entryDiv">
        <button className="primary-btn" onClick={onLogEntry}>
          Log Entry
        </button>
        <button className="primary-btn" onClick={onLogExit}>
          Log Exit
        </button>
        <button className="primary-btn" onClick={onLogEntry}>
          Logs
        </button>
        <button
          className="primary-btn"
          onClick={() => {
            localStorage.setItem("token", "");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Entry;

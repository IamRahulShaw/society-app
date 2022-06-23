import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="position-div-center bg-light bg-shadow d-flex-col-center">
      <button
        className="primary-btn"
        style={{ marginBottom: "1rem" }}
        onClick={() => navigate("register")}
      >
        Register
      </button>
      <button className="primary-btn" onClick={() => navigate("login")}>
        Login
      </button>
    </div>
  );
}

export default Home;

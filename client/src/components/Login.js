import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

function Login() {
  const [data, setData] = useState({ mobileNumber: "", password: "" });
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeFunc = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const postDataFunc = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);
      setData({ mobileNumber: "", password: "" });
      setAuthData({
        ...authData,
        login: true,
        registered: true,
        verified: true,
      });
      localStorage.setItem("token", `${response.data.token}`);
      navigate("/entry");
    } catch (e) {
      setData({ mobileNumber: "", password: "" });
      setAuthData({ ...authData, login: false });
      navigate("/register");
      alert("Invalid Details");
    }
  };

  const onSumbitHandler = async (e) => {
    e.preventDefault();
    await postDataFunc(data);
  };

  return (
    <div className="position-div-center bg-light bg-shadow d-flex-col-center">
      <form
        className="d-flex-col-center"
        style={{ justifyContent: "space-evenly", height: "60%" }}
        onSubmit={onSumbitHandler}
      >
        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={data.mobileNumber}
          onChange={onChangeFunc}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeFunc}
        />
        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

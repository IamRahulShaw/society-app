import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";

const initialData = {
  name: "",
  mobileNumber: "",
  society: "Marvel",
  password: "",
  confirmPassword: "",
};

function Register() {
  const [data, setData] = useState(initialData);
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeFunc = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const postDataFunc = async (data) => {
    try {
      const response = await axios.post("/api/users/register", data);
      setData(initialData);
      setAuthData({
        ...authData,
        registered: true,
        mobileNumber: data.mobileNumber,
      });
      navigate("/verify");
      alert(`OTP: ${response.data.otp}`);
    } catch (e) {
      setData(initialData);
      setAuthData({ ...authData, registered: false });
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
        style={{ justifyContent: "space-evenly", height: "90%" }}
        onSubmit={onSumbitHandler}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={onChangeFunc}
        />
        <input
          type="number"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={data.mobileNumber}
          onChange={onChangeFunc}
        />
        <select
          value={data.society}
          name="society"
          placeholder="Society"
          onChange={onChangeFunc}
        >
          <option value="Marvel">Marvel</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeFunc}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={onChangeFunc}
        />
        <button type="submit" className="primary-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

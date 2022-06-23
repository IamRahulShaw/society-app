import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

function Verify() {
  const [data, setData] = useState({ otp: "" });
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeFunc = (e) => {
    setData({ otp: e.target.value });
  };

  const postDataFunc = async (data) => {
    try {
      const response = await axios.delete("/api/users/verify", {
        data: {
          mobileNumber: authData.mobileNumber,
          ...data,
        },
      });
      setData({ otp: "" });
      setAuthData({ ...authData, verified: true, mobileNumber: "" });
      navigate("/login");
    } catch (e) {
      setAuthData({ ...authData, verified: false, mobileNumber: "" });
      navigate("/register");
      alert("Invalid Otp");
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
        style={{ justifyContent: "space-evenly", height: "50%" }}
        onSubmit={onSumbitHandler}
      >
        <input
          type={"number"}
          name="otp"
          placeholder="Enter OTP"
          value={data.otp}
          onChange={onChangeFunc}
        />
        <button type="submit" className="primary-btn">
          Verify
        </button>
      </form>
    </div>
  );
}

export default Verify;

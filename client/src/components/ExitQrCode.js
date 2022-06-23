import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { AuthContext } from "../App";

function ExitQrCode() {
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const LogExit = async (qrtext) => {
    try {
      const { data } = await axios.get("/api/users/logexit", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAuthData({
        ...authData,
        entries: [...(data.entries ?? null)],
        exits: [...(data.exits ?? null)],
      });
      navigate("/logs");
    } catch (e) {
      navigate("/entry");
    }
  };

  return (
    <div className="position-div-center bg-light bg-shadow ">
      <QrReader
        onResult={async (result, error) => {
          if (!!result) {
            if (result.getText() == "Marvel") {
              await LogExit(result.getText());
            }
          }
          if (!!error) {
            // console.log(error);
          }
        }}
        style={{ width: "100%" }}
        scanDelay={500}
      />
    </div>
  );
}

export default ExitQrCode;

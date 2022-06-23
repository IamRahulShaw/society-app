import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Entry from "./components/Entry";
import Home from "./components/Home";
import Login from "./components/Login";
import Logs from "./components/Logs";
import Register from "./components/Register";
import Verify from "./components/Verify";
// import EntryQrCode from "./components/EntryQrCode";
// import ExitQrCode from "./components/ExitQrCode";

const initialAuthData = {
  registered: false,
  verified: false,
  login: false,
  mobileNumber: "",
  entries: [],
  exits: [],
};

export const AuthContext = React.createContext();

function App() {
  let [authData, setAuthData] = useState(initialAuthData);

  const authFunc = async () => {
    axios
      .get("/api/users/auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        const { doc } = result.data;
        setAuthData({
          ...authData,
          registered: true,
          verified: true,
          login: true,
          entries: [...(Array.from(doc.entries) ?? null)],
          exits: [...(Array.from(doc.exits) ?? null)],
        });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    authFunc();
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="verify" element={<Verify />} /> */}
        <Route
          path="verify"
          element={
            authData.registered ? <Verify /> : <Navigate to="/register" />
          }
        />
        <Route
          path="entry"
          element={
            authData.registered ? <Entry /> : <Navigate to="/register" />
          }
        />
        {/* <Route path="entryqrcode" element={<EntryQrCode />} /> */}
        {/* <Route path="exitqrcode" element={<ExitQrCode />} /> */}
        <Route
          path="logs"
          element={authData.registered ? <Logs /> : <Navigate to="/register" />}
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;

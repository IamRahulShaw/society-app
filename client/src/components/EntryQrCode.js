// import React, { useContext, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { QrReader } from "react-qr-reader";
// import { AuthContext } from "../App";

// function EntryQrCode() {
//   const { authData, setAuthData } = useContext(AuthContext);
//   const qrRef = useRef(null);
//   const navigate = useNavigate();

//   const onButtonClick = () => {
//     qrRef.current.openImageDialog();
//   };

//   // const onScanQr = async (result) => {
//   //   try {
//   //     if(result)
//   //     console.log("hi");
//   //     const { data } = await axios.get("/api/users/logentry", {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //       },
//   //     });
//   //     console.log(data);
//   //     setAuthData({
//   //       ...authData,
//   //       entries: [...(data.entries ?? null)],
//   //       exits: [...(data.exits ?? null)],
//   //     });
//   //     navigate("/logs");
//   //   } catch (e) {
//   //     navigate("/entry");
//   //   }
//   // };

//   const handleScanQr = (result) => {
//     console.log(result);
//   };

//   const handleError = (error) => {
//     console.log(error);
//   };

//   return (
//     <div className="position-div-center bg-light bg-shadow ">
//       <QrReader
//         ref={qrRef}
//         onScan={handleScanQr}
//         onError={handleError}
//         style={{ width: "100%" }}
//         scanDelay={500}
//         legacyMode
//       />
//       <button className="primary-btn" onClick={onButtonClick}>
//         Upload Qr Code
//       </button>
//     </div>
//   );
// }

// export default EntryQrCode;

import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState, useEffect } from "react";

function WaitingForData() {
  const [Token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Tokken");
    const decodedToken = jwtDecode(token);
    setToken(decodedToken);
    console.log(decodedToken);
  }, []);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {console.log(Token)}
      <div className="text-center">
      {Token!==null ? <><h1>اهلا وسهلا {Token.fullName}</h1>
      <h1>انت بالفعل {Token.Role} معنا    </h1></>:<></>}
        <div
          className="spinner-border text-danger mb-3"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">انتظار...</span>
        </div>
        <h3 className="mt-3">جاري اعداد موقع تخليص للخدمات الجمركيه...</h3>
        <p className="text-muted">الرجاء الانظار الموقع تحت الانشاء</p>
      </div>
    </div>
  );
}

export default WaitingForData;

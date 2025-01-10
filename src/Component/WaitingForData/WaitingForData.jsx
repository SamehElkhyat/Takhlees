import React from "react";

function WaitingForData() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center">
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

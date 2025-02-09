import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AccountantLandingPage() {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);

  const Styles = {
    cards1: {
      backgroundColor: Ishovered1 ? "#1ea9e2" : "white",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards2: {
      backgroundColor: Ishovered2 ? "#1ea9e2" : "white",
      transform: Ishovered2 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered2 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4">مرحباً بك!</h1>
        <h5 className="text-muted mb-4">اختر ما تريد القيام به:</h5>
        <div className="row d-flex justify-content-center align-items-center flex-row-reverse">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div
              className="card text-center mb-3 mx-3"
              onMouseEnter={() => setIshovered1(true)}
              onMouseLeave={() => setIshovered1(false)}
              style={Styles.cards1}            >
              <div className="card-body">
                <i
                  className="fa-solid fa-code-pull-request"
                  style={{ fontSize: "40px", padding: "20px" }}
                ></i>
                <h5 className="card-title">قائمه الحوالات للمخلصين</h5>
                <p className="card-text">
                  استعرض الحوالات وقم باداره الحوالات للعملاء بكل سهولة
                </p>
                <Link
                  to="/AcceptedOrderAccountant"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#1ea9e2" }}
                >
                  استعرض الحوالات
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              onMouseEnter={() => setIshovered2(true)}
              onMouseLeave={() => setIshovered2(false)}
              style={Styles.cards2}

            >
              <div className="card-body">
                <i
                  className="fa-solid fa-code-pull-request"
                  style={{ fontSize: "40px", padding: "20px" }}
                ></i>
                <h5 className="card-title">سجل الحوالات المنفذه</h5>
                <p className="card-text">
                  استعرض سجل الحوالات المنفذه وقم باداره بكل سهولة
                </p>
                <Link
                  to="/AcceptedOrderAccountant"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#1ea9e2" }}
                >
                  استعرض السجل
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

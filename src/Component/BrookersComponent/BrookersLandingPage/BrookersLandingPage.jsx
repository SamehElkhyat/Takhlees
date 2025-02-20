import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BrookersLandingPage() {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);

  const styles = {
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
    cards3: {
      backgroundColor: Ishovered3 ? "#1ea9e2" : "white",
      transform: Ishovered3 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered3 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards4: {
      backgroundColor: Ishovered4 ? "#1ea9e2" : "white",
      transform: Ishovered4 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered4 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    icons: {
      fontSize: "50px",
      padding: "20px",
    },
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h1
          className="mb-4"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          مرحباًبك!
        </h1>
        <h5
          className="text-muted mb-4"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          اختر ما تريد القيام به:
        </h5>
        <div className="row d-flex justify-content-center align-items-center flex-row-reverse">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div
              className="card text-center mb-3 mx-3"
              style={styles.cards1}
              onMouseEnter={() => setIshovered1(true)}
              onMouseLeave={() => setIshovered1(false)}
            >
              <div className="card-body">
                <i
                  className="fa-solid fa-code-pull-request"
                  style={{ fontSize: "40px", padding: "20px" }}
                ></i>
                <h5 className="card-title">العروض المتاحة</h5>
                <p className="card-text">
                  استعرض العروض المتاحة وقم بتقديم عروضك للعملاء بكل سهولة
                </p>
                <Link
                  to="/availableOrders"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#1ea9e2" }}
                >
                  استعرض العروض
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              style={styles.cards2}
              onMouseEnter={() => setIshovered2(true)}
              onMouseLeave={() => setIshovered2(false)}
            >
              <div className="card-body">
                <i
                  className="fa-solid fa-envelope-open-text"
                  style={{
                    fontSize: "40px",
                    padding: "20px",
                    color: "#71c241",
                  }}
                ></i>

                <h5
                  className="card-title"
                  style={{ width: "18rem", fontSize: "1.5rem" }}
                >
                  العروض القائمة
                </h5>
                <p className="card-text">
                  قم بإنشاء عروض جديدة ومتابعة حالة العروض الموجودة
                </p>
                <Link
                  style={{ backgroundColor: "#1ea9e2" }}
                  to="/currentoffers"
                  className="btn btn-primary"
                >
                  استعرض العروض
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              style={styles.cards3}
              onMouseEnter={() => setIshovered3(true)}
              onMouseLeave={() => setIshovered3(false)}
            >
              <div className="card-body">
                <i
                  className="fa-solid fa-clock-rotate-left"
                  style={{
                    fontSize: "40px",
                    padding: "20px",
                    color: "#1ea9e2",
                  }}
                ></i>

                <h5 className="card-title"> سجل العروض</h5>
                <p className="card-text">
                  استعرض سجل العروض السابقة وتاريخ التعاملات
                </p>
                <Link
                  style={{ backgroundColor: "#1ea9e2" }}
                  to="/HistoryOfOrders"
                  className="btn btn-primary"
                >
                  استعرض السجل
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              style={styles.cards4}
              onMouseEnter={() => setIshovered4(true)}
              onMouseLeave={() => setIshovered4(false)}
            >
              <div className="card-body">
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{
                    fontSize: "40px",
                    padding: "20px",
                    color: "#1A39A0",
                  }}
                ></i>

                <h5 className="card-title">المحفظة</h5>
                <p className="card-text">
                  استعرض محفظتك الرقمية وقم بإدارة المالية
                </p>
                <Link
                  style={{ backgroundColor: "#1ea9e2" }}
                  to="/BrookersCart"
                  className="btn btn-primary"
                >
                  استعرض المحفظة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

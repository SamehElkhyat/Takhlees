import React from "react";
import { Link } from "react-router-dom";

export default function AccountantLandingPage() {
  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4">مرحباً بك!</h1>
        <h5 className="text-muted mb-4">اختر ما تريد القيام به:</h5>
        <div className="row d-flex justify-content-center align-items-center flex-row-reverse">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <div
              className="card text-center mb-3 mx-3"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
              <i class="fa-solid fa-code-pull-request" style={{fontSize:"40px", padding:"20px"}}></i>
                <h5 className="card-title">قائمه الحوالات للمخلصين</h5>
                <p className="card-text">
                  استعرض الحوالات وقم باداره الحوالات للعملاء بكل سهولة
                </p>
                <Link  to="/AcceptedOrderAccountant" className="btn btn-primary" style={{backgroundColor:"#1ea9e2"}}>
                  استعرض العروض
                </Link>
              </div>
            </div>




          </div>
        </div>
      </div>
    </>
  );
}


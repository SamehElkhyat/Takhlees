import React from "react";
import { Link } from "react-router-dom";

export default function BrookersLandingPage() {
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
                <h5 className="card-title">العروض المتاحة</h5>
                <p className="card-text">
                  استعرض العروض المتاحة وقم بتقديم عروضك للعملاء بكل سهولة
                </p>
                <Link  to="/availableOrders" className="btn btn-primary" style={{backgroundColor:"#1ea9e2"}}>
                  استعرض العروض
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              style={{ width: "18rem"  }}
            >
              <div className="card-body">
              <i class="fa-solid fa-envelope-open-text" style={{fontSize:"40px", padding:"20px" ,color:"#71c241"}}></i>

                <h5
                  className="card-title"
                  style={{ width: "18rem", fontSize: "1.5rem" }}
                >
                  العروض القائمة
                </h5>
                <p className="card-text">
                  قم بإنشاء عروض جديدة ومتابعة حالة العروض الموجودة
                </p>
                <Link style={{backgroundColor:"#1ea9e2"}} to="/currentoffers" className="btn btn-primary">
                  استعرض العروض
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
              <i class="fa-solid fa-clock-rotate-left" style={{fontSize:"40px", padding:"20px",color:"#1ea9e2"}}></i>

                <h5
                  className="card-title"
                  style={{ width: "18rem", fontSize: "1.5rem" }}
                >
                  {" "}
                  سجل العروض
                </h5>
                <p className="card-text">
                  استعرض سجل العروض السابقة وتاريخ التعاملات
                </p>
                <Link style={{backgroundColor:"#1ea9e2"}} to="/HistoryOfOrders" className="btn btn-primary">
                  استعرض السجل
                </Link>
              </div>
            </div>

            <div
              className="card text-center mb-3 mx-3"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
              <i class="fa-solid fa-cart-shopping" style={{fontSize:"40px", padding:"20px" ,color:"#1A39A0"}}></i>

                <h5
                  className="card-title"
                  style={{ width: "18rem", fontSize: "1.5rem" }}
                >
                  المحفظة
                </h5>
                <p className="card-text">
                  استعرض محفظتك الرقمية وقم بإدارة المالية
                </p>
                <Link style={{backgroundColor:"#1ea9e2"}} to="/BrookersCart" className="btn btn-primary">
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

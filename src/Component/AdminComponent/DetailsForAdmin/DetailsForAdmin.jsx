import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderDetails() {
  return (
    <div id="New-Order" className="container mt-5" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px", padding: "20px" }}>
      <div className="card shadow-lg border-0">
        <div className="card-header text-white text-center" style={{ backgroundColor: "#08g245" }}>
          <h3 className="mb-0" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>📝 تفاصيل الطلب</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <h5 className="text-dark font-weight-bold text-center mb-3" style={{ fontSize: "1.5rem", color: "#331" }}> معلومات الطلب</h5>
              <table className="table table-bordered text-center bg-white shadow-sm rounded" style={{ fontSize: "1.2rem" }}>
                <tbody>
                  <tr><th className="bg-light"> رقم الطلب</th><td>12345</td></tr>
                  <tr><th className="bg-light"> تاريخ الطلب</th><td>2025-03-05</td></tr>
                  <tr><th className="bg-light"> نوع الشحنة</th><td>بضائع عامة</td></tr>
                  <tr><th className="bg-light"> الحي</th><td>وسط المدينة</td></tr>
                  <tr><th className="bg-light"> الرمز البريدي</th><td>123456</td></tr>
                  <tr><th className="bg-light"> المدينة</th><td>الرياض</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}

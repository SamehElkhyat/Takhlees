import React from "react";
import { Table } from "react-bootstrap";

export default function OrderDetails() {
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0 text-center">تفاصيل الطلب</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5 className="text-muted mb-3">معلومات الطلب</h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>رقم الطلب</th>
                      <td>#12345</td>
                    </tr>
                    <tr>
                      <th>تاريخ الطلب</th>
                      <td>2024/1/15</td>
                    </tr>

                    <tr>
                      <th>نوع الشحنة</th>
                      <td>حاوية</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-6">
                <h5 className="text-muted mb-3">معلومات الشحن</h5>
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>الميناء/المطار</th>
                      <td>ميناء جدة الإسلامي</td>
                    </tr>
                    <tr>
                      <th>رقم البوليصة</th>
                      <td>BOL-789456</td>
                    </tr>
                    <tr>
                      <th>وزن الشحنة</th>
                      <td>1500 كجم</td>
                    </tr>
                    <tr>
                      <th>عدد القطع</th>
                      <td>3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-12">
                <h5 className="text-muted mb-3">ملاحظات إضافية</h5>
                <div className="p-3 bg-light rounded">
                  <p className="mb-0">
                    يرجى التعامل مع الشحنة بعناية فائقة. تحتوي على مواد قابلة
                    للكسر.
                  </p>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <h5 className="text-muted mb-3">العروض المقدمة</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>رقم المعرف</th>
                      <th>التقييم</th>
                      <th>سعر العرض</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <span className="text-warning">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </span>
                      </td>
                      <td>1500 ريال</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>
                        <span className="text-warning">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                        </span>
                      </td>
                      <td>1200 ريال</td>
                    </tr>
                  </tbody>
                </Table>

                <div className="mt-4">
                  <h5 className="text-muted mb-3">تقديم عرض جديد</h5>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="ادخل سعر العرض بالريال"
                      aria-label="سعر العرض"
                    />
                    <button className="btn btn-primary" type="button">
                      تقديم العرض
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

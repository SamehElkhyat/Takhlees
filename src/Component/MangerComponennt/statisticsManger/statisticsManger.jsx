import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function StatisticsManger() {
  const [Statics, setStatics] = useState({});
  const [Brookers, setBrookers] = useState([]);

  const GetStatics = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Statistics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);
      setStatics(data);
    } catch (error) {
      console.log(error);
    }
  };
  const GetBrookers = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Evaluation-Broker`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      setBrookers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetStatics();
    GetBrookers();
  }, []);
  return (
    <>
      <div className="container py-5">
        <h2
          className="text-center mb-4"
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
          إحصائيات النظام
        </h2>

        <div className="row g-4">
          {/* Total Clients Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-primary mb-2">
                  <i className="fas fa-users"></i>
                </div>
                <h5 className="card-title">إجمالي العملاء</h5>
                <h3 className="text-primary">{Statics.countAllUsers}</h3>
                <p className="text-muted small">زيادة 12% عن الشهر السابق</p>
              </div>
            </div>
          </div>

          {/* Active Orders Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-success mb-2">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <h5 className="card-title">الطلبات النشطة</h5>
                <h3 className="text-success">{Statics.countActiveOrders}</h3>
                <p className="text-muted small">في طور المعالجة</p>
              </div>
            </div>
          </div>

          {/* Completed Orders Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-info mb-2">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h5 className="card-title">الطلبات المكتملة</h5>
                <h3 className="text-info">{Statics.countDoneOrders}</h3>
                <p className="text-muted small">هذا العام</p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <div className="display-4 text-warning mb-2">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <h5 className="card-title">الإيرادات</h5>
                <h3 className="text-warning">{Statics.exports}</h3>
                <p className="text-muted small">ريال سعودي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5
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
                  className="card-title mb-4"
                >
                  أداء الوسطاء
                </h5>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>الوسيط</th>
                      <th>البريد الالكتروني</th>
                      <th>التقييم</th>
                      <th>الطلبات المنجزة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Brookers.map((item, index) => (
                      <tr className="w-100 text-center" key={index}>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>

                        <td>
                          {
                            <td>
                              <span className="text-warning">
                                {item.count === 0 && (
                                  <>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 0 && item.count <= 5 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 5 && item.count <= 25 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 25 && item.count <= 50 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 50 && item.count <= 100 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 100 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                  </>
                                )}
                              </span>
                            </td>
                          }
                        </td>

                        <td>{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

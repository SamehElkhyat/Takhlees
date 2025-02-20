import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

const BrookersCart = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function WalletInfo() {
    const [InfoOrders, setInfoOrders] = useState({});
    const InformationAboutOrder = async () => {
      try {
        const { data } = await axios.get(
          `https://user.runasp.net/api/Get-Count-Accept-Failed-Wait-Orders-Broker`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
            },
          }
        );
        setInfoOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      InformationAboutOrder();
    }, []);

    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4">
            <div
              className="card text-white bg-danger mb-3 shadow-lg rounded-4"
              style={{
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 0, 0, 0.2)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-body text-center">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  عدد الطلبات الملغاه
                </p>
                <i className="fa-3x mb-2 fas fa-times-circle"></i>
                <p className="display-5 fw-bold">{InfoOrders.failedOrder}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div
              className="card text-white bg-warning mb-3 shadow-lg rounded-4"
              style={{
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 0, 0.2)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-body text-center">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  عدد الطلبات المنتظره
                </p>
                <i className="fa-3x mb-2 fas fa-clock"></i>
                <p className="display-5 fw-bold">{InfoOrders.waitOrder}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div
              className="card text-white bg-success mb-3 shadow-lg rounded-4"
              style={{
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                background: "rgba(0, 255, 0, 0.2)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-body text-center">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  عدد الطلبات الناجحه
                </p>
                <i className="fas fa-check-circle fa-3x mb-2"></i>
                <p className="display-5 fw-bold">{InfoOrders.acceptOrder}</p>
              </div>
            </div>
          </div>
    
          {/* MONEY FELLOWS */}

          <h3
            style={{
              fontSize: "2.2rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
            className="mb-4 text-center"
          >
            التحويلات
          </h3>

          <div className="col-12 col-md-4">
            <div
              className="card text-white bg-danger mb-3 shadow-lg rounded-4"
              style={{
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 0, 0, 0.2)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-body text-center">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  المبالغ التي لم يتم تحويلها
                </p>
                <i class=" fa-3x fa-solid mb-2 fa-sack-dollar"></i>
                <p className="display-5 fw-bold">
                  {InfoOrders.totalFailedRequests}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div
              className="card text-white bg-warning mb-3 shadow-lg rounded-4"
              style={{
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 0, 0.2)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-body text-center">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  المبالغ المنتظره{" "}
                </p>
                <i class=" fa-3x fa-solid mb-2 fa-sack-dollar"></i>
                <p className="display-5 fw-bold">
                  {InfoOrders.totalWaitRequests}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div
              className="card text-white bg-success mb-3 shadow-lg rounded-4"
              style={{
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                backdropFilter: "blur(10px)",
                background: "rgba(0, 255, 0, 0.2)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-body text-center">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  المبالغ التي تم تحويلها{" "}
                </p>
                <i class=" fa-3x fa-solid mb-2 fa-sack-dollar"></i>
                <p className="display-5 fw-bold">
                  {InfoOrders.totalSuccessfulRequests}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allOrders = async () => {
    try {
      const { data } = await axios.get(`https://user.runasp.net/api/Wallet`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
        },
      });
      console.log(data.response);

      setOrders(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  // إغلاق نافذة التفاصيل
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  useEffect(() => {
    allOrders();
  }, []);
  return (
    <div className="container mt-5">
      <h3 
         style={{
          fontSize: "2.2rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      
      className="mb-4 text-center">عدد الطلبات</h3>

      <WalletInfo />
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="mt-2" variant="primary">
          بحث
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
            <th>المبلغ</th>
            <th>التفاصيل</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => {
              return searchTerm === "" || order.iDstring.includes(searchTerm);
            })
            .map((order) => (
              <tr key={order.iDstring}>
                <td>{order.iDstring}</td>
                <td>{order.location}</td>
                <td>{order.typeOrder}</td>
                <td>{order.statuOrder}</td>
                <td>{order.value} ريال</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleShowDetails(order)}
                  >
                    عرض التفاصيل
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* نافذة تفاصيل الطلب */}
      <Modal show={selectedOrder !== null} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الطلب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>رقم الطلب:</strong> {selectedOrder.iDstring}
              </p>
              <p>
                <strong>موقع الطلب:</strong> {selectedOrder.location}
              </p>
              <p>
                <strong>نوع الطلب:</strong> {selectedOrder.typeOrder}
              </p>
              <p>
                <strong>الحالة:</strong> {selectedOrder.statuOrder}
              </p>
              <p>
                <strong>المبلغ:</strong> {selectedOrder.value} ريال
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BrookersCart;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import toast from "react-hot-toast";

export default function HistoryOfOrders() {
  const [order, setorder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Tracking, setTracking] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const HistoryOfAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Orders-Brokers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      if (JSON.stringify(data) !== JSON.stringify(order)) {
        setorder(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
 
  useEffect(() => {
    HistoryOfAllOrders();
  }, []);
  return (
    <>
      <div className="container mt-5 text-center">
        <h3
          className="mb-4 text-green"
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
          سجل العروض
        </h3>
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
            <tr className="text-center">
              <th>رقم الطلب</th>
              <th>اسم الميناء</th>
              <th>الملاحظات</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th>مراحل الطلب</th>
            </tr>
          </thead>
          <tbody>
            {order
              .filter((order) => {
                return searchTerm === "" || order.id.includes(searchTerm);
              })
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.location}</td>
                  <td>{order.notes}</td>
                  <td>{order.date}</td>
                  <td>
                    <button className="btn bg-success w-100">
                      {order.statuOrder}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleShowDetails(order.id)}
                      className="btn bg-primary w-100"
                    >
                      مراحل الطلب
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      
      </div>
    </>
  );
}

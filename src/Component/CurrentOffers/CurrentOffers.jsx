import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function CurrentOffers() {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([
    {
      id: 1,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "تحت الإجراء",
    },
    {
      id: 2,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "ملغي",
    },
    {
      id: 3,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "تم التنفيذ",
    },
    {
      id: 1,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "تحت الإجراء",
    },
    {
      id: 2,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "تم التنفيذ",
    },
    {
      id: 3,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "تحت الإجراء",
    },
  ]);

  const [orders2, setOrders2] = useState([
    {
      id: 1,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "انتظار الرد",
    },
    {
      id: 2,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "مقبول",
    },
    {
      id: 3,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "انتظار الرد",
    },
    {
      id: 1,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "انتظار الرد",
    },
    {
      id: 2,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "مقبول",
    },
    {
      id: 3,
      location: "جدة",
      date: "2024/1/15",
      orderNumber: "123456",
      status: "انتظار الرد",
    },
  ]);

  const handleOrderClick = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const t = moment();
    setDate(t.format("MMM Do YYYY | h:mm"));
  }, [orders]);

  return (
    <>
      <div className="container mt-5   text-center">
        <h1 className="mb-5 font-weight-900 display-4 text-black">
          العروض القائمه
        </h1>

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
          قائمة العروض المقدمة{" "}
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders2.map((order) => (
              <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                <td>{date}</td>
                <td>{order.location}</td>
                <td>{order.id}</td>
                {order.status === "انتظار الرد" && (
                  <td>
                    <button className="btn bg-primary w-100">
                      انتظار الرد
                    </button>
                  </td>
                )}
                {order.status === "مقبول" && (
                  <td>
                    <button className="btn bg-success w-100">
                      مقبول
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>

        <hr
          style={{
            border: "1px solid #3498db",
            width: "100%",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        />

        <h3
          className="mb-4 text-green"
          style={{
            marginTop: "50px",
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
          قائمة العروض الجاريه{" "}
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                <td>{date}</td>
                <td>{order.location}</td>
                <td>{order.id}</td>
                { order.status === "تحت الإجراء" && (              <button
          onClick={() => setStatus("تحت الإجراء")}
          className={`btn bg-primary w-100 ${status === "تحت الإجراء" ? "bg-primary" : "btn-outline-primary"}`}
        >
          تحت الإجراء
        </button>)}
  

                {order.status === "تم التنفيذ" && (
                  <button
                    onClick={() => setStatus("تم التنفيذ")}
                    className={`btn bg-success w-100 ${status === "تم التنفيذ" ? "bg-success" : "btn-outline-success"}`}
        >
            تم التنفيذ  
        </button>)}

                {order.status === "ملغي" && (
                  <button
                    onClick={() => setStatus("ملغي")}
                    className={`btn bg-danger w-100 ${status === "ملغي" ? "bg-danger" : "btn-outline-danger"}`}
                  >
                    ملغي
                  </button>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

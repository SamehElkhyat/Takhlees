import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function AvailableOrders() {
  const [orders, setOrders] = useState([
    { id: 1, location: "الرياض", type: "طبليه", status: "تحت الإجراء" },
    { id: 2, location: "جدة", type: "حاويه", status: "تم تنفيذ الطلب" },
    { id: 3, location: "القاهره", type: "حاويه", status: "تم تنفيذ الطلب" },
    {
      id: 4,
      location: "المدينه المنوره",
      type: "طبليه",
      status: "تم تنفيذ الطلب",
    },
    { id: 5, location: "الجيزه", type: "وزن", status: "تم تنفيذ الطلب" },
  ]);

  const [order, setOrder] = useState(null);
  const [date, setDate] = useState(null);
  const handleOrderClick = (id) => {
    setOrder(orders.find((order) => order.id === id));
    console.log(id);
  };

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  useEffect(() => {
    const t = moment();
    setDate(t.format("MMM Do YYYY | h:mm"));
  }, [orders]);

  return (
    <>
      <div className="container mt-5   text-center">
        <h3 className="mb-5 font-weight-bolder"> الطلبات المتاحة</h3>

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                <td>{date}</td>
                <td>{order.location}</td>
                <td>{order.id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

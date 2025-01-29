import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { log } from "util";

const PendingOrders = () => {
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

  const handleOrderClick = (id) => {
    setOrder(orders.find((order) => order.id === id));
  };

  const GetOrder = () => {
    const res = axios.get(
      `https://user.runasp.net/api/Get-Orders`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
        },
      }
    );

    console.log(res);
  };

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  useEffect(() => {
    GetOrder();
  }, []); 
  return (
    <div className="container mt-5">
      <h3>الطلبات القائمة</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
            <th>تحديث الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
              <td>{order.location}</td>
              <td>{order.type}</td>
              <td>{order.status}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => updateStatus(order.id, "تم الالغاء")}
                >
                  الغاء
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PendingOrders;

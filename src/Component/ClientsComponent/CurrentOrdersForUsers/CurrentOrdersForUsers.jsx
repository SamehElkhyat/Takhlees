import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const CurrentOrdersForUsers = () => {
  const [orders, setOrder] = useState([]);
  const [id, setid] = useState();


  const SendId = async () => {
  
    try {
        console.log(id.ID);

        const req = await axios.post(
          `https://user.runasp.net/api/Get-ID`,
          { ID: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
            },
          }
        );
        if (req.status == 200) {
          window.location.href = "/OrderDetailsForUser";
        }
      } catch (error) {
        console.log(error);
      }
    
  };

  const GetOrder = async () => {

    
    try {
      const res = await axios.get(
        `https://user.runasp.net/api/Order-Requests`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(res);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeId = (value) => {
console.log(value);
  };

  useEffect(() => { 
    GetOrder();
    SendId();
  }, [id]);
  return (
    <div className="container mt-5">
      <h3 className="text-center">الطلبات الجاريه</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>التاريخ</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr onClick={handleChangeId(order.id)} key={order.id}>
              <td>{order.id}</td>
              <td>{order.location}</td>
              <td>{order.typeOrder}</td>
              <td>{order.date}</td>
              <td>{order.statuOrder}</td>

              {order.statuOrder === "قيد الإنتظار" && (
                <td>
                  <button className="btn bg-primary w-100">انتظار الرد</button>
                </td>
              )}
              {order.statuOrder === "مقبول" && (
                <td>
                  <button className="btn bg-success w-100">مقبول</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CurrentOrdersForUsers;

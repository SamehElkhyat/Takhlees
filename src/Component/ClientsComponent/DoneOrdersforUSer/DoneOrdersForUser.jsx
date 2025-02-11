import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const DoneOrdersForUser = () => {
  const [orders, setOrder] = useState([]);
  let [counter, setcounter] = useState(1);


  const GetOrder = async () => {
    
    try {
      const res = await axios.get(
        `https://user.runasp.net/api/Get-Accept-Orders-Users`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(res.data);
      
      
      setOrder(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    GetOrder();
  }, [orders]);
  return (
    <div className="container mt-5">
      <h3 className="text-center">الطلبات المنفذه</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={counter++}
            >
              <td>{counter}</td>
              <td>{order.location}</td>
              <td>{order.typeOrder}</td>
              <td>{order.statuOrder}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DoneOrdersForUser;

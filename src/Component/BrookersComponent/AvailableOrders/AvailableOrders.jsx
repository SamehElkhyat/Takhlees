import moment from "moment";
import React, {  useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

import axios from "axios";

export default function AvailableOrders() {
  const [order, setOrder] = useState(null);
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [id, setid] = useState(0);

  const GetOrder = async () => {
   
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-All-Orders`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SendId = async () => {
    

    if (id == 0) {
      console.log("error");
    } else {
      try {
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
          window.location.href = "/OrderDetails";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
      
    const t = moment();
    SendId();
    GetOrder();
    setDate(t.format("MMM Do YYYY | h:mm"));
  }, [id]);

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

            {data==null && (<>
            
            
            <h1>WaitingForData</h1>
            
            
            </>)}

            {data!==null && (<>            {data.map((order) => (
              <tr key={order.id} onClick={() => setid(order.id)}>
                <td>{order.date}</td>
                <td>{order.location}</td>
                <td>{order.id}</td>
              </tr>
            ))}</>)}

          </tbody>
        </Table>
      </div>
    </>
  );
}

import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Router } from "react-router-dom";
import { IdContext } from "../../IdContext/IdContext";
import axios from "axios";

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
  const [data, setData] = useState(null);
  const [id, setid] = useState(0);

  const GetOrder = async () => {
    const Tokken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiRFZFQUJNRDU2VlVFSTdONzY2REQ0Q1pPT1NKRTJER0YiLCJqdGkiOiIwZTkwNDc5Ni03YTM3LTQ3MTctYjYwZC03MmU0MDI5ZjJkNTMiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5NDQyODkyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.xlOr-vJB4pEIQgNetGVX7E0yDFUMZqgVR7uRbshqVys";
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-All-Orders`,

        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
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
    const Tokken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiRFZFQUJNRDU2VlVFSTdONzY2REQ0Q1pPT1NKRTJER0YiLCJqdGkiOiIwZTkwNDc5Ni03YTM3LTQ3MTctYjYwZC03MmU0MDI5ZjJkNTMiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5NDQyODkyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.xlOr-vJB4pEIQgNetGVX7E0yDFUMZqgVR7uRbshqVys";

    if (id == 0) {
      console.log("error");
    } else {
      try {
        const req = await axios.post(
          `https://user.runasp.net/api/Get-ID`,
          { ID: id },
          {
            headers: {
              Authorization: `Bearer ${Tokken}`,
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
                <td>{date}</td>
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

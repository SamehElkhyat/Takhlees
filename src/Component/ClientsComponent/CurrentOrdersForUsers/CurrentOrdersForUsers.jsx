import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const CurrentOrdersForUsers = () => {
  const [orders, setOrder] = useState([]);
  const [id, setid] = useState();
  let [counter, setcounter] = useState(1);

  const SendId = async () => {
    const Tokken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiRFZFQUJNRDU2VlVFSTdONzY2REQ0Q1pPT1NKRTJER0YiLCJqdGkiOiIwZTkwNDc5Ni03YTM3LTQ3MTctYjYwZC03MmU0MDI5ZjJkNTMiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5NDQyODkyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.xlOr-vJB4pEIQgNetGVX7E0yDFUMZqgVR7uRbshqVys";

    if (id == 0) {
      console.log("Id Not Found");
    } else {
      try {
        console.log(id.ID);

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
          window.location.href = "/OrderDetailsForUser";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const GetOrder = async () => {
    try {
      const Tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImUzMGU3YWYzLWYxNDktNGQ4ZC1iMDA3LWMxNWY0MmMyZGZhOSIsIkVtYWlsIjoiYWJkZWxtb2hzZW5AZ21haWwuY29tIiwiZnVsbE5hbWUiOiJhYmR1bGxhaCBtYWhtb3VkIGFiZGVsbW9oc2VuIiwicGhvbmVOdW1iZXIiOiIrMDU0ODQyMTU0ODU0IiwiSWRlbnRpdHkiOiI2NzMzNzA5ODQ4Iiwic2VjdXJpdHlTdGFtcCI6IjdCNks3U1RIV0QzNkRRSENXT0RJUVVXS01TVEpGTEk3IiwianRpIjoiMmQwYjZjZGItMDZmNy00ZDY5LTgxZmMtMjg5MzgzMWZjNGZkIiwiUm9sZSI6IlVzZXIiLCJleHAiOjE3Mzk3ODI4MzMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNjYiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2In0.bgY_OP6kGdlnXgocunUNQSECx_YwAfHmJWoQq1RPD58";
      const res = await axios.get(
        `https://user.runasp.net/api/Order-Requests`,
        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
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
    setid(value);
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
            <tr key={order.id}>
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

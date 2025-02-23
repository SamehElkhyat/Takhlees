import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

import axios from "axios";

export default function AvailableOrders() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [id, setid] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
        <h3
          className="mb-5 font-weight-bolder"
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
          {" "}
          الطلبات المتاحة
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
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
            </tr>
          </thead>
          <tbody>
            {data == null && (
              <tr>
                <td colSpan="5" className="text-center">
                  لا توجد عروض متاحه
                </td>
              </tr>
            )}

            {data !== null && (
              <>
                {data
                  .filter((order) => {
                    return searchTerm === "" || order.id.includes(searchTerm);
                  })
                  .map((order) => (
                    <tr key={order.id} onClick={() => setid(order.id)}>
                      <td>{order.date}</td>
                      <td>{order.location}</td>
                      <td>{order.id}</td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

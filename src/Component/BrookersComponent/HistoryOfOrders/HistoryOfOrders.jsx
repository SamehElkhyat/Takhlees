import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function HistoryOfOrders() {

  const [order, setorder] = useState([])

  const HistoryOfAllOrders = async () => {
    try {
      const {data} = await axios.get(
        `https://user.runasp.net/api/Get-All-Orders-Brokers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );

      setorder(data);
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    HistoryOfAllOrders()
 

  },[])
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

        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>رقم الطلب</th>
              <th>اسم الميناء</th>
              <th>الملاحظات</th>
              <th>التاريخ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.location}</td>
                <td>{order.notes}</td>

                <td>{order.date}</td>
                <td>
                  {order.statuOrder === "لم يتم التنفيذ" && (
                    <button className="btn bg-success w-100">تم التنفيذ</button>
                  )}
                  {order.statuOrder === "تم التحويل" && (
                    <button className="btn bg-success w-100">تم التحويل</button>
                  )}
                  {order.statuOrder === "محولة" && (
                    <button className="btn bg-success w-100">محولة</button>
                  )}
                   {order.statuOrder === "لم يتم التحويل" && (
                    <button className="btn bg-danger w-100">لم يتم التحويل</button>
                  )}
                    {order.statuOrder === "قيد الإنتظار" && (
                    <button className="btn bg-secondary w-100">قيد الإنتظار</button>
                  )}
                    {order.statuOrder === "تحت الإجراء" && (
                    <button className="btn bg-primary w-100">تحت الإجراء</button>
                  )}
                    {order.statuOrder === "تم التنفيذ" && (
                    <button className="btn bg-success w-100">تم التنفيذ</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

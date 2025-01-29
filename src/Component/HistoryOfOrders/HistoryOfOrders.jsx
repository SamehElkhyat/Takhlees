import React from 'react'
import { Table } from 'react-bootstrap'

export default function HistoryOfOrders() {
  return<>
  
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
            <th>التاريخ</th>
            <th>الحالة</th>

          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, port: "ميناء جدة", status: "تم التنفيذ", date: "2024-01-01" },
            { id: 2, port: "ميناء الدمام", status: "مرفوض", date: "2024-01-02" },
            { id: 3, port: "ميناء ينبع", status: "ملغي", date: "2024-01-03" },
            { id: 4, port: "ميناء جازان", status: "تم التنفيذ", date: "2024-01-04" },
            { id: 5, port: "ميناء رابغ", status: "مرفوض", date: "2024-01-05" }
          ].map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.port}</td>
              <td>{order.date}</td>
              <td>

                {order.status === "تم التنفيذ" && (
                  <button className="btn bg-success w-100">تم التنفيذ</button>
                )}
                {order.status === "مرفوض" && (
                  <button className="btn bg-danger w-100">مرفوض</button>
                )}
                {order.status === "ملغي" && (
                  <button className="btn bg-secondary w-100">ملغي</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  
  </>
}

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function OrderDetails() {

  const [Data, setData] = useState([])
    const HistoryOrders = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL_MICROSERVICE3}/Logs`,
          {
            withCredentials: true,
          }
        );        
        setData(data)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    useEffect (()=>{


      HistoryOrders()      
    },[])
  
  return (
    
    <div className="table-responsive mt-3">
            <h5
        className="mb-4"
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          borderBottom: "3px solid #3498db",
          paddingBottom: "10px",
          width: "fit-content",
          margin: "0 auto 2rem auto",
          borderRadius: "10px",
          backgroundColor: "#4A6785",
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
          سجل الطلبات 
      </h5>
    <table className="table table-bordered text-center shadow-sm">
      <thead className="bg-white border">
        <tr>
          <th>رقم الطلب</th>
          <th>الاسم</th>
          <th>الريد الالكتروني</th>
          <th>الملاحظات</th>
          <th>سجل الطلب</th>
          <th>التاريخ</th>
        </tr>
      </thead>
      <tbody>
        {Data.map((customer, index) => (
          <tr key={index} className="bg-light">
            <td>{customer.newOrderId}</td>
            <td>{customer.fullName}</td>
            <td>{customer.email}</td>
            <td>{customer.notes}</td>
            <td>{customer.message}</td>
            <td>{customer.timeStamp}</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

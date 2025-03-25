import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function LogsOrders() {
  const [selectedOrder, setSelectedOrder] = useState([]);

  const AllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Orders-For-Admin`,
        { withCredentials: true }
      );

      
      setSelectedOrder(data);
    } catch (error) {
      
    }
  };

  const HistoryOrders = async () => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL_MICROSERVICE3}/Logs`,
        { withCredentials: true }
      );
    } catch (error) {
      
    }
  };

  const GetId = async (id) => {    
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE3}/Get-ID`,
        { newOrderId: id },
        { withCredentials: true }
      );
        window.location.href = "/DetailsForAdmin";
      
    } catch (error) {
      }
  };
  useEffect(() => {
    AllOrders();
  }, []);

  return (
    <>
      <Box width="100%" textAlign="center" p={4}>
        <h1
          className="text-xl font-bold mb-4"
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
          الطلبات
        </h1>

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>رقم الطلب</th>
                <th>موقع الطلب</th>
                <th>التاريخ</th>
                <th>الحاله</th>
                <th>سجل الطلب</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.map((customer, index) => (
                <tr key={index} className="bg-light">
                  <td>{customer.id}</td>
                  <td>{customer.location}</td>
                  <td>{customer.date}</td>
                  <td>{customer.statuOrder}</td>
                  <td className="bg-success text-white">
                    <Button
                      className="text-white"
                      onClick={() => GetId(customer.id)}
                    >
                      عرض سجل الطلب
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Toaster />
      </Box>
    </>
  );
}

export default LogsOrders;

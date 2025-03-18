import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";

export default function AllClients() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);

  const styles = {
    cards1: {
      backgroundColor: Ishovered1 ? "#1ea9e2" : "white",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },

    icons: {
      fontSize: "50px",
      padding: "20px",
    },
  };

  const Block = async (email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Blocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const HistoryOrders = async (id) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_URL_MICROSERVICE3}/Logs`,
        { newOrderId: id },
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  };

  const UnBlock = async (email) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Unblocked`,
        {
          Email: email,
        },
        {
          withCredentials: true,
        }
      );
      CustomerService();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const CustomerService = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Orders-Admin`,
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    CustomerService();
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
          تفاصيل العملاء
        </h1>

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th>الاسم</th>
                <th>البريد الالكتروني</th>
                <th>موقع الطلب</th>
                <th>نوع الطلب</th>
                <th>المخلص</th>
                <th>البريد الخاص بالمخلص</th>
                <th>حظر</th>
                <th>الحاله</th>
                <th>سجل الطلبات</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.map((customer, index) => (
                <tr key={index} className="bg-light">
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.fullName}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.email}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.location}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.typeOrder}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.brokerName == null ? (
                      <>لايوجد مخلص الان</>
                    ) : (
                      <>{customer.brokerName}</>
                    )}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.brokerEmail == null ? (
                      <>لايوجد مخلص الان</>
                    ) : (
                      <>{customer.brokerEmail}</>
                    )}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    {customer.isBlocked ? (
                      <>
                        <Button
                          onClick={() => UnBlock(customer.email)}
                          className="bg-success text-black"
                        >
                          فك الحظر
                        </Button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Button
                          onClick={() => Block(customer.email)}
                          className="bg-danger text-black"
                        >
                          حظر
                        </Button>
                      </>
                    )}
                  </td>
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    <Button className="btn bg-success">
                      {" "}
                      {customer.statuOrder}
                    </Button>
                  </td>{" "}
                  <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                    <Button
                      onClick={() => HistoryOrders(customer.id)}
                      className="btn bg-success"
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

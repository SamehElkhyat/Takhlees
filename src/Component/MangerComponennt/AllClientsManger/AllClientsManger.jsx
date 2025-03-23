import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";

export default function AllClientsManger() {
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


  const GetId = async (id) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Get-ID`,
        {
          ID: id,
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = "/ProfileUsers";
    } catch (error) {

      toast.error(error.response.data.message);
    }
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
    }
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
    }
  };

  const CustomerService = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Orders-Admin`,
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data);
    } catch (error) {
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
              <th align="center">الاسم</th>
              <th align="center">البريد الالكتروني</th>
              <th align="center">موقع الطلب</th>
              <th align="center">نوع الطلب</th>
              <th align="center">المخلص</th>
              <th align="center">البريد الخاص بالمخلص</th>
              <th align="center">حظر</th>
              <th align="center">الحاله</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.map((customer, index) => (
              <tr
                onClick={() => GetId(customer.id)}
                key={index}
                className="bg-light"
              >
                <td align="center">{customer.fullName}</td>
                <td align="center">{customer.email}</td>
                <td align="center">{customer.location}</td>
                <td align="center">{customer.typeOrder}</td>

                <td align="center">
                  {customer.brokerName == null ? (
                    <>لايوجد مخلص الان</>
                  ) : (
                    <>{customer.brokerName}</>
                  )}
                </td>
                <td align="center">
                  {customer.brokerEmail == null ? (
                    <>لايوجد مخلص الان</>
                  ) : (
                    <>{customer.brokerEmail}</>
                  )}
                </td>
                <td align="center">
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
                <td align="center">
                  <Button className="btn bg-success">
                    {" "}
                    {customer.statuOrder}
                  </Button>
                </td>

                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.identity}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  {customer.isBlocked ? (
                    <button
                      onClick={() => UnBlock(customer.email)}
                      className="btn btn-success text-black"
                    >
                      فك الحظر
                    </button>
                  ) : (
                    <button
                      onClick={() => Block(customer.email)}
                      className="btn btn-danger text-black"
                    >
                      حظر
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </Box>
   
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "react-bootstrap";

export default function Blacklist() {
  const [selectedOrder, setSelectedOrder] = useState([]);

  const Block = async (email) => {
    
    try {
      const { data } = await axios.post(
        `https://takhleesak.runasp.net/api/Blocked`,
        {
          Email: email,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      GetBlackList();

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const UnBlock = async (email) => {

    try {
      const { data } = await axios.post(
        `https://takhleesak.runasp.net/api/Unblocked`,
        {
          Email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      GetBlackList();


    } catch (error) {
      toast.error(error.response.data.message);

    }
  };

  const GetBlackList = async () => {

    try {
      const response = await axios.get(
        "https://takhleesak.runasp.net/api/Black-List",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
    
      setSelectedOrder(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      

    }
 
  };
  useEffect(() => {
    GetBlackList();

  }, []);

  return (
    <>
      <Box width="100%" textAlign="center" p={4}>
        <h1
          className="text-xl font-bold mb-4"
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
            المحظورين
        </h1>

        <div className="table-responsive mt-3">
      <table className="table table-bordered text-center shadow-sm">
        <thead className="bg-white border">
          <tr>
            <th>الاسم</th>
            <th>البريد الالكتروني</th>
            <th>رقم الهوية</th>
            <th>الهاتف</th>
            <th>حظر</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrder.map((customer, index) => (
            <tr key={index} className="bg-light">
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
 
        <Toaster />
      </Box>
    </>
  );
}

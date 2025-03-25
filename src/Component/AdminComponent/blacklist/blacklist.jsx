import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Blacklist() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const navigate = useNavigate();

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
      GetBlackList();
    } catch (error) {
      toast.error(error.response.data.message);
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
      GetBlackList();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const GetBlackList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/Black-List`,
        {
          withCredentials: true,
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
                <tr
                  onClick={() => navigate(`/ProfileUsers/${customer.id}`)}
                  key={index}
                  className="bg-light"
                >
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

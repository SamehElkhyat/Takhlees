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
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function CpanelAccountant() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);

  const styles = {
    cards1: {
      backgroundColor: "#B3D4FF",
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
      CustomerService();
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
      CustomerService();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const CustomerService = async () => {
    try {
      const { data } = await axios.get(
        `https://takhleesak.runasp.net/api/Get-Account`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
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
          المحاسبين
        </h1>

        <div className=" d-flex justify-content-center">

        <Col
          md={3}
          sm={3}
          xs={3}
          className="Col1 mb-3 "
        >
            <Link
                className="text-white text-decoration-none"
                to="/AccountantLandingPage"
              >
          <Card
            style={styles.cards1}
            onMouseLeave={() => setIshovered1(false)}
            onMouseEnter={() => setIshovered1(true)}
            className="shadow-lg"
          >
            <Card.Body>
              <i
                className="fa-solid fa-tty text-success"
                style={styles.icons}
              ></i>
                   <div className="content">
                  <p>قم باداره المحاسبين</p>
                </div>

              <Card.Title>تفاصيل المحاسبين</Card.Title>
              <Card.Text>الذهاب الي المحاسبين.</Card.Text>
            
                الذهاب إلى جميع تفاصيل المحاسبين
              <div className="info d-flex justify-content-end">
                <Button className="bg-black text-white border-none ">
                  <ArrowRightAltIcon />
                </Button>
              </div>
            </Card.Body>
          </Card>
          </Link>

        </Col>
        </div>
    
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

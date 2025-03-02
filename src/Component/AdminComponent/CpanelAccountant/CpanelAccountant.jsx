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
import { Toaster } from "react-hot-toast";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CpanelAccountant() {
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
    },}
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
        <Col md={12} sm={12} xs={12} className="mb-3 d-flex justify-content-center w-100">
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

              <Card.Title>تفاصيل المحاسبين</Card.Title>
              <Card.Text>الذهاب الي المحاسبين.</Card.Text>
              <Button variant="success">
                <Link
                  className="text-white text-decoration-none"
                  to="/AccountantLandingPage"
                >
                  الذهاب إلى جميع تفاصيل المحاسبين
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Table style={{ marginTop: "20px", width: "100%" }}>
          <TableHead
            sx={{
              backgroundColor: "white",
              borderTop: "1px solid #e0e0e0",
              borderBottom: "1px solid #e0e0e0",
              borderLeft: "1px solid #e0e0e0",
              borderRight: "1px solid #e0e0e0",
              borderRight: "1px solid #e0e0e0",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <TableRow>
              <TableCell align="center">الاسم</TableCell>
              <TableCell align="center">البريد الالكتروني</TableCell>
              <TableCell align="center">رقم الهويه</TableCell>
              <TableCell align="center">الهاتف</TableCell>
              <TableCell align="center">حظر</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOrder.map((customer,index) => (
              <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={index}>
                <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.fullName}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.email}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.identity}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.phoneNumber}
                </TableCell>
                <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.isBlocked ? (
                    <>
                      <Button onClick={()=>UnBlock(customer.email)} className="bg-success text-black">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toaster />
      </Box>
    </>
  );
}


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
import { Button, Card, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Brookers() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);
  const navigate = useNavigate();

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
        `${process.env.REACT_APP_API_URL}/Get-Broker`,
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
          المخلصين
        </h1>
        <div className="d-flex justify-content-center">
          <Col md={3} sm={12} xs={12} className="Col1 mb-3">
            {" "}
            <Link
              className="text-white text-decoration-none"
              to="/brookersLandingPage"
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
                    <p>قم باداره خدمه العملاء</p>
                  </div>
                  <Card.Title>تفاصيل المخلصين</Card.Title>
                  <Card.Text>الذهاب الي المخلصين.</Card.Text>
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
          <Table className="table table-bordered">
            <TableHead className="bg-white shadow-sm">
              <TableRow>
                <TableCell className="text-center fw-bold">الاسم</TableCell>
                <TableCell className="text-center fw-bold">
                  البريد الإلكتروني
                </TableCell>
                <TableCell className="text-center fw-bold">
                  رقم الهوية
                </TableCell>
                <TableCell className="text-center fw-bold">الهاتف</TableCell>
                <TableCell className="text-center fw-bold">الإجراء</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder.map((customer, index) => (
                <TableRow
                  onClick={() => navigate(`/ProfileUsers/${customer.id}`)}
                  className="bg-light"
                  key={index}
                >
                  <TableCell className="text-center align-middle">
                    {customer.fullName}
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    {customer.identity}
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    {customer.phoneNumber}
                  </TableCell>
                  <TableCell className="text-center align-middle">
                    {customer.isBlocked ? (
                      <Button
                        onClick={() => UnBlock(customer.email)}
                        className="btn btn-success text-white"
                      >
                        فك الحظر
                      </Button>
                    ) : (
                      <Button
                        onClick={() => Block(customer.email)}
                        className="btn btn-danger text-white"
                      >
                        حظر
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Toaster />
      </Box>
    </>
  );
}

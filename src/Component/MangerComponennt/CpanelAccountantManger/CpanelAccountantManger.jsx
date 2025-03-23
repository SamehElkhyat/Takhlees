import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, Box } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import toast, { Toaster } from "react-hot-toast";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CpanelAccountantManger() {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);

  const styles = {
    cards1: {
      color: "black",
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

  const CustomerService = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Account`,
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
      <Box
        className="justify-content-center"
        width="100%"
        textAlign="center"
        p={4}
      >
        <Row className="justify-content-center">
          <Col md={3} sm={6} xs={12} className="Col1 mb-3">
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
                    className="fa-solid fa-tty text-black"
                    style={styles.icons}
                  ></i>
                  <div className="content">
                    <p>قم باداره المحاسبين</p>
                  </div>

                  <Card.Title>تفاصيل المحاسبين</Card.Title>
                  <Card.Text>الذهاب الي المحاسبين.</Card.Text>
                    <div className="info d-flex justify-content-end">
                      <Button className="bg-black text-white border-none ">
                        <ArrowRightAltIcon />
                      </Button>
                    </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

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
          العملاء
        </h1>

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center shadow-sm">
            <thead className="bg-white border">
              <tr>
                <th align="center">الاسم</th>
                <th align="center">البريد الالكتروني</th>
                <th align="center">رقم الهويه</th>
                <th align="center">الهاتف</th>
                <th align="center">حظر</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.map((customer, index) => (
                <tr
                  onClick={() => GetId(customer.id)}
                  key={index}
                  className="bg-light"
                >
                  <td>{customer.fullName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.identity}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function CPanelCustomerService() {
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
        `${process.env.REACT_APP_API_URL}/Get-CustomerService`,
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
        <h5
          className=" mb-4"
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
          خدمه العملاء
        </h5>

        <div
          className="
   d-flex justify-content-center
   "
        >
          <Col md={3} sm={12} xs={12} className="Col1 mb-3">
            <Link
              className="text-white text-decoration-none"
              to="/LandingPageCustomeService"
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

                  <Card.Title>تفاصيل خدمه العملاء</Card.Title>
                  <Card.Text>الذهاب الي خدمه العملاء.</Card.Text>
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

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function statistics() {
  const [Statics, setStatics] = useState({});
  const [Brookers, setBrookers] = useState([]);
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const styles = {
    cards1: {
      color: "black",
      backgroundColor: "#B3D4FF",

      borderRadius: "12px",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards2: {
      borderRadius: "12px",
      backgroundColor: "#CDEDE6",
      color: "black",
      transform: Ishovered2 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered2 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards3: {
      backgroundColor: "#F5E6CC",

      borderRadius: "12px",
      color: "black",
      transform: Ishovered3 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered3 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards4: {
      borderRadius: "12px",
      backgroundColor: "#E3E4E8",
      transform: Ishovered4 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered4 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    icons: {
      fontSize: "50px",
      padding: "20px",
    },
  };
  const GetStatics = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Statistics`,
        {
          withCredentials: true,
        }
      );
      setStatics(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const GetBrookers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Evaluation-Broker`,
        {
          withCredentials: true,
        }
      );
      setBrookers(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    GetStatics();
    GetBrookers();
  }, []);
  return (
    <>
      <div className="container py-5">
        <h2
          className="text-center mb-4"
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
          إحصائيات النظام
        </h2>
        <Container className="text-center mt-5">
          <Row className="justify-content-center">
            <Col md={3} sm={6} xs={12} className="mb-3 Col1">
              <Link className="text-white text-decoration-none">
                <Card
                  style={styles.cards1}
                  onMouseLeave={() => setIshovered1(false)}
                  onMouseEnter={() => setIshovered1(true)}
                  className="shadow-lg"
                >
                  <Card.Body>
                    <i style={styles.icons} className="fas fa-users"></i>
                    <Card.Title>إجمالي العملاء</Card.Title>
                    <Card.Text>الذهاب الي المخلصين.</Card.Text>
                    <p
                      style={{
                        fontSize: "24px", // حجم الخط كبير وواضح
                        fontWeight: "900", // خط قوي جدًا
                        color: "red", // اللون الأسود
                        textAlign: "center", // محاذاة في المنتصف (اختياري)
                        letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                      }}
                    >
                      عميل {Statics.countAllUsers}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={3} sm={6} xs={12} className="mb-3 Col2">
              <Link className="text-white text-decoration-none">
                <Card
                  style={styles.cards2}
                  onMouseEnter={() => setIshovered2(true)}
                  onMouseLeave={() => setIshovered2(false)}
                  className="shadow-lg"
                >
                  <div className="content">
                    <p>قم بإداره العملاء</p>
                  </div>
                  <Card.Body>
                    <i
                      style={styles.icons}
                      className="fas fa-clipboard-list"
                    ></i>
                    <Card.Title>الطلبات النشطه</Card.Title>
                    <Card.Text>في طور المعالجه</Card.Text>
                    <p
                      style={{
                        fontSize: "24px", // حجم الخط كبير وواضح
                        fontWeight: "900", // خط قوي جدًا
                        color: "red", // اللون الأسود
                        textAlign: "center", // محاذاة في المنتصف (اختياري)
                        letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                      }}
                    >
                      عميل {Statics.countActiveOrders}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={3} sm={6} xs={12} className="mb-3 Col5">
              <Link className="text-white text-decoration-none">
                <Card
                  style={styles.cards3}
                  onMouseEnter={() => setIshovered3(true)}
                  onMouseLeave={() => setIshovered3(false)}
                  className="shadow-lg"
                >
                  <div className="content">
                    <p>عرض إحصائيات الموقع بالكامل</p>
                  </div>
                  <Card.Body>
                    <i style={styles.icons} className="fas fa-check-circle"></i>
                    <Card.Title>الطلبات المكتمله</Card.Title>
                    <Card.Text>هذا العام</Card.Text>
                    <p
                      style={{
                        fontSize: "24px", // حجم الخط كبير وواضح
                        fontWeight: "900", // خط قوي جدًا
                        color: "red", // اللون الأسود
                        textAlign: "center", // محاذاة في المنتصف (اختياري)
                        letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                      }}
                    >
                      {Statics.countDoneOrders}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={3} sm={6} xs={12} className="mb-3 Col6">
              <Link className="text-white text-decoration-none">
                <Card
                  style={styles.cards4}
                  onMouseEnter={() => setIshovered4(true)}
                  onMouseLeave={() => setIshovered4(false)}
                  className="shadow-lg"
                >
                  <div className="content">
                    <p>عرض وإداره المحظوريين</p>
                  </div>
                  <Card.Body>
                    <i style={styles.icons} className="fas fa-dollar-sign"></i>
                    <Card.Title>الايرادات</Card.Title>
                    <p
                      style={{
                        fontSize: "24px", // حجم الخط كبير وواضح
                        fontWeight: "900", // خط قوي جدًا
                        color: "red", // اللون الأسود
                        textAlign: "center", // محاذاة في المنتصف (اختياري)
                        letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                      }}
                    >
                      {Statics.exports}
                      <Card.Text>ريال سعودي</Card.Text>
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5
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
                  className="card-title mb-4"
                >
                  أداء الوسطاء
                </h5>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>الوسيط</th>
                      <th>البريد الالكتروني</th>
                      <th>التقييم</th>
                      <th>الطلبات المنجزة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Brookers.map((item, index) => (
                      <tr className="w-100 text-center" key={index}>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>
                          {
                            <td>
                              <span className="text-warning">
                                {item.count === 0 && (
                                  <>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 0 && item.count <= 5 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 5 && item.count <= 25 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 25 && item.count <= 50 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 50 && item.count <= 100 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </>
                                )}

                                {item.count > 100 && (
                                  <>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                  </>
                                )}
                              </span>
                            </td>
                          }
                        </td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

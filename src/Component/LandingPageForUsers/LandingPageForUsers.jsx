import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";
import "./LandingPageUsers.css";

const LandingPageForUsers = () => {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const [Ishovered5, setIshovered5] = useState(false);
  const [Ishovered6, setIshovered6] = useState(false);
  const [State, setState] = useState({});

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-User`,
        {
          withCredentials: true,
        }
      );
      setState(data);
    } catch (error) {
    }
  };


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
    cards5: {
      backgroundColor: "#F9D99D",

      borderRadius: "12px",
      transform: Ishovered5 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered5 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards6: {
      borderRadius: "12px",
      backgroundColor: "#FAFAF8",

      transform: Ishovered6 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered6 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    icons: {
      fontSize: "50px",
      padding: "20px",
    },
  };
  useEffect(() => {

    GetState();
  }, []);

  return (
    <Container className="text-center mt-5">
    <div className="container text-center py-5">
  <h1
    className="mb-4 p-4 text-white fw-bold shadow-lg "
    style={{
      backgroundImage: "linear-gradient(60deg, #89CFF0,rgb(185, 210, 172),rgb(217, 209, 217))",
      display: "inline-block",
      borderRadius:"25px",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease-in-out",
    }}
  >
    <span className="text-black d-inline-block p-2">   
      مرحبًا بك
    </span>
  </h1>
</div>
      <h5
        className="mb-4"
        style={{
          fontSize: "2.2rem",
          fontWeight: "700",
          color: "transparent",
          backgroundClip: "text",
          backgroundImage:
            "linear-gradient(60deg, #89CFF0,rgb(95, 111, 87), #D8BFD8)",
          textShadow:
            "1px 1px 3px rgba(0,0,0,0.1), 0 0 15px rgba(137, 207, 240, 0.3)",
          borderBottom: "3px solid transparent",
          borderImage: "linear-gradient(60deg, #89CFF0, #B6D7A8) 1",
          paddingBottom: "12px",
          width: "fit-content",
          margin: "0 auto 2rem auto",
          borderRadius: "12px",
          padding: "12px 25px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08), 0 0 8px rgba(182, 215, 168, 0.2)",
          transition: "all 0.4s cubic-bezier(0.08, 0.52, 0.52, 1)",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.06) rotate(-1deg)",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.12), 0 0 12px rgba(137, 207, 240, 0.3)",
            textShadow:
              "1px 1px 3px rgba(0,0,0,0.1), 0 0 20px rgba(137, 207, 240, 0.4)",
          },
          "&:active": {
            transform: "scale(0.99) rotate(0.5deg)",
            transitionDuration: "0.15s",
            boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-15%",
            left: "-15%",
            width: "130%",
            height: "130%",
            background:
              "radial-gradient(circle, rgba(137,207,240,0.15) 20%, transparent 60%)",
            transform: "rotate(30deg)",
            opacity: 0.4,
            transition: "all 0.5s ease",
          },
          "&:hover::before": {
            transform: "rotate(30deg) scale(1.1)",
            opacity: 0.6,
          },
        }}
      >
        اختر ما تريد القيام به:
      </h5>
      <Row id="Row-Landing-User" className="justify-content-center">
        <Col md={3} sm={6} xs={12} className="Col1 mb-3">
          <Link className="text-white text-decoration-none" to="/newOrder">
            <Card
              style={styles.cards1}
              onMouseLeave={() => setIshovered1(false)}
              onMouseEnter={() => setIshovered1(true)}
              className="shadow-lg p-3"
            >
              <div className="content">
                <p>إنشاء طلب جديد</p>
              </div>

              <Card.Body>
                <i
                  className="fa-solid fa-code-pull-request"
                  style={styles.icons}
                ></i>
                <Card.Title>الطلبات الجديدة</Card.Title>
                <Card.Text>إنشاء طلب جديد بسرعة وسهولة.</Card.Text>

                <div className="info d-flex justify-content-end">
                  <Button className="bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} sm={6} xs={12} className="Col2 mb-3">
          <Link className="text-white text-decoration-none" to="/Orders">
            <Card
              style={styles.cards2}
              onMouseEnter={() => setIshovered2(true)}
              onMouseLeave={() => setIshovered2(false)}
              className="shadow-lg p-3"
            >
              <div className="content">
                <p>الطلبات التي قمت بإنشائها</p>
              </div>
              <Card.Body>
                <i style={styles.icons} className="fa-solid fa-arrows-spin"></i>
                <Card.Title>الطلبات القائمة</Card.Title>
                <Card.Text>عرض وإدارة طلباتك الحالية.</Card.Text>
                <div className="position-absolute">
                  <p
                    style={{
                      fontSize: "24px", // حجم الخط كبير وواضح
                      fontWeight: "900", // خط قوي جدًا
                      color: "#000", // اللون الأسود
                      textAlign: "center", // محاذاة في المنتصف (اختياري)
                      letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                    }}
                  >
                    طلب {State.numberOfCurrentOffers}
                  </p>
                </div>
                <div className="info d-flex justify-content-end">
                  <Button className="bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} sm={6} xs={12} className="Col3 mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/CurrentOrdersForUsers"
          >
            <Card
              style={styles.cards3}
              onMouseEnter={() => setIshovered3(true)}
              onMouseLeave={() => setIshovered3(false)}
              className="shadow-lg p-3"
            >
              <div className="content">
                <p>الطلبات التي جاري تنفيذها</p>
              </div>

              <Card.Body>
                <i
                  style={styles.icons}
                  className="fa-solid fa-cart-shopping"
                ></i>
                <Card.Title>الطلبات الجاريه</Card.Title>
                <Card.Text>إدارة الطلبات الجاريه.</Card.Text>
                <div className="position-absolute">
                  <p
                    style={{
                      fontSize: "24px", // حجم الخط كبير وواضح
                      fontWeight: "900", // خط قوي جدًا
                      color: "#000", // اللون الأسود
                      textAlign: "center", // محاذاة في المنتصف (اختياري)
                      letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                    }}
                  >
                    طلب {State.numberOfRequestOrders}
                  </p>
                </div>
                <div className="info d-flex justify-content-end ">
                  <Button className="bg-white-transparent bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} sm={6} xs={12} className="Col4 mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/DoneOrdersForUser"
          >
            <Card
              style={styles.cards4}
              onMouseEnter={() => setIshovered4(true)}
              onMouseLeave={() => setIshovered4(false)}
              className="shadow-lg p-3"
            >
                  <div className="content">
                <p>الطلبات التي تم تنفيذها</p>
              </div>
              <Card.Body>
                <i
                  style={styles.icons}
                  className="fa-solid fa-square-check"
                ></i>
                <Card.Title>الطلبات المنفذه</Card.Title>
                <Card.Text>عرض الطلبات المنفذه الخاص بك.</Card.Text>
                <div className="position-absolute">
                  <p
                    style={{
                      fontSize: "24px", // حجم الخط كبير وواضح
                      fontWeight: "900", // خط قوي جدًا
                      color: "#000", // اللون الأسود
                      textAlign: "center", // محاذاة في المنتصف (اختياري)
                      letterSpacing: "1px", // توسيع بسيط بين الحروف لمظهر أوضح
                    }}
                  >
                    طلب {State.numberOfSuccessfulOrders}
                  </p>
                </div>

                <div className="info d-flex justify-content-end">
                  <Button className="bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} sm={6} xs={12} className="Col5 mb-3">
          <Link className="text-white text-decoration-none" to="/Cart">
            <Card
              style={styles.cards5}
              onMouseEnter={() => setIshovered5(true)}
              onMouseLeave={() => setIshovered5(false)}
              className="shadow-lg p-3"
            >
                  <div className="content">
                <p>عرض محفظبتك ومعرفت رصيدك</p>
              </div>
              <Card.Body>
                <i
                  style={styles.icons}
                  className="fa-solid fa-cart-shopping"
                ></i>
                <Card.Title>المحفظة</Card.Title>
                <Card.Text>إدارة الأموال والرصيد الخاص بك.</Card.Text>

                <div className="info d-flex justify-content-end">
                  <Button className="bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} sm={6} xs={12} className="Col6 mb-3">
          <Link
            className="text-white text-decoration-none"
            to="/HistoryOfOrdersUsers"
          >
            <Card
              style={styles.cards6}
              onMouseEnter={() => setIshovered6(true)}
              onMouseLeave={() => setIshovered6(false)}
              className="shadow-lg p-3"
            >
                  <div className="content">
                <p>سجل الطلبات التي قمت بعملها</p>
              </div>
              <Card.Body>
                <i
                  style={styles.icons}
                  className="fa-solid fa-clock-rotate-left "
                ></i>
                <Card.Title>سجل الطلبات</Card.Title>
                <Card.Text>إدارة السجل وجميع الطلبات الخاص بك.</Card.Text>

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
    </Container>
  );
};

export default LandingPageForUsers;

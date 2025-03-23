import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function LandingPageCustomService() {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const [State, setState] = useState({});

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-CustomerService`,
        {
          withCredentials: true,
        }
      );
      setState(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const styles = {
    cards1: {
      backgroundColor: "#B3D4FF",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards2: {
      backgroundColor: "#CDEDE6",
      transform: Ishovered2 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered2 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards3: {
      backgroundColor: "#F5E6CC",
      transform: Ishovered3 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered3 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards4: {
      backgroundColor: "#E3E4E8",
      transform: Ishovered4 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered4 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    icons: {
      fontSize: "50px",
      padding: "20px",
      color: "black",
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
            backgroundImage:
              "linear-gradient(60deg, #89CFF0,rgb(185, 210, 172),rgb(217, 209, 217))",
            display: "inline-block",
            borderRadius: "25px",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <span className="text-black d-inline-block p-2">مرحبا بك!</span>
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
      <Row className="justify-content-center">
        <Col md={3} sm={6} xs={12} className="mb-3 Col1">
          <Link className="text-white text-decoration-none" to="/DoneOrders">
            <Card
              style={styles.cards1}
              onMouseLeave={() => setIshovered1(false)}
              onMouseEnter={() => setIshovered1(true)}
              className="shadow-lg"
            >
              <Card.Body>
                <i
                  on
                  className="fa-regular fa-circle-check"
                  style={styles.icons}
                ></i>
                <Card.Title>الطلبات المنفذه</Card.Title>
                <Card.Text>الذهاب الي الطلبات المنفذه.</Card.Text>
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
                    طلب {State.numberOfDoneOrders}
                  </p>
                </div>
                <div className="content">
                  <p>قم باداره الطلبات المنفذه</p>
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

        <Col md={3} sm={6} xs={12} className="mb-3 Col2">
          <Link
            className="text-white text-decoration-none"
            to="/CanceledOrders"
          >
            {" "}
            <Card
              style={styles.cards2}
              onMouseEnter={() => setIshovered2(true)}
              onMouseLeave={() => setIshovered2(false)}
              className="shadow-lg"
            >
              <Card.Body>
                <i style={styles.icons} className="fa-solid fa-ban"></i>
                <div className="content">
                  <p>قم باداره طلبات الملغاه</p>
                </div>
                <Card.Title>الطلبات الملغاه</Card.Title>
                <Card.Text>عرض وإدارة الطلبات الملغاه .</Card.Text>
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
                    طلب {State.numberOfRefuseOrders}
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

        <Col md={3} sm={6} xs={12} className="mb-3 Col3">
          <Link
            className="text-white text-decoration-none"
            to="/AllOrderTransfers"
          >
            {" "}
            <Card
              style={styles.cards3}
              onMouseEnter={() => setIshovered3(true)}
              onMouseLeave={() => setIshovered3(false)}
              className="shadow-lg"
            >
              <Card.Body>
                <i
                  className="fa-solid fa-money-bill-transfer"
                  style={styles.icons}
                ></i>
                <div className="content">
                  <p>قم باداره الطلبات المحوله</p>
                </div>
                <Card.Title>الطلبات المحوله</Card.Title>
                <Card.Text>عرض وإدارة الطلبات المحوله .</Card.Text>

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
                    طلب {State.numberOfNotDoneOrders}
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

        <Col md={3} sm={6} xs={12} className="mb-3 Col4">
          <Link
            className="text-white text-decoration-none"
            to="/AllOrderDeleted"
          >
            {" "}
            <Card
              style={styles.cards4}
              onMouseEnter={() => setIshovered4(true)}
              onMouseLeave={() => setIshovered4(false)}
              className="shadow-lg"
            >
              <Card.Body>
                <i
                  className="fa-solid fa-money-bill-transfer"
                  style={styles.icons}
                ></i>
                <div className="content">
                  <p>قم باداره الطلبات المحذوفه</p>
                </div>
                <Card.Title>الطلبات المحذوفه</Card.Title>
                <Card.Text>عرض وإدارة الطلبات المحذوفه .</Card.Text>
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
                    طلب {State.numberOfDeletedOrders}
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
      </Row>
    </Container>
  );
}

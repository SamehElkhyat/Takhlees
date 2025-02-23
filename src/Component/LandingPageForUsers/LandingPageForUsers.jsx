import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { string } from "yup";

const LandingPageForUsers = () => {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const [Ishovered5, setIshovered5] = useState(false);
  const [Ishovered6, setIshovered6] = useState(false);

  const [DecodedTokken, setDecodedTokken] = useState();
  const [State, setState] = useState({});

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Number-Of-Operations-User`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);
      setState(data);
    } catch (error) {
      console.log(error);
    }
  };

  const AnimatedName = ({ name }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % name.length);
      }, 300); // تغيير اللون كل 300 مللي ثانية

      return () => clearInterval(interval); // تنظيف التايمر عند إزالة المكون
    }, [name]);

    return (
      <h1>
        {name.split("").map((char, index) => (
          <span
            key={index}
            style={{
              color: index === activeIndex ? "red" : "#000",
              transition: "color 0.3s ease",
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    );
  };

  const styles = {
    cards1: {
      backgroundColor: Ishovered1 ? "#1ea9e2" : "white",
      transform: Ishovered1 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered1 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards2: {
      backgroundColor: Ishovered2 ? "#1ea9e2" : "white",
      transform: Ishovered2 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered2 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards3: {
      backgroundColor: Ishovered3 ? "#1ea9e2" : "white",
      transform: Ishovered3 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered3 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards4: {
      backgroundColor: Ishovered4 ? "#1ea9e2" : "white",
      transform: Ishovered4 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered4 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards5: {
      backgroundColor: Ishovered5 ? "#1ea9e2" : "white",
      transform: Ishovered5 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered5 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },
    cards6: {
      backgroundColor: Ishovered6 ? "#1ea9e2" : "white",
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
    const decodedTokken = jwtDecode(localStorage.getItem("Tokken"));
    setDecodedTokken(decodedTokken);
    GetState();
  }, []);

  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4 d-flex justify-content-center align-items-center">
        <span className="p-3 text-uppercase">
          {DecodedTokken ? (
            <AnimatedName
              name={DecodedTokken.fullName.split(" ")[0] + " مرحباً بك!"}
            />
          ) : (
            ""
          )}
        </span>
      </h1>
      <h5
        className="text-muted mb-4"
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
        اختر ما تريد القيام به:
      </h5>
      <Row className="justify-content-center">
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards1}
            onMouseLeave={() => setIshovered1(false)}
            onMouseEnter={() => setIshovered1(true)}
            className="shadow-lg"
          >
            <Card.Body>
              <i
                className="fa-solid fa-code-pull-request"
                style={styles.icons}
              ></i>
              <Card.Title>الطلبات الجديدة</Card.Title>
              <Card.Text>إنشاء طلب جديد بسرعة وسهولة.</Card.Text>
              <Button variant="primary">
                <Link
                  className="text-white text-decoration-none"
                  to="/newOrder"
                >
                  الذهاب إلى الطلبات الجديدة
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards2}
            onMouseEnter={() => setIshovered2(true)}
            onMouseLeave={() => setIshovered2(false)}
            className="shadow-lg"
          >
            <Card.Body>
              <Badge className="Badge-React-bootStrap">
                {State.numberOfCurrentOffers}
              </Badge>
              <i style={styles.icons} className="fa-solid fa-arrows-spin"></i>
              <Card.Title>الطلبات القائمة</Card.Title>
              <Card.Text>عرض وإدارة طلباتك الحالية.</Card.Text>
              <Button variant="success">
                <Link className="text-white text-decoration-none" to="/Orders">
                  الذهاب إلى الطلبات القائمة
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards3}
            onMouseEnter={() => setIshovered3(true)}
            onMouseLeave={() => setIshovered3(false)}
            className="shadow-lg"
          >
            <Card.Body>
              <Badge className="Badge-React-bootStrap">
                {State.numberOfRequestOrders}
              </Badge>
              <i style={styles.icons} className="fa-solid fa-cart-shopping"></i>
              <Card.Title>الطلبات الجاريه</Card.Title>
              <Card.Text>إدارة الطلبات الجاريه.</Card.Text>
              <Button variant="primary">
                <Link
                  className="text-white text-decoration-none"
                  to="/CurrentOrdersForUsers"
                >
                  لذهاب إلى الطلبات الجاريه
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards5}
            onMouseEnter={() => setIshovered5(true)}
            onMouseLeave={() => setIshovered5(false)}
            className="shadow-lg"
          >
            <Card.Body>
              <Badge className="Badge-React-bootStrap">
                {State.numberOfSuccessfulOrders}
              </Badge>

              <i style={styles.icons} className="fa-solid fa-square-check"></i>
              <Card.Title>الطلبات المنفذه</Card.Title>
              <Card.Text>عرض الطلبات المنفذه الخاص بك.</Card.Text>
              <Button className="bg-black">
                <Link
                  className="text-white text-decoration-none"
                  to="/DoneOrdersForUser"
                >
                  الذهاب الي الطلبات المنفذه
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards4}
            onMouseEnter={() => setIshovered4(true)}
            onMouseLeave={() => setIshovered4(false)}
            className="shadow-lg"
          >
            <Card.Body>

              <i style={styles.icons} className="fa-solid fa-cart-shopping"></i>
              <Card.Title>المحفظة</Card.Title>
              <Card.Text>إدارة الأموال والرصيد الخاص بك.</Card.Text>
              <Button variant="warning">
                <Link className="text-white text-decoration-none" to="/Cart">
                  لذهاب إلى المحفظة
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards6}
            onMouseEnter={() => setIshovered6(true)}
            onMouseLeave={() => setIshovered6(false)}
            className="shadow-lg"
          >
            <Card.Body>

              <i
                style={styles.icons}
                className="fa-solid fa-clock-rotate-left"
              ></i>
              <Card.Title>سجل الطلبات</Card.Title>
              <Card.Text>إدارة السجل وجميع الطلبات الخاص بك.</Card.Text>
              <Button variant="danger">
                <Link
                  className="text-white text-decoration-none"
                  to="/HistoryOfOrdersUsers"
                >
                  الذهاب إلى السجل
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPageForUsers;

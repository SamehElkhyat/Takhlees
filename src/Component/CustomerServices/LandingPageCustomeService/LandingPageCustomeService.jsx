import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function LandingPageCustomService() {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);

  const [Tokken, setTokken] = useState(null);
  const [DecodedTokken, setDecodedTokken] = useState();
  const [State, setState] = useState({});

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Number-Of-Operations-CustomerService`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      setState(data);
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
    icons: {
      fontSize: "50px",
      padding: "20px",
    },
  };

  const AnimatedName = ({ name }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % name.length);
      }, 300); // تغيير اللون كل 300 مللي ثانية

      return () => clearInterval(interval); // تنظيف التايمر عند إزالة المكون
    }, [name]);

    useEffect(() => {}, []);

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

  useEffect(() => {
    setTokken(localStorage.getItem("Tokken"));
    const decodedTokken = jwtDecode(localStorage.getItem("Tokken"));
    setDecodedTokken(decodedTokken);
    console.log(decodedTokken.fullName.split(" ")[0]);
    GetState();
  }, []);
  return (
    <Container className="text-center mt-5">
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#ffffff",
          textAlign: "center",
          padding: "15px 20px",
          width: "fit-content",
          margin: "0 auto 2rem auto",
          borderRadius: "12px",
          background: "linear-gradient(135deg,rgb(246, 246, 246), #6dd5ed)", // تدرج لوني جذاب
          border: "2px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // ظل ناعم
          transition: "all 0.3s ease-in-out",
          backdropFilter: "blur(10px)", // تأثير زجاجي
          WebkitBackdropFilter: "blur(10px)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(135deg, #2980b9, #6dd5ed)", // لون أغمق عند التحويم
          },
          "&:active": {
            transform: "scale(0.95)",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          },
        }}
        className="mb-4 d-flex justify-content-center align-items-center"
      >
        <span className="p-3 text-uppercase">
          {Tokken ? (
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
              <Badge className="Badge-React-bootStrap">
                {State.numberOfDoneOrders}
              </Badge>

              <i
                on
                className="fa-regular fa-circle-check text-success"
                style={styles.icons}
              ></i>
              <Card.Title>الطلبات المنفذه</Card.Title>
              <Card.Text>الذهاب الي الطلبات المنفذه.</Card.Text>
              <Button variant="primary">
                <Link
                  className="text-white text-decoration-none"
                  to="/DoneOrders"
                >
                  الذهاب إلى الطلبات المنفذه
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
                {State.numberOfRefuseOrders}
              </Badge>
              <i
                style={styles.icons}
                className="fa-solid fa-ban text-danger"
              ></i>
              <Card.Title>الطلبات الملغاه</Card.Title>
              <Card.Text>عرض وإدارة الطلبات الملغاه .</Card.Text>
              <Button variant="success">
                <Link
                  className="text-white text-decoration-none"
                  to="/CanceledOrders"
                >
                  الذهاب إلى الطلبات الملغاه
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
                {State.numberOfNotDoneOrders}
              </Badge>

              <i
                className="fa-solid fa-money-bill-transfer"
                style={styles.icons}
              ></i>
              <Card.Title>الطلبات المحوله</Card.Title>
              <Card.Text>عرض وإدارة الطلبات المحوله .</Card.Text>
              <Button variant="success">
                <Link
                  className="text-white text-decoration-none"
                  to="/AllOrderTransfers"
                >
                  الذهاب إلى الطلبات المحوله
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
              <Badge className="Badge-React-bootStrap">
                {State.numberOfDoneOrders}
              </Badge>
              <i
                className="fa-solid fa-money-bill-transfer"
                style={styles.icons}
              ></i>
              <Card.Title>الطلبات المحذوفه</Card.Title>
              <Card.Text>عرض وإدارة الطلبات المحذوفه .</Card.Text>
              <Button variant="success">
                <Link
                  className="text-white text-decoration-none"
                  to="/AllOrderDeleted"
                >
                  الذهاب إلى الطلبات المحذوفه
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const [State, setState] = useState({});

  const GetState = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Number-Of-Operations-Broker`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setState(data);
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
      fontSize: "5",
      padding: "20px",
    },
  };
  useEffect(() => {
    GetState();

  }, []);

  return (
    <Container className="mt-5 text-center">
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
     مرحبًا بك!
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

      <Row className="justify-content-center">
        <Col md={3} sm={6} xs={12}>
          <Card
            style={styles.cards1}
            className="text-center mb-3"
            onMouseEnter={() => setIshovered1(true)}
            onMouseLeave={() => setIshovered1(false)}
          >
            <Card.Body>
              <Badge className="Badge-React-bootStrap">
                {State.numberOfAllOrders}
              </Badge>
              <i
                className="fa-solid fa-code-pull-request"
                style={{ fontSize: "40px", padding: "20px" }}
              ></i>
              <h5 className="card-title">العروض المتاحة</h5>
              <p className="card-text">
                استعرض العروض المتاحة وقم بتقديم عروضك للعملاء بكل سهولة
              </p>
              <Link to="/availableOrders">
                <Button style={{ backgroundColor: "#1ea9e2" }}>
                  استعرض العروض
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Card
            style={styles.cards2}
            className="text-center mb-3"
            onMouseEnter={() => setIshovered2(true)}
            onMouseLeave={() => setIshovered2(false)}
          >
            <Card.Body>
              <Badge className="Badge-React-bootStrap">
                {State.listOfOrders}
              </Badge>
              <i
                className="fa-solid fa-envelope-open-text"
                style={{ fontSize: "40px", padding: "20px", color: "#71c241" }}
              ></i>
              <h5 className="card-title">العروض القائمة</h5>
              <p className="card-text">
                قم بإنشاء عروض جديدة ومتابعة حالة العروض الموجودة
              </p>
              <Link to="/currentoffers">
                <Button style={{ backgroundColor: "#1ea9e2" }}>
                  استعرض العروض
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
{DecodedTokken ? <>
  {DecodedTokken.Role === "Broker" ?  <>

<Col md={3} sm={6} xs={12}>
        <Card
          style={styles.cards3}
          className="text-center mb-3"
          onMouseEnter={() => setIshovered3(true)}
          onMouseLeave={() => setIshovered3(false)}
        >
          <Card.Body>
            <Badge className="Badge-React-bootStrap">
              {State.listForBroker}
            </Badge>
            <i
              className="fa-solid fa-clock-rotate-left"
              style={{ fontSize: "40px", padding: "20px", color: "#1ea9e2" }}
            ></i>
            <h5 className="card-title"> سجل العروض</h5>
            <p className="card-text">
              استعرض سجل العروض السابقة وتاريخ التعاملات
            </p>
            <Link to="/HistoryOfOrders">
              <Button style={{ backgroundColor: "#1ea9e2" }}>
                استعرض السجل
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>

<Col md={3} sm={6} xs={12}>
        <Card
          style={styles.cards4}
          className="text-center mb-3"
          onMouseEnter={() => setIshovered4(true)}
          onMouseLeave={() => setIshovered4(false)}
        >
          <Card.Body>
            <Badge className="Badge-React-bootStrap">
              {State.listForBroker}
            </Badge>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ fontSize: "40px", padding: "20px", color: "#1A39A0" }}
            ></i>
            <h5 className="card-title">المحفظة</h5>
            <p className="card-text">
              استعرض محفظتك الرقمية وقم بإدارة المالية
            </p>
            <Link to="/BrookersCart">
              <Button style={{ backgroundColor: "#1ea9e2" }}>
                استعرض المحفظة
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col></>
      
      :<></>}

</>:<></>}



      </Row>
    </Container>
  );
};

export default Dashboard;

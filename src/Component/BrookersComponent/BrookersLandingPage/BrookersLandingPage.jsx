import axios from "axios";
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
        `https://user.runasp.net/api/Number-Of-Operations-Broker`,
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
  useEffect(()=>{

    GetState()
  },[])

  return (
    <Container className="mt-5 text-center">
      <h1
        className="mb-4"
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
        }}
      >
        مرحباً بك!
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
        }}
      >
        اختر ما تريد القيام به:
      </h5>

      <Row className="justify-content-center">
        <Col md={3}>
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
                <Button style={{ backgroundColor: "#1ea9e2" }}>استعرض العروض</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
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
              <p className="card-text">قم بإنشاء عروض جديدة ومتابعة حالة العروض الموجودة</p>
              <Link to="/currentoffers">
                <Button style={{ backgroundColor: "#1ea9e2" }}>استعرض العروض</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
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
              <p className="card-text">استعرض سجل العروض السابقة وتاريخ التعاملات</p>
              <Link to="/HistoryOfOrders">
                <Button style={{ backgroundColor: "#1ea9e2" }}>استعرض السجل</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
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
              <p className="card-text">استعرض محفظتك الرقمية وقم بإدارة المالية</p>
              <Link to="/BrookersCart">
                <Button style={{ backgroundColor: "#1ea9e2" }}>استعرض المحفظة</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

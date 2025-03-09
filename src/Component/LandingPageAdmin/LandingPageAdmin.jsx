import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { jwtDecode } from "jwt-decode";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function LandingPageAdmin() {
  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const [Ishovered5, setIshovered5] = useState(false);
  const [Ishovered6, setIshovered6] = useState(false);
  const [Ishovered7, setIshovered7] = useState(false);

  const [Tokken, setTokken] = useState(null);
  const [DecodedTokken, setDecodedTokken] = useState();

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
      backgroundColor: "#EAEBCB",

      transform: Ishovered6 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered6 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
    },

    cards7: {
      borderRadius: "12px",
      backgroundColor: "#FAFAF8",

      transform: Ishovered7 ? "scale(1.1)" : "scale(1)",
      transition: "all 0.3s ease",
      boxShadow: Ishovered7 ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
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
  }, []);
  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4 d-flex justify-content-center align-items-center">
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
        اختر ما تريد القيام به:
      </h5>{" "}
      <Row className="justify-content-center">
        <Col md={3} sm={6} xs={12} className="mb-3 Col1">
          <Link className="text-white text-decoration-none" to="/brookers">
            <Card
              style={styles.cards1}
              onMouseLeave={() => setIshovered1(false)}
              onMouseEnter={() => setIshovered1(true)}
              className="shadow-lg"
            >
              <Card.Body>
                <i className="fa-solid fa-tty" style={styles.icons}></i>
                <div className="content">
                  <p>قم باداره المخلصين</p>
                </div>

                <Card.Title>المخلصين</Card.Title>
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
        <Col md={3} sm={6} xs={12} className="mb-3 Col2">
          <Link className="text-white text-decoration-none" to="/clients">
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
                <i style={styles.icons} className="fa-solid fa-user"></i>
                <Card.Title>العملاء</Card.Title>
                <Card.Text>عرض وإدارة العملاء .</Card.Text>
                <div className="info d-flex justify-content-end">
                  <Button className="bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-3 Col5">
          <Link className="text-white text-decoration-none" to="/statistics">
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
                <i style={styles.icons} className="fa-solid fa-chart-line"></i>
                <Card.Title>الاحصائيات </Card.Title>
                <Card.Text>عرض أحصائيات الموقع .</Card.Text>
                <div className="info d-flex justify-content-end">
                  <Button className="bg-black text-white border-none ">
                    <ArrowRightAltIcon />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3 Col6">
          <Link className="text-white text-decoration-none" to="/blackList">
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
                <i style={styles.icons} className="fa-solid fa-ban"></i>
                <Card.Title>المحظورين</Card.Title>
                <Card.Text>عرض وإدارة المحظورين .</Card.Text>
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
            to="/CPanelCustomerService"
          >
            <Card
              style={styles.cards5}
              onMouseEnter={() => setIshovered5(true)}
              onMouseLeave={() => setIshovered5(false)}
              className="shadow-lg"
            >
              <div className="content">
                <p>قم بإداره خدمه العملاء</p>
              </div>
              <Card.Body>
                <i style={styles.icons} className="fa-solid fa-users-gear"></i>
                <Card.Title>خدمه العملاء</Card.Title>
                <Card.Text>عرض وإدارة خدمه العملاء .</Card.Text>

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
            to="/CpanelAccountant"
          >
            <Card
              style={styles.cards6}
              onMouseEnter={() => setIshovered6(true)}
              onMouseLeave={() => setIshovered6(false)}
              className="shadow-lg"
            >
              <Card.Body>
                <i
                  style={styles.icons}
                  className="fa-solid fa-file-invoice"
                ></i>
                <Card.Title>المحاسبين</Card.Title>
                <Card.Text>عرض وإدارة المحاسبين .</Card.Text>
                <div className="content">
                  <p>قم بإداره المحاسبين</p>
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
        <Col md={3} sm={6} xs={12} className="mb-3 Col7">
          <Link className="text-white text-decoration-none" to="/permissions">
            <Card
              style={styles.cards7}
              onMouseEnter={() => setIshovered7(true)}
              onMouseLeave={() => setIshovered7(false)}
              className="shadow-lg"
            >
              <div className="content">
                <p>تحديد وتخصيص صلاحيات الموظفين</p>
              </div>
              <Card.Body>
                <i
                  style={styles.icons}
                  className="fa-solid fa-file-invoice"
                ></i>
                <Card.Title>الصلاحيات</Card.Title>
                <Card.Text>عرض وإدارة الصلاحيات .</Card.Text>
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

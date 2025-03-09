import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LandingPageManger() {

  const [Ishovered1, setIshovered1] = useState(false);
  const [Ishovered2, setIshovered2] = useState(false);
  const [Ishovered3, setIshovered3] = useState(false);
  const [Ishovered4, setIshovered4] = useState(false);
  const [Ishovered5, setIshovered5] = useState(false);
  const [Ishovered6, setIshovered6] = useState(false);
  const [Ishovered7, setIshovered7] = useState(false);
  const [Ishovered8, setIshovered8] = useState(false);


  const [Tokken, setTokken] = useState(null);
  const [DecodedTokken, setDecodedTokken] = useState();

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
    cards7: {
      backgroundColor: Ishovered7 ? "#1ea9e2" : "white",
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
      <h5 className="text-muted mb-4">اختر ما تريد القيام به:</h5>
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
                className="fa-solid fa-tty text-success"
                style={styles.icons}
              ></i>

              <Card.Title>المخلصين</Card.Title>
              <Card.Text>الذهاب الي المخلصين.</Card.Text>
              <Button variant="success">
                <Link
                  className="text-white text-decoration-none"
                  to="/BrookersManger"
                >
                  الذهاب إلى قائمه المخلصين
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
              <i style={styles.icons} className="fa-solid fa-user text-warning"></i>
              <Card.Title>العملاء</Card.Title>
              <Card.Text>عرض وإدارة العملاء .</Card.Text>
              <Button variant="warning">
                <Link className="text-white text-decoration-none" to="/ClientsManger">
                  الذهاب إلى العملاء
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
              <i
                style={styles.icons}
                className="fa-solid fa-chart-line text-dark"
              ></i>
              <Card.Title>الاحصائيات </Card.Title>
              <Card.Text>عرض أحصائيات الموقع .</Card.Text>
              <Button variant="dark">
                <Link
                  className="text-white text-decoration-none"
                  to="/statisticsManger"
                >
                  الذهاب إلى ألاحصائيات
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
              <i
                style={styles.icons}
                className="fa-solid fa-ban text-danger"
              ></i>
              <Card.Title>المحظورين</Card.Title>
              <Card.Text>عرض وإدارة المحظورين .</Card.Text>
              <Button variant="danger">
                <Link
                  className="text-white text-decoration-none"
                  to="/blacklistManger"
                >
                  الذهاب إلى قائمه المحظورين
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
              <i
                style={styles.icons}
                className="fa-solid fa-users-gear text-primary"
              ></i>
              <Card.Title>خدمه العملاء</Card.Title>
              <Card.Text>عرض وإدارة خدمه العملاء .</Card.Text>
              <Button variant="primary">
                <Link
                  className="text-white text-decoration-none"
                  to="/CPanelCustomeServiceManger"
                >
                  الذهاب إلى قائمه خدمه العملاء
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
              <i style={styles.icons} className="fa-solid fa-file-invoice text-info"></i>
              <Card.Title>المحاسبين</Card.Title>
              <Card.Text>عرض وإدارة المحاسبين .</Card.Text>
              <Button variant="info">
                <Link
                  className="text-white text-decoration-none"
                  to="/CpanelAccountantManger"
                >
                  الذهاب إلى قائمه المحاسبين
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card
            style={styles.cards7}
            onMouseEnter={() => setIshovered7(true)}
            onMouseLeave={() => setIshovered7(false)}
            className="shadow-lg"
          >
            <Card.Body>
              <i style={styles.icons} className="fa-solid fa-file-invoice text-info"></i>
              <Card.Title>متابعه الطلبات</Card.Title>
              <Card.Text>عرض وإدارة سجل الطلبات .</Card.Text>
              <Button variant="info">
                <Link
                  className="text-white text-decoration-none"
                  to="/CpanelAccountantManger"
                >
                  الذهاب إلى قائمه الطلبات
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
  
      </Row>
    </Container>
  );
}

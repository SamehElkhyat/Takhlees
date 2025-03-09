import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { color } from "framer-motion";

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
      color:"black"
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
              transition: "color 0.8s ease",
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
 <div className="container text-center py-5">
  <h1
    className="mb-4 p-4 text-white fw-bold shadow-lg rounded"
    style={{
      background: "linear-gradient(135deg, #3498db, #4A6785)",
      display: "inline-block",
      borderRadius: "15px",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease-in-out",
    }}
  >
    <span className="d-inline-block p-2">
      {DecodedTokken?.fullName ? (
        <AnimatedName
          name={`${DecodedTokken.fullName.split(" ")[0]} مرحباً بك!`}
        />
      ) : (
        "مرحبًا بك!"
      )}
    </span>
  </h1>
</div>

      <h5
        className="text-black mb-4"
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
          backgroundColor: "#B3D4FF",
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
                <i
                  style={styles.icons}
                  className="fa-solid fa-ban"
                ></i>
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

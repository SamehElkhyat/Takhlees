import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useDispatch } from "react-redux";
import { GetDataApi } from "../Redux/Features/Slice/GetDataApiReducer";
export default function LandingPageAdmin() {
  const styles = {
    icons: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    cards1: { backgroundColor: "#1f1f1f", color: "white" },
    cards2: { backgroundColor: "#1a1a2e", color: "white" },
    cards3: { backgroundColor: "#16213e", color: "white" },
    cards4: { backgroundColor: "#0f3460", color: "white" },
    cards5: { backgroundColor: "#53354a", color: "white" },
    cards6: { backgroundColor: "#903749", color: "white" },
    cards7: { backgroundColor: "#53354a", color: "white" },
    cards8: { backgroundColor: "#1c1c1c", color: "white" },
    cards9: { backgroundColor: "#2d4059", color: "white" },
    cards10: { backgroundColor: "#ff5722", color: "white" },
    cards11: { backgroundColor: "#607d8b", color: "white" },
    cards12: { backgroundColor: "#2c3e50", color: "white" },
  };
  const cardsData = [
    {
      title: "المخلصين",
      text: "الذهاب الي المخلصين.",
      link: "/brookers",
      icon: "fa-tty",
      description: "قم باداره المخلصين",
      style: styles.cards1,
    },
    {
      title: "العملاء",
      text: "عرض وإدارة العملاء .",
      link: "/clients",
      icon: "fa-user",
      description: "قم بإداره العملاء",
      style: styles.cards2,
    },
    {
      title: "الاحصائيات",
      text: "عرض أحصائيات الموقع .",
      link: "/statistics",
      icon: "fa-chart-line",
      description: "عرض إحصائيات الموقع بالكامل",
      style: styles.cards3,
    },
    {
      title: "المحظورين",
      text: "عرض وإدارة المحظورين .",
      link: "/blackList",
      icon: "fa-ban",
      description: "عرض وإداره المحظوريين",
      style: styles.cards4,
    },
    {
      title: "خدمه العملاء",
      text: "عرض وإدارة خدمه العملاء .",
      link: "/CPanelCustomerService",
      icon: "fa-users-gear",
      description: "قم بإداره خدمه العملاء",
      style: styles.cards5,
    },
    {
      title: "المحاسبين",
      text: "عرض وإدارة المحاسبين .",
      link: "/CpanelAccountant",
      icon: "fa-receipt",
      description: "قم بإداره المحاسبين",
      style: styles.cards6,
    },
    {
      title: "الصلاحيات",
      text: "عرض وإدارة الصلاحيات .",
      link: "/permissions",
      icon: "fa-file-invoice",
      description: "تحديد وتخصيص صلاحيات الموظفين",
      style: styles.cards7,
    },
    {
      title: "متابعه الطلبات",
      text: "عرض وإدارة سجل الطلبات .",
      link: "/LogsOrders",
      icon: "fa-person-walking-arrow-right",
      description: "متابعه الطلبات بالتفصيل",
      style: styles.cards8,
    },
    {
      title: "إداره المديرين",
      text: "عرض وإدارة المديرين .",
      link: "/Mangers",
      icon: "fa-person-walking-arrow-right",
      description: "المديريين",
      style: styles.cards9,
    },
    {
      title: "عرض الشكاوي",
      text: "عرض وإدارة الشكاوي .",
      link: "/FormResponse",
      icon: "fa-bug",
      description: "الشكاوي والاقتراحات",
      style: styles.cards10,
    },
    {
      title: "إداره الطلبات المنتهيه",
      text: "عرض وإدارة الطلبات المنتهيه .",
      link: "/ExpiredOrders",
      icon: "fa-person-walking-arrow-right",
      description: "الطلبات المنتهيه",
      style: styles.cards11,
    },
    {
      title: "إداره المديرين",
      text: "عرض وإدارة المديرين .",
      link: "/Mangers",
      icon: "fa-people-roof",
      description: "المديريين",
      style: styles.cards12,
    },
  ];

  const [hoveredCards, setHoveredCards] = useState(
    Array(cardsData.length).fill(false)
  );

  const [userProfile, setuserProfile] = useState(null);
  const [userLink, setUserLink] = useState(null);

  const dispatch = useDispatch();

  const navigationToLandingpage = async () => {
    let { payload } = await dispatch(GetDataApi());

    setuserProfile(payload);

    let link;

    if (payload !== undefined) {
      switch (payload.role) {
        case "User":
          link = "/LandingPageForUsers";
          break;
        case "Admin":
          link = "/LandingPageAdmin";
          break;
        case "Company":
          link = "/LandingPageForUsers";
          break;
        case "Account":
          link = "/AccountantLandingPage";
          break;
        case "CustomerService":
          link = "/LandingPageCustomeService";
          break;
        case "Broker":
          link = "/BrookersLandingPage";
          break;
        case "Manager":
          link = "/LandingPageManger";
          break;
        default:
          link = null;
      }
      setUserLink(link);
    }
  };

  const handleMouseEnter = (index) => {
    const updated = [...hoveredCards];
    updated[index] = true;
    setHoveredCards(updated);
  };

  const handleMouseLeave = (index) => {
    const updated = [...hoveredCards];
    updated[index] = false;
    setHoveredCards(updated);
  };

  useEffect(() => {
    navigationToLandingpage();
  }, []);
  return (
    <Container className="text-center  mt-5">
      {userProfile !== null ? (
        <>
          {userProfile.role === "Admin" ? (
            <>
              <div className="container text-center py-5">
                <h1
                  className="mb-4 p-4 text-white fw-bold shadow-lg "
                  style={{
                    backgroundImage:
                      "linear-gradient(60deg, #89CFF0,rgb(140, 162, 129), #D8BFD8)",
                    display: "inline-block",
                    borderRadius: "25px",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <span className="d-inline-block p-2">مرحبا بك</span>
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
                {cardsData.map((card, index) => (
                  <Col
                    key={index}
                    md={3}
                    sm={6}
                    xs={12}
                    className={`mb-3 Col${index + 1}`}
                  >
                    <Link
                      className="text-white text-decoration-none"
                      to={card.link}
                    >
                      <Card
                        style={{
                          ...card.style,
                          transform: hoveredCards[index]
                            ? "scale(1.03)"
                            : "scale(1)",
                          transition: "transform 0.2s ease-in-out",
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        className="shadow-lg"
                      >
                        <Card.Body>
                          <i
                            className={`fa-solid ${card.icon}`}
                            style={styles.icons}
                          ></i>
                          <div className="content">
                            <p>{card.description}</p>
                          </div>
                          <Card.Title>{card.title}</Card.Title>
                          <Card.Text>{card.text}</Card.Text>
                          <div className="info d-flex justify-content-end">
                            <Button className="bg-black text-white border-none">
                              <ArrowRightAltIcon />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <>
              <h1>غير مسموح لك بالدخول</h1>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

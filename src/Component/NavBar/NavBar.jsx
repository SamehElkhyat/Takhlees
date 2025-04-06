import React, { useEffect, useState } from "react";
import "./NavBar.css";
import Logo from "../NavBar/LOGO-H.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { eventEmitter } from "../eventEmitter";

const NavBar = () => {
  const [Token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const location = useLocation();

  const [userLink, setUserLink] = useState(null);

  const navigate = useNavigate();

  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });

      if (
        location.pathname == "/ActiveEmail" ||
        location.pathname == "/SignIn"
      ) {
        setToken(null);
      } else {
        setToken(data.data);
        let link;

        switch (data.data.role) {
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
    } catch (error) {}
  };

  const SignOut = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Logout`, {
        withCredentials: true,
      });
      navigationToLandingpage();
      setToken(null);
      navigate("/SignIn");
    } catch (error) {}
  };

  let DrawerListEdit = () => {
    let Icon = document.getElementById("icon");

    Icon.onclick = () => {
      document.body.classList.toggle("DrawerList");
    };
  };
  useEffect(() => {
    navigationToLandingpage();
    // الاستماع للحدث
    eventEmitter.on("dataUpdated", navigationToLandingpage);
    // تنظيف الحدث عند إزالة الكومبوننت
    return () => {
      eventEmitter.off("dataUpdated", navigationToLandingpage);
    };
  }, []);
  return (
    <>
      <Drawer
        className="position-absolute z-index-99999999999"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <img className="Drawer-Logo" src={Logo} alt="Company Logo" />

        <Box
          id="DrawerList"
          className="drawer-list"
          sx={{
            width: 300,
            backgroundColor: "#f8f9fa",
            height: "100%",
            "& .MuiListItemButton-root": {
              padding: "12px 24px",
              "&:hover": {
                backgroundColor: "#e9ecef",
                borderRadius: "8px",
                margin: "0 8px",
                transition: "all 0.2s ease-in-out",
              },
            },
            "& .MuiListItemText-primary": {
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#343a40",
            },
            "& .MuiDivider-root": {
              margin: "16px 0",
              backgroundColor: "#dee2e6",
            },
          }}
          role="presentation"
        >
          {Token !== null ? (
            <>
              {Token?.role === "Admin" ? (
                <>
                  <List>
                    <ListItem key={"text1"} disablePadding>
                      <ListItemButton>
                        <Link className="text-decoration-none" to="/brookers">
                          <ListItemText primary={"المخلصين"} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"text2"} disablePadding>
                      <ListItemButton>
                        <Link to="/clients">
                          <ListItemText primary={"العملاء"} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"text3"} disablePadding>
                      <ListItemButton>
                        <Link to="/permissions">
                          <ListItemText primary={"الصلاحيات"} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"text4"} disablePadding>
                      <ListItemButton>
                        <Link to="/statistics">
                          <ListItemText primary={"احصائيات"} />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"text5"} disablePadding>
                      <Link to="/blackList">
                        <ListItemButton>
                          <ListItemText primary={"المحظورين"} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    <ListItem key={"text6"} disablePadding>
                      <Link to="/Settings">
                        <ListItemButton>
                          <ListItemText primary={"الاعدادات"} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                    <ListItem key={"text7"} disablePadding>
                      <Link to='/ContactForm'>
                        <ListItemButton>
                        <ListItemText primary={"التواصل معنا"} />
                      </ListItemButton>
                      </Link>
                    
                    </ListItem>
                    <ListItem key={"text8"} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={"خدمه العملاء"} />
                      </ListItemButton>
                    </ListItem>

                    <ListItem key={"text9"} disablePadding>
                      <ListItemButton>
                        <ListItemText
                          onClick={() => {
                            SignOut();
                          }}
                          primary={"تسجيل الخروج"}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </>
              ) : (
                <>
                  <List>
                    <ListItem key={"text6"} disablePadding>
                      <Link to="/Settings">
                        <ListItemButton>
                          <ListItemText primary={"الاعدادات"} />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                    <ListItem key={"text7"} disablePadding>
                      <Link to='/ContactForm'>
                        <ListItemButton>
                        <ListItemText primary={"التواصل معنا"} />
                      </ListItemButton>
                      </Link>
                    
                    </ListItem>
                    <ListItem key={"text3"} disablePadding>
                      <ListItemButton>
                        <ListItemText primary={"أدوات العملاء"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"text9"} disablePadding>
                      <ListItemButton>
                        <ListItemText
                          onClick={() => {
                            SignOut();
                          }}
                          primary={"تسجيل الخروج"}
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          <Divider />
        </Box>
      </Drawer>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={Logo} alt="Company Logo" />
          </div>

          {Token == null ? (
            <>
              {console.log(Token)}
              <div className="Items-NavBar">
                <ul className="nav-menu">
                  <li className="nav-item">
                    <Link to="/IntorSignUp" className="nav-link">
                      انشاء حساب
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/IntorSignIn" className="nav-link">
                      تسجيل دخول
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Button
                id="icon"
                onClick={toggleDrawer(true)}
                className="men me-5 d-flex flex-row align-items-center justify-content-start text-white"
              >
                لوحه التحكم
              </Button>

              <li className="nav-item d-flex flex-row align-items-center justify-content-start">
                <Link to={userLink} className="nav-link">
                  {Token.fullName}
                  <i className="m-2 fa-solid fa-toolbox"></i>
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;

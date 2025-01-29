import React, { useEffect, useState } from "react";
import "./NavBar.css";
import Logo from "../NavBar/LOGO-H.png";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
const NavBar = () => {
  const [Token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [apiToken, setApiToken] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // تغيير اللغة
  };

  let DrawerListEdit = () => {
    let Icon = document.getElementById("icon");

    Icon.onclick = () => {
      document.body.classList.toggle("DrawerList");
    };
  };
  useEffect(() => {
    let ApiToken = localStorage.getItem("Tokken");
    console.log(localStorage.getItem("Tokken"));

    setApiToken(true);

    const path = window.location.pathname;

    if (Token == null) {
      if (ApiToken != null && path !== "/ConfirmPassword") {
        let DecodedToken = jwtDecode(ApiToken);
        setToken(DecodedToken);
      }
    } else {
      setToken("error decoded token");
    }
  }, []);
  return (
    <>
      <Drawer
        className="position-absolute z-index-9999999999990011111111111111111"
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
          {Token?.Role === "Admin" ? (
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
                  <ListItemButton>
                    <ListItemText primary={"الاعدادات"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"text7"} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={"التواصل معنا"} />
                  </ListItemButton>
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
                        localStorage.removeItem("Tokken");
                        toast("تم تسجيل الخروج بنجاح");
                        setApiToken(false);
                        window.location.href="/SignIn";
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
                <ListItem key={"text1"} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={"الاعدادات"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"text2"} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={"التواصل معنا"} />
                  </ListItemButton>
                </ListItem>
                <ListItem key={"text3"} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={"أدوات العملاء"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
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
              {" "}
              <Button onClick={() => changeLanguage('en')}>English</Button>
            <Button onClick={() => changeLanguage('ar')}>العربية</Button>
              <div className="Items-NavBar">
                <ul className="nav-menu">
                  <li className="nav-item">
                    <Link to="/IntorSignUp" className="nav-link">
                    {t('انشاء حساب')}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/IntorSignIn" className="nav-link">
                    {t('تسجيل دخول')}
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>

            <Button onClick={() => changeLanguage('en')}>English</Button>
            <Button onClick={() => changeLanguage('ar')}>العربية</Button>
              <Button
                id="icon"
                onClick={toggleDrawer(true)}
                className="men me-5 d-flex flex-row align-items-center justify-content-start text-white"
              >
                لوحه التحكم
              </Button>

              <li className="nav-item d-flex flex-row align-items-center justify-content-start">
                {Token.role === "Admin" ? (
                  <Link to="/Admin" className="nav-link">
                    {Token.fullName}
                    <i className="m-2 fa-solid fa-toolbox"></i>
                  </Link>
                ) : (
                  <Link
                    to="/User"
                    className="Drawer-link space-between text-decoration-none"
                  >
                    {Token.fullName}
                    <i className="m-2 fa-solid fa-toolbox"></i>
                  </Link>
                )}
              </li>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;

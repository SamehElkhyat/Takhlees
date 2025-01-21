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
const NavBar = () => {
  const [Token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  let DrawerListEdit = () => {

    let Icon = document.getElementById("icon");

      Icon.onclick = () => {
        document.body.classList.toggle("DrawerList");

      };
  
    

  };

 
    
  
  

  useEffect(() => {
    console.log(localStorage.getItem("Tokken"));


    let ApiToken = localStorage.getItem("Tokken")
    console.log(ApiToken);
    const path = window.location.pathname; // يُرجع كل شيء بعد اسم النطاق
console.log(path);

    if(Token == null){

      if(ApiToken != null && path !=="/ConfirmPassword"){
        let DecodedToken = jwtDecode(ApiToken)
        setToken(DecodedToken);
        console.log(Token);
      }

    } else {
      setToken(null);
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
    onClick={toggleDrawer(false)}
  >

{console.log(Token.role)
}
    <Divider />
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

        <ListItem key={"text5"} disablePadding>
          <ListItemButton>
            <ListItemText onClick={() => {
              localStorage.removeItem("Tokken");
            }} primary={"تسجيل الخروج"} />
          </ListItemButton>
          </ListItem>
    </List>
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
                {Token.role === "Admin" ? (
                  <Link to="/Admin" className="nav-link">
                    {Token.fullName}
                    <i className="m-2 fa-solid fa-toolbox"></i>
                  </Link>
                ) : (
                  <Link to="/User" className="Drawer-link space-between text-decoration-none">
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

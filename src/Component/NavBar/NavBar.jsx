import React from 'react';
import './NavBar.css';
import Logo from '../NavBar/LOGO-H.png'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={Logo} alt="Company Logo" />
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/IntorSignUp" className="nav-link">انشاء حساب</a>
          </li>
          <li className="nav-item">
            <a href="/IntorSignIn" className="nav-link">تسجيل دخول</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

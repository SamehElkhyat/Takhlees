import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top-Content-Footer">
        <button className="Login mt-5 pl-2 btn"> Login</button>
        <button className="Register mt-5 pl-2 btn"> Register</button>
      </div>

      <div className="center-content-Footer">
        <ul>
          <h5>products</h5>
          <li><i className="fa-solid fa-arrow-right"></i>Features</li>
          <li><i className="fa-solid fa-arrow-right"></i>Integration</li>
          <li><i className="fa-solid fa-arrow-right"></i>Roadmap</li>
        </ul>

        <ul>
          <h5>Company</h5>
          <li><i className="fa-solid fa-arrow-right"></i>About</li>
          <li><i className="fa-solid fa-arrow-right"></i>Term Of Services</li>
          <li><i className="fa-solid fa-arrow-right"></i>Privacy policy</li>
          <li><i className="fa-solid fa-arrow-right"></i>Licensed & regulation</li>
        </ul>

        <ul>
          <h5>Stay In Touch</h5>
          <li><i className="fa-solid fa-arrow-right"></i>Keep Updated</li>
        </ul>
      </div>

      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

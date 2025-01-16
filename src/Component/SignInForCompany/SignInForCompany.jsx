import React from "react";
import "./SignInForCompany.css";
import SignInBackground from "../SignIn/ships.png";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignInForCompany = () => {
  async function handelesignin(values) {
    try {
      const data = await axios.post("https://takhleesak.runasp.net/api/Login", {
        Email: values.Email,
        Password: values.Password,
      });

      if (data.data.message === "تم تسجيل الدخول بنجاح") {
        toast(data.data.message);
        window.location.href = "/WaitingForData";
      } else {
        toast(data.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data); 
      } else if (error.request) {
        console.error("Request error:", error.request); 
      } else {
        console.error("Axios error:", error.message); 
      }
    }
  }

  let formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: handelesignin,
  });

  return (
    <>
      <div className="background-img-frame"></div>
      <img className="Signin-Background" src={SignInBackground} alt="" />
      <div className="dad-SignIn-Frame w-100 h-100">
        <div className="SignIn-Frame"></div>
      </div>

      <div className="sign-in-container">
        <h2> تسجيل الدخول للأعمال</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-group-company">
            <hr />
            <input
              onChange={formik.handleChange}
              value={formik.values.Email}
              placeholder=" البريد الالكتروني"
              type="email"
              id="Email"
              name="Email"
              required
            />
          </div>
          <div className="form-group-company">
            <hr />
            <input
              onChange={formik.handleChange}
              value={formik.values.Password}
              placeholder="ادخل كلمه السر"
              type="password"
              id="Password"
              name="Password"
              required
            />
          </div>
          <p>
              <Link className="to-ResetPassword" to="/ResetPassword">
                هل نسيت كلمة السر؟
              </Link>
            </p>

          <div className="button-group">
            <button className="signin-button" type="submit">
              تسجيل الدخول
            </button>
            <p >
              <Link
              className="to-SignUp"
                to="/SignUpForCompany"
              >
              انشاء حساب جديد 
              </Link></p>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default SignInForCompany;

import React from "react";
import "./SignIn.css";
import * as Yup from "yup";
import SignInBackground from "../SignIn/ships.png";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    Password: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
  });

  async function handelesignin(values) {
    try {
      const data = await axios.post("https://takhleesak.runasp.net/api/Login", {
        Email: values.Email,
        Password: values.Password,
      });
      if (data.data.message === "تم تسجيل الدخول بنجاح") {
        toast(data.data.message);
        localStorage.setItem("Tokken", data.data.data);
        localStorage.setItem("Code", data.data.state);
        const decodedCode= jwtDecode(localStorage.getItem("Tokken"))
             console.log(decodedCode);
             if (decodedCode.Role == "User") {
              return (window.location.href = "/LandingPageForUsers");
            } else if (decodedCode.Role == "Admin") {
              return (window.location.href = "/LandingPageAdmin");
            } else if (decodedCode.Role == "Company") {
              return (window.location.href = "/LandingPageForUsers");
            } else if (decodedCode.Role == "Account") {
             return (window.location.href = "/AccountantLandingPage");
            } else if (decodedCode.Role == "CustomerService") {
              return (window.location.href = "/LandingPageCustomeService");
            } else if (decodedCode.Role == "Broker") {
              return (window.location.href ="/BrookersLandingPage")
            } else if (decodedCode.Role == "Manager") {
              console.log("Manager");
            }

             
      } else {
        toast(data.data.message);
      }
    } catch (error) {
      
          toast(error.response.data.message)
          
    }
  }

  let formik = useFormik({
    initialValues:{
      Email: "",
      Password: "",
    },
    validationSchema,
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

        <h2>تسجيل الدخول</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-group-company">
            <hr />
            <input
              value={formik.values.Email}
              onChange={formik.handleChange}
              placeholder="البريد الالكتروني"
              type="email"
              id="Email"
              name="Email"
              required
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="error-message">{formik.errors.Email}</div>
            )}
          </div>
          <div className="form-group-company">
            <hr />
            <input
              value={formik.values.Password}
              onChange={formik.handleChange}
              placeholder="ادخل كلمه السر"
              type="Password"
              id="Password"
              name="Password"
              required
            />
            {formik.touched.Password && formik.errors.Password && (
              <div className="error-message">{formik.errors.Password}</div>
            )}
          </div>
          <p>
            <Link className="to-ResetPassword" to="/ResetPassword">
            
              هل نسيت كلمة السر؟
            </Link>
          </p>

          <div className="button-group">
            <button className="signin-button"
            type="submit">
              تسجيل الدخول
            </button>
            <p>
              <Link className="to-SignUp" to="/IntorSignUp">
                انشاء حساب جديد
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;

import React from "react";
import "./SignIn.css";
import * as Yup from "yup";
import SignInBackground from "../SignIn/ships.png";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

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
      console.log(data.data.message);

      if (data.data.message === "تم تسجيل الدخول بنجاح") {
        toast(data.data.message);
        localStorage.setItem("Tokken", data.data.data);
        localStorage.setItem("Code", data.data.state);
        

         window.location.href = "/ConfirmPassword";
      } else {
        toast(data.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data); // رسالة الخطأ من الخادم
      } else if (error.request) {
        console.error("Request error:", error.request); // مشكلة في الطلب
      } else {
        console.error("Axios error:", error.message); // خطأ عام
      }
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
        <h2>تسجيل الدخول للأفراد</h2>
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
            <button className="signin-button" type="submit">
              تسجيل الدخول
            </button>
            <p>
              <Link className="to-SignUp" to="/SignUpForCompany">
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

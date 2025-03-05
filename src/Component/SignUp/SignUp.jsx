import React from "react";
import "./SignUp.css";
import SignUpBackground from "../SignIn/ships.png"; // You might want to use a different image or path
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUp = () => {
  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    Password: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .min(8, "و تحتوي علي حروف و ارقام و حروف كبيره و صغيره")
      .oneOf([Yup.ref("Confirm")], "كلمات المرور غير متطابقة"),
    fullName: Yup.string()
      .required(" الاسم الكامل مطلوب"),
    Confirm: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("Password")], "كلمات المرور غير متطابقة"),
    Identity: Yup.string()
      .required("رقم الهويه مطلوب"),
    phoneNumber: Yup.string()
      .required("رقم الهاتف مطلوب"),
  });

  const handelSignUp = async (values) => {
    
    try {
      const data = await axios.post(
        `https://takhleesak.runasp.net/api/Register-user`,
        values
      );
      if (data.data.message === "تم تسجيل حساب الافراد بنجاح") {
        toast(data.data.message);
        window.location.href = "/SignIn";
      } else {
        toast(data.data.message);
      }
    } catch (error) {      
      toast.error(error.response.data.message);
    }
  };

  let formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      fullName: "",
      Confirm: "",
      Identity: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: handelSignUp,
  });

  return (
    <>
      <div className="signup-background-img-frame"></div>
      <img className="signup-Background" src={SignUpBackground} alt="" />
      <div className="dad-signup-Frame w-100 h-100">
        <div className="signup-Frame"></div>
      </div>

      <div className="sign-Up-container">
        <h2>انشاء حساب للافراد</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="Big-Form-SignUp">
            <div className="SignUp-form-group col-md-6">
              <hr />
              <input
                value={formik.values.fullName}
                onChange={formik.handleChange}
                placeholder="الاسم كامل"
                type="name"
                id="fullName"
                name="fullName"
                required
              />
                 {formik.touched.fullName && formik.errors.fullName && (
              <div className="error-message">{formik.errors.fullName}</div>
            )}

              <hr />
              <input
                value={formik.values.Email}
                onChange={formik.handleChange}
                placeholder="البريد الالكتروني"
                type="text"
                id="Email"
                name="Email"
                required
              />
                 {formik.touched.Email && formik.errors.Email && (
              <div className="error-message">{formik.errors.Email}</div>
            )}

              <hr />
              <input
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                placeholder="رقم الهاتف"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="error-message">{formik.errors.phoneNumber}</div>
            )}
            </div>

            <div className="SignUp-form-group col-md-6">
              <hr />
              <input
                value={formik.values.Password}
                onChange={formik.handleChange}
                placeholder=" كلمه السر"
                type="password"
                id="Password"
                name="Password"
                required
              />
              {formik.touched.Password && formik.errors.Password && (
              <div className="error-message">{formik.errors.Password}</div>
            )}

              <hr />
              <input
                value={formik.values.Confirm}
                onChange={formik.handleChange}
                placeholder="تاكيد كلمه السر:"
                type="password"
                id="Confirm"
                name="Confirm"
                required
              />
              {formik.touched.Confirm && formik.errors.Confirm && (
              <div className="error-message">{formik.errors.Confirm}</div>
            )}

              <hr />
              <input
                value={formik.values.Identity}
                onChange={formik.handleChange}
                placeholder="رقم الهويه"
                type="text"
                id="Identity"
                name="Identity"
                required
              />
              {formik.touched.Identity && formik.errors.Identity && (
              <div className="error-message">{formik.errors.Identity}</div>
            )}
            </div>
          </div>

          <div className="signup-button-group">
            <button className="register-button-SignUp" type="submit">
              انشاء حساب
            </button>

            <p>
              <Link className="to-SignUp" to="/SignIn">
                هل لديك حساب بالفعل
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Toaster />
    </>
  );
};

export default SignUp;

import React from "react";
import "./SignUpForCompany.css";
import SignUpBackground from "../SignIn/ships.png"; // You might want to use a different image or path
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpForCompany = () => {
  const handelSignUpForCompany = async (values) => {
    try {
      console.log(values);

      const data = await axios.post(
        `https://takhleesak.runasp.net/api/Register-company`,
        values
      );

      if (data.data.message === "تم تسجيل الدخول بنجاح") {
        toast("sucsses");
        window.location.href = "/WaitingForData";
      } else {
        toast(data.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      fullName: "",
      Confirm: "",
      Identity: "",
      phoneNumber: "",
      InsuranceNumber: "",
      taxRecord: "",
    },
    onSubmit: handelSignUpForCompany,
  });

  return (
    <>
      <div className="SignUpCompany-background-img-frame"></div>
      <img className="SignUpCompany-Background" src={SignUpBackground} alt="" />
      <div className="dad-SignUpCompany-Frame w-100 h-100">
        <div className="SignUpCompany-Frame"></div>
      </div>

      <div className="sign-Up-ForCompany-container">
        <h2>انشاء حساب للأعمال</h2>
        <form id="form" onSubmit={formik.handleSubmit} noValidate>
          <div className="Big-Form">
            <div className="SignUpCompany-form-group1 col-md-6">
              <hr />
              <input
                className="col-md-12"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                placeholder="اسم الشركه"
                type="name"
                id="fullName"
                name="fullName"
                required
              />
              <hr />

              <input
                onChange={formik.handleChange}
                value={formik.values.Email}
                placeholder="البريد الالكتروني"
                type="ُemail"
                id="Email"
                name="Email"
                required
              />
              <hr />
              <input
                value={formik.values.taxRecord}
                onChange={formik.handleChange}
                placeholder="السجل التجاري"
                type="text"
                id="taxRecord"
                name="taxRecord"
                required
              />
              <hr />

              <input
                onChange={formik.handleChange}
                value={formik.values.InsuranceNumber}
                placeholder="رقم الضريبي"
                type="text"
                id="InsuranceNumber"
                name="InsuranceNumber"
                required
              />
            </div>

            <div className="SignUpCompany-form-group2 col-md-6">
              <hr />

              <input
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder="رقم الهاتف"
                type="phone"
                id="phoneNumber"
                name="phoneNumber"
                required
              />
              <hr />

              <input
                onChange={formik.handleChange}
                value={formik.values.Password}
                placeholder=" كلمه السر"
                type="password"
                id="Password"
                name="Password"
                required
              />
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
            </div>

          
          </div>

          <div className="signupForCompany-button-group">
            <button className="register-button-ForComponent" type="submit">
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

export default SignUpForCompany;

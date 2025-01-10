import React from "react";
import "./SignUp.css";
import SignUpBackground from "../SignIn/ships.png"; // You might want to use a different image or path
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handelSignUp = async (values) => {
    try {
      const data = await axios.post(
        `https://takhleesak.runasp.net/api/Register-user`,
        values
      );
      if (data.data.message === 'تم تسجيل الدخول بنجاح') {
        toast('sucsses');
        window.location.href='/WaitingForData'
      }else{
        toast(data.data.message)
      }
    } catch (error) {
      alert(error);
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

          <div className="signup-button-group">
            <button className="register-button-SignUp" type="submit">
            <Link className="text-white text-decoration-none" to='/WaitingForData'>              انشاء حساب

</Link>
            </button>
          </div>
        </form>
      </div>

      <Toaster/>
    </>
  );
};

export default SignUp;

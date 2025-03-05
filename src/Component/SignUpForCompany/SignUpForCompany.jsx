import React from "react";
import "./SignUpForCompany.css";
import SignUpBackground from "../SignIn/ships.png";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const SignUpForCompany = () => {
  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    Password: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .min(8, "و تحتوي علي حروف و ارقام و حروف كبيره و صغيره")
      .oneOf([Yup.ref("Confirm")], "كلمات المرور غير متطابقة"),
    fullName: Yup.string().required(" الاسم الكامل مطلوب"),
    Confirm: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("Password")], "كلمات المرور غير متطابقة"),
    Identity: Yup.string().required("رقم الهويه مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    taxRecord: Yup.string().required("السجل التجاري مطلوب"),
    InsuranceNumber: Yup.string().required("رقم الضريبي مطلوب"),
  });
  const handelSignUpForCompany = async (values) => {
    try {
      const data = await axios.post(
        `https://takhleesak.runasp.net/api/Register-company`,
        values
      );

      if (data.data.message === "تم تسجيل الدخول بنجاح") {
        toast("sucsses");
        window.location.href = "/SignIn";
      } else {
        toast(data.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
    validationSchema,
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
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error-message">{formik.errors.fullName}</div>
              )}
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
              {formik.touched.Email && formik.errors.Email && (
                <div className="error-message">{formik.errors.Email}</div>
              )}
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
              {formik.touched.taxRecord && formik.errors.taxRecord && (
                <div className="error-message">{formik.errors.taxRecord}</div>
              )}
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
              {formik.touched.InsuranceNumber &&
                formik.errors.InsuranceNumber && (
                  <div className="error-message">
                    {formik.errors.InsuranceNumber}
                  </div>
                )}
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
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="error-message">{formik.errors.phoneNumber}</div>
              )}
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

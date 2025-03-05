import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ships from "../ships.png";
import { Toaster } from "react-hot-toast";

const ConfirmPassword = () => {
  const SendCode = async (values) => {
    try {
      const response = await axios.post(
        "https://takhleesak.runasp.net/api/Reset-Password",
        {
          Code: values.Code,
          newPassword: values.newPassword,
          Confirm: values.Confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );

      toast.success(response.data.message);

      if (response.data.message == "تم إعادة تعيين كلمة المرور بنجاح") {

        setTimeout(()=>{

          window.location.href = "/SignIn";

        },1000)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const code = localStorage.getItem("Code");
    console.log(localStorage.getItem("Tokken"));

    console.log(code);
  }, []);

  const formik = useFormik({
    initialValues: {
      Code: "",
      newPassword: "",
      Confirm: "",
    },
    onSubmit: SendCode,
  });

  return (
    <>
      <Toaster />
      <img className="Signin-Background" src={ships} alt="" />

      <div className="reset-password-container">
        <div className="reset-password-form">
          <h2>رمز التحقق</h2>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="form-group">
              <input
                className="text-white"
                value={formik.values.Code}
                type="text"
                name="Code"
                placeholder="رمز التحقق"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Code && formik.errors.Code && (
                <div className="text-danger">{formik.errors.Code}</div>
              )}
            </div>
            <div className="form-group">
              <input
                className="text-white"
                value={formik.values.newPassword}
                type="password"
                name="newPassword"
                placeholder="كلمه المرور الجديده"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-danger">{formik.errors.newPassword}</div>
              )}
            </div>

            <div className="form-group">
              <input
                className="text-white"
                value={formik.values.Confirm}
                type="password"
                name="Confirm"
                placeholder="تأكيد كلمه المرور"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Confirm && formik.errors.Confirm && (
                <div className="text-danger">{formik.errors.Confirm}</div>
              )}
            </div>

            <button type="submit" className="reset-btn">
              تأكيد الكود
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;

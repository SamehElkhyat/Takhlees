import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./ResetPassword.css";
import ships from "./ships.png";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/Forget-Password`,
          {
            Email: values.Email,
          }
        );

        console.log(data.message);

        if (data.message == "تم إرسال الرسالة بنجاح") {
          localStorage.setItem("Tokken", data.state);
          localStorage.setItem("Code", data.data);
          toast.success(data.message);

          setTimeout(() => {
            window.location.href = "/ConfirmPassword";
          }, 1000);
        } else {
          toast.error(data.message || "حدث خطأ ما");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <img className="Signin-Background" src={ships} alt="" />

      <div className="reset-password-container">
        <div className="reset-password-form">
          <h2>إعادة تعيين كلمة المرور</h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="Email"
                placeholder="البريد الإلكتروني"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
              />
              {formik.touched.Email && formik.errors.Email && (
                <div className="error-message">{formik.errors.Email}</div>
              )}
            </div>

            <button type="submit" className="reset-btn" disabled={isLoading}>
              {isLoading ? "جاري المعالجة..." : "إعادة تعيين كلمة المرور"}
            </button>
          </form>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ships from "../ships.png";
import { Toaster } from "react-hot-toast";

const ConfirmPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Token, setToken] = useState(null);
  const [Code, setCode] = useState(null);

  const validationSchema = Yup.object({
    code: Yup.string()
      .required("الرمز مطلوب")
      .min(6, "يجب أن يكون الرمز 6 أرقام على الأقل"),
  });

  const SendCode = async (values) => {
    setIsLoading(true);
    try {
      console.log(Token);
      console.log(Code);

      const response = await axios.post(
        "https://takhleesak.runasp.net/api/VerifyCode",
        { code: values.code },
        { headers: { Authorization: `Bearer ${Token}` } }
      );
      console.log(response.data.message);
      console.log(Token);
    } catch (error) {
      toast("حدث خطأ في إعادة تعيين كلمة المرور");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Tokken");
    setToken(token);
    const code = localStorage.getItem("Code");
    setCode(code);
    console.log(code);
  }, []);

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
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
                value={formik.values.code}
                type="text"
                name="code"
                placeholder="رمز التحقق"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.code && formik.errors.code && (
                <div className="text-danger">{formik.errors.code}</div>
              )}
            </div>

            <button type="submit" className="reset-btn" disabled={isLoading}>
              {isLoading ? "جاري المعالجة..." : "تأكيد الكود"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ships from "../ships.png";

const ConfirmPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Token, setToken] = useState(null);
  const [Code, setCode] = useState(null);

  const validationSchema = Yup.object({
    code: Yup.string()
      .required("الرمز مطلوب")
      .min(6, "يجب أن يكون الرمز 6 أرقام على الأقل"),
  });


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
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        console.log(Token);
        console.log(Code);

        const response = await axios.post(
          "https://takhleesak.runasp.net/api/VerifyCode",
          {
            code: values.code,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        console.log(response.data.message);
        console.log(Token);
        

        if (response.data.message === "تم تأكيد الكود بنجاح") {
          toast(response.data.message);
        
          window.location.href = "/WaitingForData";
        } else {
          toast(response.data.message);
        }
      } catch (error) {
        toast("حدث خطأ في إعادة تعيين كلمة المرور");
      } finally{

        setIsLoading(false);
        console.log('error');
        
      }
    },
  });

  return (
    <>
      <img className="Signin-Background" src={ships} alt="" />

      <div className="reset-password-container">
        <div className="reset-password-form">
          <h2>رمز التحقق</h2>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="code"
                placeholder="رمز التحقق"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Code}
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

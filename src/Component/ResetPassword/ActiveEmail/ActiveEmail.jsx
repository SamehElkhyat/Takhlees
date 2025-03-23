import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ships from "../ships.png";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Tty } from "@mui/icons-material";

const ActiveEmail = () => {
  const [Token, setToken] = useState(null);
  const navigate = useNavigate();

  const SendCode = async (values) => {
 
     
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/VerifyCode`,
        {
          Code: values.Code,
          typeOfGenerate: Token,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      

      if (response.status == 200) {
        setTimeout(() => {
          switch (Token) {
            case "VerifyUserEmail":
              return navigate("/LandingPageForUsers");

            case "VerifyCompanyEmail":
              return navigate("/LandingPageForUsers");

            case "VerifyBrokerEmail":
              return navigate("/BrookersLandingPage");

            default:
              console.warn("Unknown user role:", data.data);
              return navigate("/");
          }
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Code: "",
    },
    onSubmit: SendCode,
  });
  useEffect(() => {
    setToken(localStorage.getItem("Role"));
  }, []);

  return (
    <>
      <Toaster />
      <img className="Signin-Background" src={ships} alt="" />

      <div className="reset-password-container">
        <div className="reset-password-form">
          <h2>تفعيل الحساب</h2>

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
            <button type="submit" className="reset-btn">
              تأكيد الكود
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ActiveEmail;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import ships from "../ships.png";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { eventEmitter } from "../../eventEmitter";

const ActiveEmail = () => {
  const [Token, setToken] = useState(null);
  const navigate = useNavigate();

  const SendCode = async (values) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/VerifyCode`,
        {
          Code: values.Code,
          typeOfGenerate: "VerifyLogin",
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      if (data.message == "تم تأكيد الكود بنجاح") {
        eventEmitter.emit("dataUpdated");
        setInterval(() => {
          switch (data.data) {
            case "User":
            case "Company":
              return (window.location.href = "/LandingPageForUsers");
            case "Admin":
              return (window.location.href = "/LandingPageAdmin");

            case "Account":
              return (window.location.href = "/AccountantLandingPage");

            case "CustomerService":
              return (window.location.href = "/LandingPageCustomeService");

            case "Broker":
              return (window.location.href = "/BrookersLandingPage");

            case "Manager":
              return (window.location.href = "/LandingPageManger");

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
      <Toaster />
    </>
  );
};

export default ActiveEmail;

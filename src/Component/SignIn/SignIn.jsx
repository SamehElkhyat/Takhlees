import React, { useState } from "react";
import "./SignIn.css";
import * as Yup from "yup";
import SignInBackground from "../SignIn/ships.png";
import axios from "axios";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

const SignIn = () => {
  const navigate = useNavigate();
  const [Isloading, setIsloading] = useState(false);

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    Password: Yup.string().required("تأكيد كلمة المرور مطلوب"),
  });

  async function handelesignin(values) {
    setIsloading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Login`,
        {
          Email: values.Email,
          Password: values.Password,
        },
        {
          withCredentials: true,
        }
      );

      if (data.message == "تم تسجيل الدخول بنجاح") {
        console.log(data.message);

        toast.success(data.message);
        setIsloading(false);
        setInterval(() => {
          switch (data.data) {
            case "User":
            case "Company":
              return navigate("/LandingPageForUsers");

            case "Admin":
              return navigate("/LandingPageAdmin");

            case "Account":
              return navigate("/AccountantLandingPage");

            case "CustomerService":
              return navigate("/LandingPageCustomeService");

            case "Broker":
              return navigate("/BrookersLandingPage");

            case "Manager":
              return navigate("/LandingPageManger");

            default:
              console.warn("Unknown user role:", data.data);
              return navigate("/");
          }
        }, 1000);
      } else {
        toast.error(data.message);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      toast.error(error.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema,
    onSubmit: handelesignin,
  });

  return (
    <>
      <div className="background-img-frame"></div>
      <img className="Signin-Background" src={SignInBackground} alt="" />
      <div className="dad-SignIn-Frame w-100 h-100">
        <div className="SignIn-Frame"></div>
      </div>

      <div className="sign-in-container">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-group-company">
            <hr />
            <input
              value={formik.values.Email}
              onChange={formik.handleChange}
              placeholder="البريد الالكتروني"
              type="email"
              id="Email"
              name="Email"
              required
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="error-message">{formik.errors.Email}</div>
            )}
          </div>
          <div className="form-group-company">
            <hr />
            <input
              value={formik.values.Password}
              onChange={formik.handleChange}
              placeholder="ادخل كلمه السر"
              type="Password"
              id="Password"
              name="Password"
              required
            />
            {formik.touched.Password && formik.errors.Password && (
              <div className="error-message">{formik.errors.Password}</div>
            )}
          </div>
          <p>
            <Link className="to-ResetPassword" to="/ResetPassword">
              هل نسيت كلمة السر؟
            </Link>
          </p>

          <div className="button-group">
            {Isloading == true ? (
              <>
                <Button
                  variant=""
                  className="bg-black d-flex text-white justify-content-end"
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2 text-danger d-flex justify-content-end mt-1"
                  />
                  جارٍ تنفيذ الطلب...
                </Button>
              </>
            ) : (
              <>
                <button className="signin-button" type="submit">
                  تسجيل الدخول
                </button>
              </>
            )}
            <p>
              <Link className="to-SignUp" to="/IntorSignUp">
                انشاء حساب جديد
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;

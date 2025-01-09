import React from "react";
import "./SignUp.css";
import SignUpBackground from "../SignIn/ships.png"; // You might want to use a different image or path

const SignUp = () => {
  return (
    <>
      <div className="signup-background-img-frame"></div>
      <img className="signup-Background" src={SignUpBackground} alt="" />
      <div className="dad-signup-Frame w-100 h-100">
        <div className="signup-Frame"></div>
      </div>

      <div className="sign-Up-container">
        <h2>انشاء حساب للافراد</h2>
        <form>
          <div className="SignUp-form-group col-md-6">
            <label htmlFor="name">الاسم:</label>
            <input
              placeholder="الاسم كامل"
              type="name"
              id="name"
              name="name"
              required
            />

            <label htmlFor="email">البريد الالكتروني:</label>
            <input
              placeholder="البريد الالكتروني"
              type="ُemail"
              id="ُemail"
              name="ُemail"
              required
            />

            <label htmlFor="phone">رقم الهاتف:</label>
            <input
              placeholder="رقم الهاتف"
              type="phone"
              id="phone"
              name="phone"
              required
            />
          </div>

          <div className="SignUp-form-group col-md-6">
            <label htmlFor="password">كلمه السر:</label>
            <input
              placeholder=" كلمه السر"
              type="password"
              id="password"
              name="password"
              required
            />

            <label htmlFor="email"> تاكيد كلمه السر:</label>
            <input
              placeholder="تاكيد كلمه السر:"
              type="password"
              id="password"
              name="password"
              required
            />

            <label htmlFor="number">رقم الهويه:</label>
            <input
              placeholder="رقم الهويه"
              type="number"
              id="number"
              name="number"
              required
            />
          </div>
        </form>

        <div className="signup-button-group">
          <button className="register-button" type="submit">
            انشاء الحساب
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;

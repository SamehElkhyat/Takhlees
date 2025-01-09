import React from 'react';
import './SignInForCompany.css';
import SignInBackground from '../SignIn/ships.png'

const SignIn = () => {


  return <>
  <div className="background-img-frame"></div>
  <img className='Signin-Background' src={SignInBackground} alt="" />
  <div className="dad-SignIn-Frame w-100 h-100"><div className="SignIn-Frame"></div></div>

    <div className="sign-in-container">
      <h2> تسجيل الدخول للأعمال</h2>
      <form >
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
          placeholder='ادخل البريد الالكتروني'
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            placeholder='ادخل كلمه السر'
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
   

      </form>

      <div className="button-group">
      <button className='signin-button' type="submit">تسجيل الدخول</button>
      <button className='register-button' type="submit">انشاء حساب</button>
      </div>
    </div>

  </>

};

export default SignIn;

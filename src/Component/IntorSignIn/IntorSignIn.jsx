import React from 'react';
import './IntorSignIn.css';
import SignInBackground from '../SignIn/ships.png'

const IntorSignUp = () => {


  return <>
  <div className="Intro-background-img-frame"></div>
  <img className='Intro-Signin-Background' src={SignInBackground} alt="" />
  <div className="dad-Intro-SignIn-Frame w-100 h-100"><div className="Intro-SignIn-Frame"></div></div>

    <div className="Intro-sign-in-container">

    <h2 >تسجيل الدخول </h2>
      
      <div className="Tow-card">

      <div className="Comapnies">
        <h4>شركات</h4>
      </div>
      <div className="Personal">
        <h4>شركات</h4>

      </div>
      
      </div>

    </div>

  </>

};

export default IntorSignUp;

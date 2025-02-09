import React from 'react';
import './IntorSignUp.css';
import SignInBackground from '../SignIn/ships.png'
import { Link } from 'react-router-dom';

const IntorSignUp = () => {


  return <>
  <div className="Intro-background-img-frame"></div>
  <img className='Intro-Signin-Background' src={SignInBackground} alt="" />
  <div className="dad-Intro-SignIn-Frame w-100 h-100"><div className="Intro-SignIn-Frame"></div></div>

    <div className="Intro-sign-in-container">

    <h2 > انشاء حساب</h2>
    <div className="Tow-card">
      <Link className="Comapnies" to='/SignUpForCompany'>
      <div className="">
             <h4>أعمال</h4>

      </div>
      </Link>
      <Link className="Personal" to='/SignUp'>

      <div className="">
        <h4>أفراد</h4>

      </div>
      </Link>

      <Link className="mokhalees" to='/SignUpForMokhalseen'>

<div className="">
  <h4>مخلص</h4>

</div>
</Link>

      </div>

    </div>

  </>

};

export default IntorSignUp;

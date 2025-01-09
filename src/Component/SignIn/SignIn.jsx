import React from 'react';
import './SignIn.css';
import SignInBackground from '../SignIn/ships.png'
import axios from 'axios';
import { useFormik } from 'formik';

const SignIn = () => {

  async function handelesignin(values){

    try {
      console.log(values);
      
      const users = await axios.post(`https://takhleesak.runasp.net/api/Login`,values)
      console.log(users);
    } catch (error) {
      console.log(error);

    }

    
  } 


  let formik = useFormik({
    initialValues:{
      phoneNumber:'',
      password:''
    },
    onSubmit: handelesignin
  });
  return <>
  <div className="background-img-frame"></div>
  <img className='Signin-Background' src={SignInBackground} alt="" />
  <div className="dad-SignIn-Frame w-100 h-100"><div className="SignIn-Frame"></div></div>

    <div className="sign-in-container">
      <h2 >تسجيل الدخول للأفراد</h2>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="phoneNumber">رقم الهاتف:</label>
          <input
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          placeholder='رقم الهاتف'
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            value={formik.values.Password}
            onChange={formik.handleChange}
            placeholder='ادخل كلمه السر'
            type="password"
            id="Password"
            name="Password"
            required
          />


        </div>
  
        <div className="button-group">
      <button className='signin-button' type="submit">تسجيل الدخول</button>
      <button className='register-button' type="submit">انشاء حساب</button>
      </div>

      </form>

    
    </div>

  </>

};

export default SignIn;

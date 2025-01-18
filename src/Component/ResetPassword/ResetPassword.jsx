import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ResetPassword.css';
import ships from './ships.png'

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email('بريد إلكتروني غير صالح')
      .required('البريد الإلكتروني مطلوب'),
    
  });

  const formik = useFormik({
    initialValues: {
      Email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('https://takhleesak.runasp.net/api/Forget-Password', {
          Email: values.Email,
        });

        if (response.data.state) {
          toast('تم ارسال الرمز المرور الخاص بك');
        } else {
          toast.error(response.data.message || 'حدث خطأ ما');
        }
      } catch (error) {
        toast.error('حدث خطأ في ارسال الرمز المرور الخاص بك');
      } finally {
        setIsLoading(false);
      }
    }
  });

  return <>
          <img className="Signin-Background" src={ships} alt="" />

  <div className="reset-password-container">
      <div className="reset-password-form">
        <h2>إعادة تعيين كلمة المرور</h2>
        
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="Email"
              placeholder="البريد الإلكتروني"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="error-message">{formik.errors.Email}</div>
            )}
          </div>

          <button 
            type="submit" 
            className="reset-btn"
            disabled={isLoading}
          >
            {isLoading ? 'جاري المعالجة...' : 'إعادة تعيين كلمة المرور'}
          </button>
        </form>
      </div>
    </div>  
  </>
  
  
};

export default ResetPassword; 
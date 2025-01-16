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
    email: Yup.string()
      .email('بريد إلكتروني غير صالح')
      .required('البريد الإلكتروني مطلوب'),
    code: Yup.string()
      .required('الرمز مطلوب')
      .min(6, 'يجب أن يكون الرمز 6 أرقام على الأقل'),
    newPassword: Yup.string()
      .required('كلمة المرور الجديدة مطلوبة')
      .min(8, 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'),
    confirmPassword: Yup.string()
      .required('تأكيد كلمة المرور مطلوب')
      .oneOf([Yup.ref('newPassword')], 'كلمات المرور غير متطابقة')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('YOUR_API_ENDPOINT/reset-password', {
          email: values.email,
          code: values.code,
          newPassword: values.newPassword
        });

        if (response.data.success) {
          toast.success('تم تغيير كلمة المرور بنجاح');
          // Redirect to login page or handle success
        } else {
          toast.error(response.data.message || 'حدث خطأ ما');
        }
      } catch (error) {
        toast.error('حدث خطأ في إعادة تعيين كلمة المرور');
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
              name="email"
              placeholder="البريد الإلكتروني"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
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
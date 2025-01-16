import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ships from '../ships.png'
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetThePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
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
          toast.success('تم ارسال رساله الي البريد الالكتروني');
          window.location.href = "/ConfirmPassword";
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
              type="password"
              name="newPassword"
              placeholder="كلمة المرور الجديدة"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="error-message">{formik.errors.newPassword}</div>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="تأكيد كلمة المرور"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="error-message">{formik.errors.confirmPassword}</div>
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

export default ResetThePassword; 
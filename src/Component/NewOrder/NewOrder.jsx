import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';

const NewOrderForm = () => {
  // إرسال البيانات إلى الـ API
  const handleOrder = async (values) => {
    const formData = new FormData();

    // أضف الحقول النصية إلى FormData
    formData.append('Location', values.location);
    values.orderType.forEach((order, index) => {
      formData.append(`orderType[${index}][Number]`, order.Number);
      formData.append(`orderType[${index}][typeOrder]`, order.typeOrder);
      formData.append(`orderType[${index}][Size]`, order.Size);
      if (order.typeOrder !== 'حاويه') {
        formData.append(`orderType[${index}][Weight]`, order.Weight);
      }
    });

    // أضف الملفات إلى FormData
    values.uploadFile.forEach((file) => {
      formData.append('uploadFile', file);
    });

    try {
      const response = await axios.post('https://user.runasp.net/api/New-Order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('Tokken')}`,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(values);
    
  };

  let formik = useFormik({
    initialValues: {
      location: '',
      orderType: [{ Number: '', typeOrder: '', Weight: '', Size: '' }],
      uploadFile: [], // ملفات مرفقة
    },
    onSubmit: handleOrder,
  });

  // إضافة طلب جديد
  const addOrder = () => {
    formik.setFieldValue('orderType', [
      ...formik.values.orderType,
      { Number: '', typeOrder: '', Weight: '', Size: '' },
    ]);
  };

  // إزالة طلب
  const removeOrder = (index) => {
    const updatedOrderType = formik.values.orderType.filter((_, i) => i !== index);
    formik.setFieldValue('orderType', updatedOrderType);
  };

  // تحديث الملفات
  const handleFileChange = (e) => {
    formik.setFieldValue('uploadFile', [...formik.values.uploadFile, ...e.target.files]);
  };

  return (
    <div className="container text-center d-flex flex-column gap-3 mt-5">
      <h3>طلب جديد</h3>
      <Form onSubmit={formik.handleSubmit}>
        {/* موقع الطلب */}
        <Form.Group controlId="orderLocation">
          <Form.Label>موقع الطلب</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل موقع الطلب"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="orderLocation">
          <Form.Label>رقم البوليصه</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل موقع الطلب"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </Form.Group>

        {/* الحقول الديناميكية */}
        <h5>تفاصيل الطلبات</h5>
        {formik.values.orderType.map((order, index) => (
          <div key={index} className="border p-3 mb-3">
            <Form.Group controlId={`orderType[${index}][typeOrder]`}>
              <Form.Label>نوع الطلب</Form.Label>
              <Form.Control
                as="select"
                value={order.typeOrder}
                onChange={(e) => {
                  const updatedOrders = [...formik.values.orderType];
                  updatedOrders[index].typeOrder = e.target.value;

                  // إزالة قيمة الوزن إذا كان نوع الطلب "حاوية"
                  if (e.target.value === 'حاويه') {
                    updatedOrders[index].Weight = '';
                  }

                  formik.setFieldValue('orderType', updatedOrders);
                }}
              >
                <option value="">اختر نوع الطلب</option>
                <option value="طبليه">طبليه</option>
                <option value="حاويه">حاويه</option>
                <option value="وزن">وزن</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId={`orderType[${index}][Number]`}>
              <Form.Label>عدد</Form.Label>
              <Form.Control
                type="number"
                value={order.Number}
                onChange={(e) => {
                  const updatedOrders = [...formik.values.orderType];
                  updatedOrders[index].Number = e.target.value;
                  formik.setFieldValue('orderType', updatedOrders);
                }}
              />
            </Form.Group>

            {/* حقل الوزن يظهر فقط إذا لم يكن نوع الطلب "حاوية" */}
            {order.typeOrder !== 'حاويه' && (
              <Form.Group controlId={`orderType[${index}][Weight]`}>
                <Form.Label>الوزن</Form.Label>
                <Form.Control
                  type="number"
                  value={order.Weight}
                  onChange={(e) => {
                    const updatedOrders = [...formik.values.orderType];
                    updatedOrders[index].Weight = e.target.value;
                    formik.setFieldValue('orderType', updatedOrders);
                  }}
                />
              </Form.Group>
            )}

            {order.typeOrder === 'حاويه' && (
              <Form.Group controlId={`orderType[${index}][Size]`}>
                <Form.Label>الحجم</Form.Label>
                <Form.Control

                type="text"
                value={order.Size}
                onChange={(e) => {
                  const updatedOrders = [...formik.values.orderType];
                  updatedOrders[index].Size = e.target.value;
                  formik.setFieldValue('orderType', updatedOrders);
                }}
              />
            </Form.Group>
            )}

            <Button variant="danger" className="mt-2" onClick={() => removeOrder(index)}>
              حذف الطلب

            </Button>
          </div>
        ))}

        <Button variant="secondary" onClick={addOrder}>
          إضافة طلب جديد
        </Button>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>سجل التجاري</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>السجل الضريبي</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>البوليصه</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>شهاده المنشأ</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>ملفات اخري <span className='text-danger'>(اي رخص او شهادات تتعلق بالطلب)</span> </Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>

        </Form.Group>

        {/* إرسال الطلب */}
        <Button variant="primary" type="submit" className="mt-4">
          إرسال الطلب
        </Button>
      </Form>
    </div>
  );
};

export default NewOrderForm;

import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const NewOrderForm = () => {
  const [Tokeen, setTokeen] = useState(null)


  // إرسال البيانات إلى الـ API
  const handleOrder = async (values) => {
    const formData = new FormData();

    // أضف الحقول النصية إلى FormData
    formData.append("Location", values.location);
    formData.append("numberOfLicense", values.numberOfLicense);

    values.numberOfTypeOrders.forEach((order, index) => {
      formData.append(`numberOfTypeOrders[${index}][Number]`, order.Number);
      formData.append(
        `numberOfTypeOrders[${index}][typeOrder]`,
        order.typeOrder
      );
      formData.append(`numberOfTypeOrders[${index}][Size]`, order.Size);
      if (order.typeOrder !== "حاويه") {
        formData.append(`numberOfTypeOrders[${index}][Weight]`, order.Weight);
      }
    });

    values.uploadFile.forEach((file) => {
      formData.append("uploadFile", file);
    });

    try {
      const response = await axios.post(
        "https://user.runasp.net/api/New-Order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Tokeen}`,
          },
        }
      );
      ;
      toast.success(response.data.message);
      window.location.href = "/Orders";
    } catch (error) {
      console.log(
        error
      );
      
      toast.error("error 404", {
        style: {
          fontWeight: "700",
        },
      });
    }
  };

  let formik = useFormik({
    initialValues: {
      location: "",
      numberOfLicense: "",
      numberOfTypeOrders: [{ Number: "", typeOrder: "", Weight: "", Size: "" }],
      uploadFile: [], // ملفات مرفقة
    },
    onSubmit: handleOrder,
  });

  // إضافة طلب جديد
  const addOrder = () => {
    formik.setFieldValue("numberOfTypeOrders", [
      ...formik.values.numberOfTypeOrders,
      { Number: "", typeOrder: "", Weight: "", Size: "" },
    ]);
  };

  // إزالة طلب
  const removeOrder = (index) => {
    const updatednumberOfTypeOrders = formik.values.numberOfTypeOrders.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("numberOfTypeOrders", updatednumberOfTypeOrders);
  };

  // تحديث الملفات
  const handleFileChange = (e) => {
    formik.setFieldValue("uploadFile", [
      ...formik.values.uploadFile,
      ...e.target.files,
    ]);
  };

  useEffect(() => {
    const GetTokken=localStorage.getItem("Tokken")
    setTokeen(GetTokken)    
  }, [])
  

  return (
    <div className="container text-center d-flex flex-column gap-3 mt-5">
      <Toaster
        className="bg-dark position-absolute"
        position="top-center"
        reverseOrder={false}
      />
      <h3>طلب جديد</h3>
      <Form onSubmit={formik.handleSubmit}>
        {/* موقع الطلب */}
        <Form.Group controlId="location">
          <Form.Label>موقع الطلب</Form.Label>
          <Form.Control
            type="text"
            placeholder="أدخل موقع الطلب"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="numberOfLicense">
          <Form.Label>رقم البوليصه</Form.Label>
          <Form.Control
            type="text"
            placeholder="رقم الوليصه"
            name="numberOfLicense"
            value={formik.values.numberOfLicense}
            onChange={formik.handleChange}
          />
        </Form.Group>

        {/* الحقول الديناميكية */}
        <h5>تفاصيل الطلبات</h5>
        {formik.values.numberOfTypeOrders.map((order, index) => (
          <div key={index} style={{}} className="border p-3 mb-3">
            <Form.Group controlId={`numberOfTypeOrders[${index}][typeOrder]`}>
              <Form.Label>نوع الطلب</Form.Label>
              <Form.Control
                as="select"
                value={order.typeOrder}
                onChange={(e) => {
                  const updatedOrders = [...formik.values.numberOfTypeOrders];
                  updatedOrders[index].typeOrder = e.target.value;

                  // إزالة قيمة الوزن إذا كان نوع الطلب "حاوية"
                  if (e.target.value === "حاويه") {
                    updatedOrders[index].Weight = "";
                  }

                  formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                }}
              >
                <option value="">اختر نوع الطلب</option>
                <option value="طبليه">طبليه</option>
                <option value="حاويه">حاويه</option>
                <option value="وزن">وزن</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId={`numberOfTypeOrders[${index}][Number]`}>
              <Form.Label>عدد</Form.Label>
              <Form.Control
                type="number"
                value={order.Number}
                onChange={(e) => {
                  const updatedOrders = [...formik.values.numberOfTypeOrders];
                  updatedOrders[index].Number = e.target.value;
                  formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                }}
              />
            </Form.Group>

            {/* حقل الوزن يظهر فقط إذا لم يكن نوع الطلب "حاوية" */}
            {order.typeOrder !== "حاويه" && (
              <Form.Group controlId={`numberOfTypeOrders[${index}][Weight]`}>
                <Form.Label>الوزن</Form.Label>
                <Form.Control
                  type="number"
                  value={order.Weight}
                  onChange={(e) => {
                    const updatedOrders = [...formik.values.numberOfTypeOrders];
                    updatedOrders[index].Weight = e.target.value;
                    formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                  }}
                />
              </Form.Group>
            )}

            {order.typeOrder === "حاويه" && (
              <Form.Group controlId={`numberOfTypeOrders[${index}][Size]`}>
                <Form.Label>الحجم</Form.Label>
                <Form.Control
                  type="text"
                  value={order.Size}
                  onChange={(e) => {
                    const updatedOrders = [...formik.values.numberOfTypeOrders];
                    updatedOrders[index].Size = e.target.value;
                    formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                  }}
                />
              </Form.Group>
            )}

            <Button
              variant="danger"
              className="mt-2"
              onClick={() => removeOrder(index)}
            >
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
          <Form.Label>
            ملفات اخري{" "}
            <span className="text-danger">(اي رخص او شهادات تتعلق بالطلب)</span>{" "}
          </Form.Label>
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

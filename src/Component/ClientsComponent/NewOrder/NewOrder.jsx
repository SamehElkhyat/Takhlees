import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Form, InputGroup, FormControl, Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";


const NewOrderForm = () => {

  const [IsLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    location: Yup.string().required("موقع الطلب مطلوب"),
    numberOfLicense: Yup.string()
      .required("رقم البوليصة مطلوب")
      .matches(/^\d+$/, "يجب أن يكون رقمًا فقط"),
    Notes: Yup.string()
    .required("الملاحظات مطلوبه"),
    numberOfTypeOrders: Yup.array()
      .of(
        Yup.object().shape({
          Number: Yup.number()
            .typeError("يجب إدخال عدد صحيح")
            .positive("يجب أن يكون العدد أكبر من 0")
            .required("عدد الطلب مطلوب"),
          typeOrder: Yup.string().required("نوع الطلب مطلوب"),
          Weight: Yup.number()
            .when("typeOrder", {
              is: (val) => val !== "حاويه",
              then: (schema) =>
                schema
                  .typeError("يجب إدخال وزن صحيح")
                  .positive("يجب أن يكون الوزن أكبر من 0")
                  .required("الوزن مطلوب"),
              otherwise: (schema) => schema.nullable(),
            }),
          Size: Yup.string().when("typeOrder", {
            is: "حاويه",
            then: (schema) => schema.required("حجم الحاوية مطلوب"),
            otherwise: (schema) => schema.nullable(),
          }),
        })
      )
      .min(1, "يجب إضافة طلب واحد على الأقل"),

      uploadFile: Yup.array()
        .required("يجب رفع كل الملفات") // تأكيد وجود ملفات
        .max(5, "ghdl;k vtu h;ev lk `g;") // يضمن وجود ملف واحد على الأقل
        .test("fileSize", "أحد الملفات يتجاوز الحجم المسموح (5MB)", (files) =>
          files && files.length ? files.every((file) => file.size <= 5 * 1024 * 1024) : false
        )
        .test("fileType", "نوع الملف غير مدعوم", (files) =>
          files && files.length
            ? files.every((file) =>
                ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(file.type)
              )
            : false
        ),
  });


  const handleOrder = async (values) => {

    setIsLoading(true)
    const formData = new FormData();
    

    // أضف الحقول النصية إلى FormData
    formData.append("Location", values.location);
    formData.append("numberOfLicense", values.numberOfLicense);
    formData.append("Notes", values.Notes);
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

    console.log(values);

    

    try {
      const response = await axios.post(
        "https://user.runasp.net/api/New-Order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      
      toast.success(response.data.message);

      setIsLoading(false)

      setTimeout(() => {

        window.location.href = "/Orders";

      }, 1000);
    } catch (error) {
      setIsLoading(false)
      console.log(error);

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
      Notes: "",
      numberOfTypeOrders: [{ Number: "", typeOrder: "", Weight: "", Size: "" }],
      uploadFile: [],
    },
    validationSchema,
    onSubmit:handleOrder,
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
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    let newFiles = Array.from(e.target.files);

    // تصفية الملفات غير المسموحة
    newFiles = newFiles.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`نوع الملف غير مدعوم: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`حجم الملف ${file.name} يتجاوز 5MB`);
        return false;
      }
      return true;
    });

    // تحديث الملفات المقبولة فقط
    formik.setFieldValue("uploadFile", [
      ...formik.values.uploadFile,
      ...newFiles,
    ]);
  };
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
            as="select"
            placeholder="أدخل موقع الطلب"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          >
            <option value="">اختر موقع الطلب</option>
            <option value="ميناء الملك عبد العزيز بالدمام">
              ميناء الملك عبد العزيز بالدمام
            </option>
            <option value="ميناء الملك فهد الصناعي بينبع">
              ميناء الملك فهد الصناعي بينبع
            </option>
            <option value="ميناء الجبيل التجاري">ميناء الجبيل التجاري</option>
            <option value="ميناء الملك فهد الصناعي بالجبيل">
              ميناء الملك فهد الصناعي بالجبيل
            </option>
            <option value="ميناء ينبع التجاري">ميناء ينبع التجاري</option>
            <option value="ميناء جازان">ميناء جازان</option>
            <option value="ميناء رأس تنورة">ميناء رأس تنورة</option>
            <option value="ميناء رأس الخير">ميناء رأس الخير</option>
            <option value="الرياض">الرياض</option>
            <option value="جدة مطار الملك عبد العزيز الدولي">
              جدة (مطار الملك عبد العزيز الدولي)
            </option>
            <option value="الدمام">الدمام</option>
            <option value="المدينةالمنورة">المدينة المنورة</option>
            <option value="الطائف">الطائف</option>
            <option value="الأحساء">الأحساء</option>
            <option value="القيصومة">القيصومة</option>
            <option value="رفحاء">رفحاء</option>
            <option value="عرعر">عرعر</option>
            <option value="طريف">طريف</option>
            <option value="القريات">القريات</option>
            <option value="الجوف">الجوف</option>
            <option value="حائل">حائل</option>
            <option value="القصيم">القصيم</option>
            <option value="الدوادمي">الدوادمي</option>
            <option value="وادي الدواسر">وادي الدواسر</option>
            <option value="بيشة">بيشة</option>
            <option value="الباحة">الباحة</option>
            <option value="نجران">نجران</option>
            <option value="شرورة">شرورة</option>
            <option value="أبها">أبها</option>
            <option value="جازان">جازان</option>
            <option value="ينبع">ينبع</option>
            <option value="الوجه">الوجه</option>
            <option value="العلا">العلا</option>
            <option value="تبوك">تبوك</option>
            <option value="نيوم">نيوم</option>
          </Form.Control>
          {formik.touched.location && formik.errors.location && (
              <div className="error-message">{formik.errors.location}</div>
            )}
        </Form.Group>

        <Form.Group controlId="numberOfLicense">
          <Form.Label>رقم البوليصه</Form.Label>
          <Form.Control
            type="number"
            placeholder="رقم الوليصه"
            name="numberOfLicense"
            value={formik.values.numberOfLicense}
            onChange={formik.handleChange}
          />
              {formik.touched.numberOfLicense && formik.errors.numberOfLicense && (
              <div className="error-message">{formik.errors.numberOfLicense}</div>
            )}

        </Form.Group>

        <Form.Group controlId="Notes">
          <Form.Label>ملاحظات الطلب</Form.Label>
          <Form.Control
            type="text"
            placeholder="ملاحظات الطلب"
            name="Notes"
            value={formik.values.Notes}
            onChange={formik.handleChange}
          />
                     {formik.touched.Notes && formik.errors.Notes && (
              <div className="error-message">{formik.errors.Notes}</div>
            )}

        </Form.Group>
     

        {/* الحقول الديناميكية */}
        <h5>تفاصيل الطلبات</h5>
        {formik.values.numberOfTypeOrders.map((order, index) => (
          <div key={index} className="border p-3 mb-3">
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
              </Form.Control>

            </Form.Group>
            {formik.touched.numberOfTypeOrders?.[index]?.typeOrder &&
    formik.errors.numberOfTypeOrders?.[index]?.typeOrder && (
      <div className="text-danger">
        {formik.errors.numberOfTypeOrders[index].typeOrder}
      </div>
    )}

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
                          {formik.touched.numberOfTypeOrders?.[index]?.Number &&
    formik.errors.numberOfTypeOrders?.[index]?.Number && (
      <div className="text-danger">
        {formik.errors.numberOfTypeOrders[index].Number}
      </div>
    )}
  
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
                    {formik.touched.numberOfTypeOrders?.[index]?.Weight &&
    formik.errors.numberOfTypeOrders?.[index]?.Weight && (
      <div className="text-danger">
        {formik.errors.numberOfTypeOrders[index].Weight}
      </div>
    )}
              </Form.Group>
            )}

            {order.typeOrder === "حاويه" && (
              <Form.Group controlId={`numberOfTypeOrders[${index}][Size]`}>
                <Form.Label>الحجم</Form.Label>

                <Form.Control
                  as="select"
                  value={order.Size}
                  onChange={(e) => {
                    const updatedOrders = [...formik.values.numberOfTypeOrders];
                    updatedOrders[index].Size = e.target.value;
                    formik.setFieldValue("numberOfTypeOrders", updatedOrders);
                  }}
                >
                  <option value="">اختر حجم الحاويه</option>
                  <option value="20">20</option>
                  <option value="40">40</option>
                </Form.Control>
                {formik.touched.numberOfTypeOrders?.[index]?.Size &&
    formik.errors.numberOfTypeOrders?.[index]?.Size && (
      <div className="text-danger">
        {formik.errors.numberOfTypeOrders[index].Size}
      </div>
    )}
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
  {formik.touched.uploadFile && formik.errors.uploadFile && (
    <div className="error-message text-danger mt-2">{formik.errors.uploadFile}</div>
  )}
              
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>السجل الضريبي</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
  {formik.touched.uploadFile && formik.errors.uploadFile && (
    <div className="error-message text-danger mt-2">{formik.errors.uploadFile}</div>
  )}
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>البوليصه</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
  {formik.touched.uploadFile && formik.errors.uploadFile && (
    <div className="error-message text-danger mt-2">{formik.errors.uploadFile}</div>
  )}
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>شهاده المنشأ</Form.Label>
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
  {formik.touched.uploadFile && formik.errors.uploadFile && (
    <div className="error-message text-danger mt-2">{formik.errors.uploadFile}</div>
  )}
        </Form.Group>

        <Form.Group controlId="orderFiles" className="mt-4">
          <Form.Label>
            ملفات اخري
            <span className="text-danger">
              (اي رخص او شهادات تتعلق بالطلب)
            </span>{" "}
          </Form.Label>
  {formik.touched.uploadFile && formik.errors.uploadFile && (
    <div className="error-message text-danger mt-2">{formik.errors.uploadFile}</div>
  )}
          <InputGroup>
            <FormControl type="file" multiple onChange={handleFileChange} />
          </InputGroup>
        </Form.Group>

        {IsLoading ? <> <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2 "
                      />
                      جارٍ التحميل...
                    </>:<>
                    <Button variant="primary" type="submit" className="mt-4">
          إرسال الطلب
        </Button>
                    </>}

      
      </Form>
    </div>
  );
};

export default NewOrderForm;

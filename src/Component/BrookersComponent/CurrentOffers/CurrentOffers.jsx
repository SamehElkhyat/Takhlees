import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function CurrentOffers() {
  const [date, setDate] = useState();
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
  const [CustomersOrders, setCustomersOrders] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [OrderId, setOrderId] = useState(null);
  const [DecodedTokken, setDecodedTokken] = useState();
  const [Bar, setBar] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [Tracking, setTracking] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [Step1, setStep1] = useState(false);
  const [Step2, setStep2] = useState(false);

  const steps = [
    "Select master blaster campaign settings",
    "Create an ad group",
    "Create an ad",
  ];
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleShowBar = (items, orderdid) => {
    setOrderId(orderdid);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const SendIdSuccses = async (ID) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "true",
        },
        {
          withCredentials: true,
        }
      );

      toast("تم التنفيذ");
      getCustomersOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  // sadsssssssssssssssssssssssssss//
  const SendIdCancel = async (ID) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "false",
        },
        {
          withCredentials: true,
        }
      );
      toast("تم الالغاء");
      getCustomersOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const GetValueCurrentOffers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Order-Requests`,
        {
          withCredentials: true,
        }
      );
      setOrders2(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const GetTrackingstep1 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Trace-Order-Broker`,
        {
          newOrderId: selectedOrder,
          step1: "step1",
          step2: null,
          step3: null,
        },
        {
          withCredentials: true,
        }
      );
      setStep1(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const GetTrackingstep2 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Trace-Order-Broker`,
        {
          newOrderId: selectedOrder,
          step1: "step1",
          step2: "step2",
          step3: null,
        },
        {
          withCredentials: true,
        }
      );
      setStep2(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const GetTrackingstep3 = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Trace-Order-Broker`,
        {
          newOrderId: selectedOrder,
          step1: "step1",
          step2: "step2",
          step3: "step3",
        },
        {
          withCredentials: true,
        }
      );
      setTracking(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getValue = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Current-Offers`,
        {
          withCredentials: true,
        }
      );
      setOrders(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getCustomersOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Order-Transfer-From-CustomerService`,
        {
          withCredentials: true,
        }
      );
      setCustomersOrders(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      formik.setFieldValue("formFile", e.target.files[0]); // تعيين الملف مباشرة
    }
  };

  const SendFile = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("formFile", values.formFile); // تعيين الملف الصحيح
    formData.append("Notes", values.Notes);
    formData.append("newOrderId", OrderId);
    // التأكد من إرسال OrderId الصحيح

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Notes-From-CustomerService`,
        formData,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      toast.success("تم تقديم الملاحظات بنجاح");
      setBar(null);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      Notes: "",
      formFile: "",
    },
    onSubmit: SendFile,
  });
  useEffect(() => {
    getCustomersOrders();
    GetValueCurrentOffers();
    getValue();
    const t = moment();
    setDate(new Date().toLocaleString());
  }, []);

  return (
    <>
      <div className="container mt-5   text-center">
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
          className="mb-5 font-weight-900 display-4 text-black"
        >
          العروض القائمه
        </h1>

        <h3
          className="mb-4 text-green"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
          }}
        >
          قائمة العروض المقدمة
        </h3>

        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="mt-2" variant="primary">
            بحث
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
              {DecodedTokken ? (
                <>
                  {DecodedTokken.Role === "Admin" ? (
                    <>
                      <th>بريد المخلص</th>
                      <th>اسم المخلص</th>
                    </>
                  ) : (
                    <>
                      <th>الحالة</th>
                    </>
                  )}
                </>
              ) : (
                <>
                  <th>الحالة</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => {
                return searchTerm === "" || order.id.includes(searchTerm);
              })
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.date}</td>
                  <td>{order.location}</td>
                  <td>{order.id}</td>

                  {DecodedTokken ? (
                    <>
                      {DecodedTokken.Role === "Admin" ? (
                        <>
                          <td>{order.brokerEmail}</td>
                          <td>{order.brokerName}</td>
                        </>
                      ) : (
                        <>
                          <td>
                            <button className="btn bg-success w-100">
                              {order.statuOrder}
                            </button>
                          </td>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>

        <hr
          style={{
            border: "1px solid #3498db",
            width: "100%",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        />

        <h3
          className="mb-4 text-green"
          style={{
            marginTop: "50px",
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          قائمة العروض الجاريه{" "}
        </h3>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
          />
          <Button className="mt-2" variant="primary">
            بحث
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>الملاحظات</th>
              <th>رقم الطلب</th>
              {DecodedTokken ? (
                <>
                  {DecodedTokken.Role === "Admin" ? (
                    <>
                      <th>بريد صاحب الطلب</th>
                      <th>اسم صاحب الطلب</th>
                    </>
                  ) : (
                    <>
                      <th>الحالة</th>
                    </>
                  )}
                </>
              ) : (
                <>
                  <th>الحالة</th>
                </>
              )}
              <th>مراحل الطلب</th>
            </tr>
          </thead>
          <tbody>
            {orders2 ? (
              <>
                {orders2
                  .filter((order) => {
                    return searchTerm2 === "" || order.id.includes(searchTerm2);
                  })
                  .map((order) => (
                    <tr
                      key={order.id}
                    >
                      <td>{order.date}</td>
                      <td>{order.location}</td>
                      <td>
                        {order.notes == null ? (
                          <>لا توجد ملاحظات</>
                        ) : (
                          <>{order.notes}</>
                        )}
                      </td>

                      <td>{order.id}</td>
                      {DecodedTokken ? (
                        <>
                          {DecodedTokken.Role === "Admin" ? (
                            <>
                              <td>{order.email}</td>
                              <td>{order.fullName}</td>
                            </>
                          ) : (
                            <>
                              <td>
                                {" "}
                                <button
                                  onClick={() => SendIdSuccses(order.id)}
                                  className="btn bg-success w-50"
                                >
                                  تنفيذ
                                </button>
                                <button
                                  onClick={() => SendIdCancel(order.id)}
                                  className="btn bg-danger w-50"
                                >
                                  ألغاء
                                </button>
                              </td>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <td>
                            {" "}
                            <button
                              onClick={() => SendIdSuccses(order.id)}
                              className="btn bg-success w-50"
                            >
                              تنفيذ
                            </button>
                            <button
                              onClick={() => SendIdCancel(order.id)}
                              className="btn bg-danger w-50"
                            >
                              ألغاء
                            </button>
                          </td>
                        </>
                      )}
                      <button
                        onClick={() => handleShowDetails(order.id)}
                        className="btn bg-primary w-100"
                      >
                        مراحل الطلب
                      </button>
                    </tr>
                  ))}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan="5" className="text-center">
                    لا توجد عروض جارية
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </Table>

        <hr
          style={{
            border: "1px solid #3498db",
            width: "100%",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        />

        <h3
          className="mb-4 text-green"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
        >
          عروض تم تحويلها من خدمه العملاء{" "}
        </h3>

        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
            value={searchTerm3}
            onChange={(e) => setSearchTerm3(e.target.value)}
          />
          <Button className="mt-2" variant="primary">
            بحث
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>الملاحظات</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
              {DecodedTokken ? (
                <>
                  {DecodedTokken.Role === "Admin" ? (
                    <>
                      <th>بريد المخلص</th>
                      <th>اسم المخلص</th>
                      <th>بريد خدمه العملاء</th>
                      <th>خدمه العملاء</th>
                    </>
                  ) : (
                    <>
                      <th>الحالة</th>
                    </>
                  )}
                </>
              ) : (
                <>
                  <th>الحالة</th>
                </>
              )}
              <th>إضافه ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {CustomersOrders ? (
              <>
                {CustomersOrders.filter((order) => {
                  return searchTerm3 === "" || order.id.includes(searchTerm3);
                }).map((order) => (
                  <tr key={order.id} >
                    <td>{order.date}</td>
                    <td>
                      {order.notes == null ? (
                        <>لا توجد ملاحظات</>
                      ) : (
                        <>{order.notes}</>
                      )}
                    </td>
                    <td>{order.location}</td>
                    <td>{order.id}</td>
                    {DecodedTokken ? (
                      <>
                        {DecodedTokken.Role === "Admin" ? (
                          <>
                            <td>{order.brokerEmail}</td>
                            <td>{order.brokerName}</td>
                            <td>{order.customerServiceEmail}</td>
                            <td>{order.customerServiceName}</td>
                          </>
                        ) : (
                          <>
                            <td>
                              {" "}
                              <button
                                onClick={() => SendIdSuccses(order.id)}
                                className="btn bg-success w-50"
                              >
                                تنفيذ
                              </button>
                              <button
                                onClick={() => SendIdCancel(order.id)}
                                className="btn bg-danger w-50"
                              >
                                ألغاء
                              </button>
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <td>
                          <button
                            onClick={() => SendIdSuccses(order.id)}
                            className="btn bg-success w-50"
                          >
                            تنفيذ
                          </button>
                          <button
                            onClick={() => SendIdCancel(order.id)}
                            className="btn bg-danger w-50"
                          >
                            ألغاء
                          </button>
                        </td>
                      </>
                    )}

                    <td>
                      <button
                        onClick={() => handleShowBar(order.notes, order.id)}
                        className="btn bg-primary w-100"
                      >
                        إضافه ملاحظات
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <>
                {" "}
                <tr>
                  <td colSpan="5" className="text-center">
                    لا توجد عروض تم تحويلها من خدمه العملاء
                  </td>
                </tr>
              </>
            )}
          </tbody>

          <Modal
            className="text-end"
            show={Bar !== null}
            onHide={handleCloseBar}
          >
            <Modal.Header
              closeButton
              className="bg-primary text-white text-center"
              style={{ borderRadius: "8px 8px 0 0", padding: "15px" }}
            >
              <Modal.Title className="w-100 fs-5">تقديم الملاحظات</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="p-4 bg-light"
              style={{ borderRadius: "0 0 8px 8px" }}
            >
              <Box
                sx={{
                  maxWidth: 400,
                  mx: "auto",
                  p: 3,
                  boxShadow: 4,
                  borderRadius: 3,
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className="text-primary fw-bold text-center"
                >
                  إضافة ملاحظات وملف
                </Typography>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mt-4 text-center" controlId="Notes">
                    <Form.Label className="fw-bold text-secondary">
                      ملاحظات الطلب
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="أدخل ملاحظاتك هنا..."
                      name="Notes"
                      value={formik.values.Notes}
                      onChange={formik.handleChange}
                      className="shadow-sm border-primary"
                    />
                  </Form.Group>
                  <Form.Group controlId="formData" className="mt-4 text-center">
                    <Form.Label className="fw-bold text-secondary">
                      الإبانه
                    </Form.Label>
                    <InputGroup className="shadow-sm border-primary">
                      <FormControl
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="p-2"
                      />
                    </InputGroup>
                  </Form.Group>
                  {IsLoading ? (
                    <Button
                      className="w-100 mt-4 d-flex justify-content-center align-items-center  text-black border-0 shadow-sm"
                      disabled
                    >
                      <i
                        className="fa-solid fa-gear fa-spin"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mt-4 d-flex justify-content-center align-items-center fw-bold shadow-sm"
                    >
                      إرسال الملاحظات
                    </Button>
                  )}
                </Form>
              </Box>
            </Modal.Body>
            <Modal.Footer className="bg-light d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={handleCloseBar}
                className="fw-bold shadow-sm px-4"
              >
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            className="text-end"
            show={selectedOrder !== null}
            onHide={handleCloseDetails}
          >
            <Modal.Header closeButton>
              <Modal.Title>تفاصيل الطلب</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center gap-3">
              <Button
                variant="warning"
                className="w-100 py-2"
                onClick={GetTrackingstep1}
              >
                تم إخراج الطلب من الأرضيات
              </Button>

              {Step1 && (
                <Button
                  variant="info"
                  className="w-100 py-2"
                  onClick={GetTrackingstep2}
                >
                  الطلب تحت الفحص
                </Button>
              )}

              {Step2 && (
                <Button
                  variant="success"
                  className="w-100 py-2"
                  onClick={GetTrackingstep3}
                >
                  تم إنهاء الطلب
                </Button>
              )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="secondary"
                className="px-4 py-2"
                onClick={handleCloseDetails}
              >
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>
        </Table>
        <Toaster />
      </div>
    </>
  );
}

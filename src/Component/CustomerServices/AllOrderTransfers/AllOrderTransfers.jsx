import { useEffect, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormControl, InputGroup, Modal } from "react-bootstrap";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import { use } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AllOrderTransfers() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  let [Counter, setCounter] = useState(1);
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [DecodedTokken, setDecodedTokken] = useState();

  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  //>>>>>>>>>>>>>>>>BAR>>>>>>>>>>>//
  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const getAllInformationBroker = async (BrokerId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Informatiom-From-Broker`,
        {
          BrokerID: BrokerId,
        },
        {
          withCredentials: true,
        }
      );

      setSelectedOrder(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: value }));
  };

  const toggleNoteField = (id) => {
    setShowNoteField((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const ChangeStateNotDone = async (id) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService`,
        {
          statuOrder: "false",
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم ارسال الملاحظات");
      getAllAcceptedOrders();
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
        formData, // إرسال formData مباشرة بدون وضعه داخل كائن
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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

  const ChangeStateDone = async (values) => {
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService`,
        {
          statuOrder: "true",
          ID: values,
        },
        {
          withCredentials: true,
        }
      );
      alert("تم ارسال الملاحظات");
      getAllAcceptedOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllAcceptedOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Transfer-From-Account`,
        {
          withCredentials: true,
        }
      );
      setCustomers(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    let DecodedToken = jwtDecode(localStorage.getItem("Tokken"));
    setorder(DecodedToken);
    getAllAcceptedOrders();
    setDecodedTokken(DecodedToken);
  }, []);

  let formik = useFormik({
    initialValues: {
      Notes: "",
      formFile: "",
    },
    onSubmit: SendFile,
  });

  return (
    <Box width="100%" textAlign="center" p={4}>
      <h1
        className="text-xl font-bold mb-4"
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          borderBottom: "3px solid #3498db",
          paddingBottom: "10px",
          width: "fit-content",
          margin: "0 auto 2rem auto",
          borderRadius: "10px",
          backgroundColor: "#0A6785",
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
        الطلبات المحوله
      </h1>
      <div className="table-responsive mt-3">
        <table className="table table-bordered text-center shadow-sm">
          <thead className="bg-white border">
            <tr>
              <th>رقم الطلب</th>
              <th>موقع الطلب</th>
              <th>الملاحظات</th>
              <th>اضافه مرفقات</th>

              <th>الاسم</th>
              <th>نوع الطلب</th>

              {DecodedTokken ? (
                <>
                  {DecodedTokken.Role === "Admin" ? (
                    <>
                      <th>المحاسب</th>
                      <th>بريد المحاسب</th>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              <th>البريد الالكتروني</th>
              <th>التاريخ</th>
              <th>تفاصيل المخلص</th>
              <th>الحاله</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.id}
                </td>{" "}
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.location}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.notes}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  <Button
                    className="bg-primary text-white p-2"
                    onClick={() => handleShowBar(customer.notes, customer.id)}
                  >
                    اضافه ملفات
                  </Button>
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.fullName}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.typeOrder}
                </td>
                {DecodedTokken ? (
                  <>
                    {DecodedTokken.Role === "Admin" ? (
                      <>
                        <td align="center">{customer.accountName}</td>
                        <td align="center">{customer.accountEmail}</td>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.email}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.date}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  <Button
                    className="bg-primary text-white p-2"
                    onClick={() => handleShowDetails(order, customer.brokerID)}
                  >
                    عرض التفاصيل
                  </Button>
                </td>
                {showNoteField[customer.id] && (
                  <Box mt={1}>
                    <TextField
                      label="اكتب ملاحظة"
                      variant="outlined"
                      fullWidth
                      value={notes[customer.id] || ""}
                      onChange={(e) =>
                        handleNoteChange(customer.id, e.target.value)
                      }
                      sx={{ marginBottom: "10px" }}
                    />
                    <Button
                      onClick={() => ChangeStateNotDone(customer.id)}
                      className="bg-danger text-white"
                    >
                      إرسال الملاحظة
                    </Button>
                  </Box>
                )}
                <td
                  sx={{ backgroundColor: "#f0f0f0" }}
                  className="p-3"
                  align="center"
                >
                  <Button
                    onClick={() => toggleNoteField(customer.id)}
                    className="m-1 bg-danger text-white"
                  >
                    تحويل الي المخلص
                  </Button>
                  <Button
                    onClick={() => ChangeStateDone(customer.id)}
                    className="m-1 bg-success text-white"
                  >
                    تحويل الي المحاسب{" "}
                  </Button>
                </td>
              </tr>
            ))}

            <Modal
              className="text-end"
              show={selectedOrder !== null}
              onHide={handleCloseDetails}
            >
              <Modal.Header closeButton>
                <Modal.Title>تفاصيل الطلب</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedOrder && (
                  <>
                    <p>
                      {selectedOrder.email} <strong>:البريد الإكتروني</strong>
                    </p>
                    <p>
                      <strong>الاسم:</strong> {selectedOrder.fullName}
                    </p>
                    <p>
                      <strong>رقم الهويه:</strong> {selectedOrder.identity}
                    </p>
                    <p>
                      <strong>رقم الهاتف:</strong> {selectedOrder.phoneNumber}
                    </p>
                    <p>
                      <strong>رخصه المخلص:</strong> {selectedOrder.license}
                    </p>
                    <p>
                      <strong>الرقم الضريبي:</strong> {selectedOrder.taxRecord}
                    </p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetails}>
                  إغلاق
                </Button>
              </Modal.Footer>
            </Modal>

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
                <Modal.Title className="w-100 fs-5">
                  تقديم الملاحظات
                </Modal.Title>
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
                    <Form.Group
                      controlId="formData"
                      className="mt-4 text-center"
                    >
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
          </tbody>
        </table>
      </div>
      <Toaster />
    </Box>
  );
}

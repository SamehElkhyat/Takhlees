import { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Form, Modal, Spinner, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function AcceptedOrderAccountant() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({});
  const [showNoteField, setShowNoteField] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [IndexCutome, setIndexCutome] = useState(false);
  const [ImageName, setImageName] = useState({});
  const [error, seterror] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [DecodedTokken, setDecodedTokken] = useState();

  const handleShowBar = (items, orderId) => {
    setIndexCutome(items);
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setDecodedTokken(data.data.role);
      setorder(data.data.id);

    } catch (error) {

    }
  };

  const GetFileName = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Name-File-From-CustomerService`,
        {
          newOrderId: OrderId,
        },
        {
          withCredentials: true,
        }
      );

      setIsLoading(false);
      setImageName(data);
    } catch (error) {
      toast.error(error.response.data.message);
      seterror(error.status);
      setIsLoading(false);
    }
  };

  const DownloadFilesApi = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/DownloadFiles-From-Account`,
        {
          newOrderId: OrderId,
        },
        {
          withCredentials: true,
          responseType:"blob",
        }
      );
      setIsLoading(false);

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/['"]/g, "") // استخراج الاسم
        : `${ImageName.fileName}.${response.data.type.split("/")[1]}`; // اسم افتراضي

      const blob = response.data; // البيانات كـ Blob
      const url = window.URL.createObjectURL(blob);

      // إنشاء رابط تنزيل تلقائي
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // تعيين اسم الملف
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // تنظيف الرابط المؤقت من الذاكرة
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setIsLoading(false);

      toast.error(error.response.data.message);
    }
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

  // تحديث حالة الملاحظات عند إدخالها
  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: value }));
  };

  // تحديث حالة الإظهار عند الضغط على الزر
  const toggleNoteField = (id) => {
    setShowNoteField((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // دالة تغيير الحالة وإرسال الملاحظات
  const ChangeStateNot = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Account`,
        {
          statuOrder: "false",
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // دالة تغيير الحالة إلى "تم التحويل"
  const ChangeStatedone = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-Account`,
        {
          statuOrder: "true",
          ID: id,
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحويل الطلب بنجاح");
      getAllAcceptedOrders(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // جلب جميع الطلبات المقبولة
  const getAllAcceptedOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Done-Accept-Orders`,
        {
          withCredentials: true,
        }
      );

      if (JSON.stringify(data) !== JSON.stringify(customers)) {
        setCustomers(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      seterror(error.status);
    }
  };

  useEffect(() => {
    if (OrderId == null) {
    } else {
      GetFileName();
    }
  }, [OrderId]);

  useEffect(() => {
    getAllAcceptedOrders();
    navigationToLandingpage()
  }, []);

  useEffect(() => {
    getAllAcceptedOrders();
  }, [customers]);

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  return (
    <Box width="100%" textAlign="center" p={4}>
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "black",
          backgroundColor: "transparent",
        }}
      >
        قائمه الحوالات للمخلصين
      </h1>
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

      <Table style={{ marginTop: "20px", width: "100%" }}>
        <TableHead
          sx={{
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <TableRow>
            <TableCell align="center">رقم الطلب</TableCell>
            <TableCell align="center">موقع الطلب</TableCell>
            <TableCell align="center">الاسم</TableCell>
            <TableCell align="center">نوع الطلب</TableCell>
            <TableCell align="center">البريد الالكتروني</TableCell>
            <TableCell align="center">المبلغ</TableCell>
            {DecodedTokken ? (
              <>
                {DecodedTokken === "Admin" ? (
                  <>
                    <TableCell align="center">خدمه العملاء</TableCell>
                    <TableCell align="center">بريد خدمه العملاء</TableCell>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">تفاصيل المخلص</TableCell>
            <TableCell align="center">الحالة</TableCell>
            <TableCell align="center">الملفات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers
            .filter((order) => {
              return searchTerm === "" || order.iDstring.includes(searchTerm);
            })
            .map((customer, index) => (
              <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
                <TableCell align="center">{customer.id}</TableCell>
                <TableCell align="center">{customer.location}</TableCell>
                <TableCell align="center">{customer.fullName}</TableCell>
                <TableCell align="center">{customer.typeOrder}</TableCell>
                <TableCell align="center">{customer.email}</TableCell>
                <TableCell align="center">{customer.value}</TableCell>
                {DecodedTokken ? (
                  <>
                    {DecodedTokken === "Admin" ? (
                      <>
                        <TableCell align="center">
                          {customer.customerServiceName}
                        </TableCell>
                        <TableCell align="center">
                          {customer.customerServiceEmail}
                        </TableCell>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                <TableCell align="center">{customer.date}</TableCell>

                <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  <Button
                    className="bg-primary text-white p-2"
                    onClick={() => handleShowDetails(order, customer.brokerID)}
                  >
                    عرض التفاصيل
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => toggleNoteField(customer.id)}
                    className="bg-danger text-white"
                    sx={{ marginRight: "10px" }}
                  >
                    لم يتم التحويل
                  </Button>

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
                        onClick={() => ChangeStateNot(customer.id)}
                        className="bg-danger text-white"
                      >
                        {" "}
                        إرسال الملاحظة
                      </Button>
                    </Box>
                  )}

                  <Button
                    onClick={() => ChangeStatedone(customer.id)}
                    className="bg-success text-white"
                  >
                    تم التحويل
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    className="bg-primary text-white p-2"
                    onClick={() => handleShowBar(index, customer.id)}
                  >
                    عرض تفاصيل الملاحظات
                  </Button>
                </TableCell>
              </TableRow>
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
            className="text-center"
            show={Bar !== null}
            onHide={handleCloseBar}
          >
            {/* رأس المودال مع تصميم مميز */}
            <Modal.Header
              closeButton
              className="bg-light rounded-top shadow-sm text-center"
            >
              <Modal.Title className="fs-3 fw-bold text-primary d-block">
                تفاصيل الطلب
                <small className="d-block text-muted fs-6">إدارة الطلبات</small>
              </Modal.Title>
            </Modal.Header>

            {/* جسم المودال مع تنسيق أفضل */}
            <Modal.Body className="p-4 bg-light rounded-bottom text-center">
              {/* عرض تفاصيل الملاحظات */}
              <div className="mb-4">
                <h5 className="text-success fw-bold">الملاحظات</h5>

                <p className="text-muted fs-6">{ImageName.notes}</p>
              </div>

              {/* قسم التحميل مع زر مميز */}
              <div className="d-inline-block">
                <h5 className="text-success mb-3">
                  تحميل الملف
                  <span style={{ color: "red", margin: "10px" }}>
                    {ImageName.fileName}
                  </span>
                </h5>
                <Button
                  variant="success"
                  onClick={() => DownloadFilesApi()}
                  disabled={IsLoading}
                  className="px-4 py-2 rounded-pill shadow"
                >
                  {IsLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      جارٍ التحميل...
                    </>
                  ) : (
                    "تحميل"
                  )}
                </Button>
              </div>
            </Modal.Body>

            {/* قدم المودال مع زر إغلاق مميز */}
            <Modal.Footer className="bg-light border-0 text-center">
              <Button
                variant="danger"
                onClick={handleCloseBar}
                className="px-4 py-2 rounded-pill shadow"
              >
                إغلاق
              </Button>
            </Modal.Footer>
          </Modal>
        </TableBody>
      </Table>
    </Box>
  );
}

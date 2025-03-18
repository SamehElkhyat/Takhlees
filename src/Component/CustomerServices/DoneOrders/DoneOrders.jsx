import { useEffect, useState } from "react";
import {
  Button,
  TableCell,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

export default function DoneOrders() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب
  const [Bar, setBar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [ImageName, setImageName] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [OrderId, setOrderId] = useState(null);

  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
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

  ///files |||||||///////////

  const handleShowDetails = (order, BrokerId) => {
    console.log(order, BrokerId);

    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
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
      console.log(data);

      setSelectedOrder(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // دالة تغيير الحالة إلى "تم التحويل"
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

      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders();

      console.log(request);
    } catch (error) {
      toast.error(error.response.data.message);
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
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAllAcceptedOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Accept-Orders`,
        {
          withCredentials: true,
        }
      );

      setCustomers(data);
      console.log(data);
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
    GetFileName();
    getAllAcceptedOrders();
  }, [OrderId]);

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
        الطلبات المنفذه
      </h1>


      <div className="table-responsive mt-3">
        <table className="table table-bordered text-center shadow-sm">
          <thead className="bg-white border">
            <tr>
              <th align="center">رقم الطلب</th>
              <th align="center">موقع الطلب</th>
              <th align="center">الاسم</th>
              <th align="center">الملاحظات</th>
              <th align="center">نوع الطلب</th>
              <th align="center">الهاتف</th>
              <th align="center">التاريخ</th>
              <th align="center">تفاصيل المخلص</th>
              <th align="center">تفاصيل الملاحظات</th>
              <th align="center">الحاله</th>
            </tr>
          </thead>
          <tbody>
          {sortedCustomers.map((customer, index) => (
            <tr sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
              <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.id}
              </td>
              <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.location}
              </td>
              <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.fullName}
              </td>
              <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.notes === "" ? (
                  <>لا يوجد ملاحظات</>
                ) : (
                  <>{customer.notes}</>
                )}
              </td>
              <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.typeOrder}
              </td>
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
              <td align="center">
                <Button
                  className="bg-primary text-white p-2"
                  onClick={() => handleShowBar(index, customer.id)}
                >
                  عرض تفاصيل الملاحظات
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

              <TableCell
                sx={{ backgroundColor: "#f0f0f0" }}
                className="p-3"
                align="center"
              >
                <Button
                  onClick={() => toggleNoteField(customer.id)}
                  className="m-1 bg-danger text-white"
                >
                  لم يتم التنفيذ
                </Button>
                <Button
                  onClick={() => ChangeStateDone(customer.id)}
                  className="m-1 bg-success text-white"
                >
                  تم التنفيذ
                </Button>
              </TableCell>
            </tr>
          ))}

<Modal
            className="text-end"
            show={selectedOrder !== null}
            onHide={handleCloseDetails}
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-center w-100">
                تفاصيل المخلص
              </Modal.Title>
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
              <Modal.Title className="fs-3 fw-bold text-primary d-block w-100">
                تفاصيل ملاحظات
                <small className="d-block text-muted fs-6">
                  إدارة الملاحظات والملفات
                </small>
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
                  <span style={{ color: "red", margin: "10px" }}>
                    {ImageName.fileName == null ? (
                      <>لا يوجد ملف </>
                    ) : (
                      <>{ImageName.fileName}</>
                    )}
                  </span>
                </h5>
                {ImageName.fileName == null ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    انتظر قليلا لعرض الملف
                  </>
                ) : (
                  <>
                    {" "}
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
                  </>
                )}
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
          </tbody>
        </table>
      </div>
    </Box>
  );
}

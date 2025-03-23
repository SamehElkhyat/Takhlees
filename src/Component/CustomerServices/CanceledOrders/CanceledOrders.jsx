import { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CanceledOrders() {
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField2, setShowNoteField2] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField3, setShowNoteField3] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});

  const handleShowDetails = (order, BrokerId) => {
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

      setSelectedOrder(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sendToBroker = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
          statuOrder: "transfer",
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const ChangeStateNot = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const ChangeStatueNot = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
          statuOrder: "delete",
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const ChangetoDelete = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
          statuOrder: "send",
        },
        {
          withCredentials: true,
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getCustomers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-All-Refuse-Orders`,
        {
          withCredentials: true,
        }
      );

      setCustomers(data);
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
  const toggleNoteField2 = (id) => {
    setShowNoteField2((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );
  useEffect(() => {
    getCustomers();
  }, []);

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
        الطلبات الملغاه
      </h1>

      <div className="table-responsive mt-3">
        <table className="table table-bordered text-center shadow-sm">
          <thead className="bg-white border">
            <tr>
              <th>رقم الطلب</th>
              <th>الاسم</th>
              <th>الموقع</th>

              <th>البريد الالكتروني</th>
              <th>التاريخ</th>
              <th>تفاصيل المخلص</th>
              <th>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer) => (
              <tr sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.id}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.fullName}
                </td>
                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  {customer.location}
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

                <td sx={{ backgroundColor: "#f0f0f0" }} align="center">
                  <Button
                    onClick={() => toggleNoteField2(customer.id)}
                    className="bg-success text-white"
                    sx={{ marginRight: "10px" }}
                  >
                    ارسال الطلب للمخلص
                  </Button>
                  <Button
                    onClick={() => ChangetoDelete(customer.id)}
                    className="bg-primary text-white"
                    sx={{ marginRight: "10px" }}
                  >
                    ارسال الي الطلبات المتاحه
                  </Button>
                  <Button
                    onClick={() => toggleNoteField(customer.id)}
                    className="bg-danger text-white"
                    sx={{ marginRight: "10px" }}
                  >
                    إلغاء
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
                        onClick={() => ChangeStatueNot(customer.id)}
                        className="bg-danger text-white"
                      >
                        إرسال الملاحظة
                      </Button>
                    </Box>
                  )}

                  {showNoteField2[customer.id] && (
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
                        onClick={() => sendToBroker(customer.id)}
                        className="bg-danger text-white"
                      >
                        إرسال الملاحظة
                      </Button>
                    </Box>
                  )}

                  {showNoteField3[customer.id] && (
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
                        onClick={() => sendToBroker(customer.id)}
                        className="bg-danger text-white"
                      >
                        إرسال الملاحظة
                      </Button>
                    </Box>
                  )}
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
          </tbody>
        </table>
      </div>
    </Box>
  );
}

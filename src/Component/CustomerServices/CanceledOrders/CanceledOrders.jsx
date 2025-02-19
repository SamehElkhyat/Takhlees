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
} from "@mui/material";
import axios from "axios";
import { Modal } from "react-bootstrap";

export default function CanceledOrders() {
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField2, setShowNoteField2] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField3, setShowNoteField3] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة

  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({})
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});


  const handleShowDetails = (order,BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId)
    
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };



  const getAllInformationBroker = async (BrokerId) => {
    try {
      const {data} = await axios.post(
        `https://user.runasp.net/api/Get-All-Informatiom-From-Broker`,{
          BrokerID:BrokerId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
console.log(data);

setSelectedOrder(data)
      
    } catch (error) {
      console.log(error);
    }
  };

  const sendToBroker=async(id)=>{

    try {
      await axios.post(`https://user.runasp.net/api/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
          statuOrder:'transfer'

        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}` },
        }
      )
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      
    }
  }

  const ChangeStateNot = async (id) => {
    try {
      await axios.post(
        `https://user.runasp.net/api/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}` },
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الحالة:", error);
    }
  };



  const ChangeStatueNot = async (id) => {
    try {
      await axios.post(
        `https://user.runasp.net/api/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
          statuOrder:'delete',

        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}` },
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الحالة:", error);
    }
  };


  const ChangetoDelete = async (id) => {
    try {
      await axios.post(
        `https://user.runasp.net/api/Change-Statu-CustomerService-Broker`,
        {
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
          statuOrder:'send',

        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}` },
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getCustomers(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الحالة:", error);
    }
  };



  const getCustomers = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-All-Refuse-Orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);
      
      setCustomers(data);
    } catch (error) {
      console.log(error);
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
          fontSize: "40px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "black",
          backgroundColor: "transparent",
        }}
      >
        الطلبات الملغاه
      </h1>
      <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <MenuItem value="newest">الأحدث</MenuItem>
        <MenuItem value="oldest">الأقدم</MenuItem>
      </Select>
      <Table style={{ marginTop: "20px", width: "100%" }}>
        <TableHead
          sx={{
            backgroundColor: "white",
            borderTop: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
            borderLeft: "1px solid #e0e0e0",
            borderRight: "1px solid #e0e0e0",
            borderRight: "1px solid #e0e0e0",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <TableRow>
            <TableCell align="center">رقم الطلب</TableCell>
            <TableCell align="center">الاسم</TableCell>
            <TableCell align="center">الموقع</TableCell>

            <TableCell align="center">الهاتف</TableCell>
            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">تفاصيل المخلص</TableCell>
            <TableCell align="center">الإجراء</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.id}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.fullName}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.location}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.accountManager}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.phoneNumber}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.date}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                <Button
                  className="bg-primary text-white p-2"
                  onClick={() => handleShowDetails(order,customer.brokerID)}
                >
                  عرض التفاصيل
                </Button>
              </TableCell>

              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                <Button
                  onClick={() => toggleNoteField2(customer.id)}
                  className="bg-danger text-white"
                  sx={{ marginRight: "10px" }}
                >
                   ارسال الطلب للمخلص
                </Button>
                <Button
                  onClick={() => ChangetoDelete(customer.id)}
                  className="bg-danger text-white"
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
              </TableCell>
            </TableRow>
          ))}
          

<Modal className="text-end" show={selectedOrder !== null} onHide={handleCloseDetails}>
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
        </TableBody>
      </Table>
    </Box>
  );
}

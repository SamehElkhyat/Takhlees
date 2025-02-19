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

export default function DoneOrders() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  let [Counter, setCounter] = useState(1);
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب


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

  // دالة تغيير الحالة إلى "تم التحويل"

  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: value }));
  };

  const ChangeStateNotDone = async (id) => {

    setShowNoteField((prev) => ({ ...prev, [id]: !prev[id] }));

    const request = await axios.post(
      `https://user.runasp.net/api/Change-Statu-CustomerService`,{
        statuOrder:'false',
        ID:id

      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
        },
      }
    );
    console.log(request);
  };


  const ChangeStateDone = async (values) => {
    console.log(values);
    

    try {
      const request = await axios.post(
        `https://user.runasp.net/api/Change-Statu-CustomerService`,{
          statuOrder:'true',
          ID:values
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(request);
    } catch (error) {
      console.log(error);
      
    }

  };

  const getAllAcceptedOrders = async () => {
    const { data } = await axios.get(
      `https://user.runasp.net/api/Get-All-Accept-Orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
        },
      }
    );
   console.log(data);
   
    setCustomers(data);
  };

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    getAllAcceptedOrders();
  }, [customers]);

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
     الطلبات المنفذه
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
            <TableCell align="center">موقع الطلب</TableCell>

            <TableCell align="center">الاسم</TableCell>
            <TableCell align="center">الملاحظات</TableCell>

            <TableCell align="center">نوع الطلب</TableCell>

            <TableCell align="center">الهاتف</TableCell>
            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">تفاصيل المخلص</TableCell>
            <TableCell align="center">الحاله</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
              {customer.id}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.location}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.fullName}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.notes}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.typeOrder}
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
                <Button onClick={()=>ChangeStateNotDone(customer.id)} className="m-1 bg-danger text-white">
                  لم يتم التنفيذ
                </Button>
                <Button onClick={()=>ChangeStateDone(customer.id)} className="m-1 bg-success text-white">
                  تم التنفيذ
                </Button>
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

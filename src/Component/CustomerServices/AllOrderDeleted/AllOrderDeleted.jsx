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
import { jwtDecode } from "jwt-decode";

export default function AllOrderDeleted() {
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField2, setShowNoteField2] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField3, setShowNoteField3] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [DecodedTokken, setDecodedTokken] = useState();
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



  const getAllDeletedOrders = async (BrokerId) => {
    try {
      const {data} = await axios.get(
        `https://user.runasp.net/api/Get-Deleted-Orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
console.log(data);

setCustomers(data)

      
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
    getAllDeletedOrders();
    let DecodedToken = jwtDecode(localStorage.getItem("Tokken"));
    setDecodedTokken(DecodedToken);
  }, []);

  return (
    <Box width="100%" textAlign="center" p={4}>
      <h1
        className="text-xl font-bold mb-4"
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
        الطلبات المحذوفه
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
            <TableCell align="center">الموقع</TableCell>
            <TableCell align="center">الملاحظات</TableCell>

            {DecodedTokken ? (
                  <>
                    {DecodedTokken.Role === "Admin" ? (
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
               


            <TableCell align="center">نوع الطلب</TableCell>
            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">حاله الطلب</TableCell>

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
                {customer.notes}
              </TableCell>
              {DecodedTokken ? (
                  <>
                    {DecodedTokken.Role === "Admin" ? (
                      <>
                        <TableCell align="center">
                          {customer.customerServiceEmail}
                        </TableCell>
                        <TableCell align="center">
                          {customer.customerServiceName}
                        </TableCell>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.typeOrder}
              </TableCell>

              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.date}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                <Button 
                                  className="bg-danger text-white p-2"

                >
                {customer.statuOrder}

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

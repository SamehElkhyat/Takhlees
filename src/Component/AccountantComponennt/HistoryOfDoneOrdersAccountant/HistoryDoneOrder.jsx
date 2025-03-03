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
import { Form, Modal ,Button } from "react-bootstrap";

import axios from "axios";

export default function HistoryDoneOrder() {

  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setorder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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
        `https://user.runasp.net/api/Get-All-Informatiom-From-Broker`,
        {
          BrokerID: BrokerId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);

      setSelectedOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAcceptedOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-All-Done-Transfer-Orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);

      setCustomers(data);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
  };

  useEffect(() => {
    getAllAcceptedOrders();
  }, []);

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
        سجل الحوالات المنفذه
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
      <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <MenuItem value="newest">الأحدث</MenuItem>
        <MenuItem value="oldest">الأقدم</MenuItem>
      </Select>
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
            <TableCell align="center">الهاتف</TableCell>
            <TableCell align="center">المبلغ</TableCell>

            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">تفاصيل المخلص</TableCell>
            <TableCell align="center">الحالة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.filter((order)=>
            {
              return searchTerm === "" || order.id.includes(searchTerm)

            }).map((customer, index) => (
            <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
              <TableCell align="center">{customer.id}</TableCell>
              <TableCell align="center">{customer.location}</TableCell>
              <TableCell align="center">{customer.fullName}</TableCell>
              <TableCell align="center">{customer.typeOrder}</TableCell>
              <TableCell align="center">{customer.phoneNumber}</TableCell>
              <TableCell align="center">{customer.value}</TableCell>
              <TableCell align="center">{customer.date}</TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                <Button
                  className="bg-primary text-white p-2"
                  onClick={() => handleShowDetails(order, customer.brokerID)}
                >
                  عرض التفاصيل
                </Button>
              </TableCell>
              <TableCell align="center" className="bg-succsses">
                <Button className="bg-success text-white p-2">
                  {customer.statuOrder}{" "}
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
              {console.log(selectedOrder)}
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

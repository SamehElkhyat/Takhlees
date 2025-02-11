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

export default function CanceledOrders() {
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة

  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({})


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

  const handleConfirm = (id) => {
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, status: "contacted" } : c))
    );
  };

  const handleExecutionStatus = (id, status) => {
    setCustomers(customers.map((c) => (c.id === id ? { ...c, status } : c)));
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
            <TableCell align="center">المسؤول</TableCell>

            <TableCell align="center">الهاتف</TableCell>
            <TableCell align="center">التاريخ</TableCell>
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
                      إرسال الملاحظة
                    </Button>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

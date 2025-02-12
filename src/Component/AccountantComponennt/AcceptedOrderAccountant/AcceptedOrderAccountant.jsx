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

export default function AcceptedOrderAccountant() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة


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
        `https://user.runasp.net/api/Change-Statu-Account`,
        {
          statuOrder: "false",
          ID: id,
          Notes: notes[id] || "", // إرسال الملاحظات إن وجدت
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}` },
        }
      );
      alert("تم تحديث الطلب بنجاح");
      getAllAcceptedOrders(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الحالة:", error);
    }
  };

  // دالة تغيير الحالة إلى "تم التحويل"
  const ChangeStatedone = async (id) => {
    try {
      await axios.post(
        `https://user.runasp.net/api/Change-Statu-Account`,
        {
          statuOrder: "true",
          ID: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}`, },
        }
      );
      alert("تم تحويل الطلب بنجاح");
      getAllAcceptedOrders(); // تحديث القائمة بعد الإرسال
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث الحالة:", error);
    }
  };

  // جلب جميع الطلبات المقبولة
  const getAllAcceptedOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-All-Done-Accept-Orders`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("Tokken")}`, },
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
        قائمه الحوالات للمخلصين
      </h1>
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
            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">الحالة</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer,index) => (
            <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
              <TableCell align="center">{customer.id}</TableCell>
              <TableCell align="center">{customer.location}</TableCell>
              <TableCell align="center">{customer.fullName}</TableCell>
              <TableCell align="center">{customer.typeOrder}</TableCell>
              <TableCell align="center">{customer.phoneNumber}</TableCell>
              <TableCell align="center">{customer.date}</TableCell>
              <TableCell align="center">
                {/* زر "لم يتم التحويل" */}
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

                <Button
                  onClick={() => ChangeStatedone(customer.id)}
                  className="bg-success text-white"
                >
                  تم التحويل
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

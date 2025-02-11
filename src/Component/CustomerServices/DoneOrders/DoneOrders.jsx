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

export default function DoneOrders() {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  let [Counter, setCounter] = useState(1);
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [notes, setNotes] = useState({}); // حالة لتخزين الملاحظات لكل طلب


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

    setCustomers(data);
  };

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    getAllAcceptedOrders();
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
            <TableCell align="center">نوع الطلب</TableCell>

            <TableCell align="center">الهاتف</TableCell>
            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">الحاله</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow sx={{ backgroundColor: "#f0f0f0" }} key={customer.id}>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {Counter++}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.location}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.fullName}
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
        </TableBody>
      </Table>
    </Box>
  );
}

import { useState } from "react";
import { Button, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Box, TextField } from "@mui/material";

const initialTransfers = [
  { id: 1, name: "شركة ABC", accountManager: "أحمد علي", bankAccount: "1234567890", phone: "123456789", date: "2024-02-02", amount: "5000", status: "pending", reason: "" },
  { id: 2, name: "فرد محمد خالد", accountManager: "سالم محمد", bankAccount: "0987654321", phone: "987654321", date: "2024-02-01", amount: "3000", status: "pending", reason: "" },
];

export default function Accountant() {
  const [transfers, setTransfers] = useState(initialTransfers);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleConfirm = (id, status, reason = "") => {
    setTransfers(transfers.map(t => t.id === id ? { ...t, status, reason } : t));
  };

  const sortedTransfers = [...transfers].sort((a, b) => 
    sortOrder === "newest" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
  );

  return (
    <Box width="100%" textAlign="center" p={4}>
      <h1 className="text-xl font-bold mb-4">المحاسب</h1>
      <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <MenuItem value="newest">الأحدث</MenuItem>
        <MenuItem value="oldest">الأقدم</MenuItem>
      </Select>
      <Table style={{ marginTop: "20px", width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">الاسم</TableCell>
            <TableCell align="center">المسؤول</TableCell>
            <TableCell align="center">رقم الحساب البنكي</TableCell>
            <TableCell align="center">الهاتف</TableCell>
            <TableCell align="center">التاريخ</TableCell>
            <TableCell align="center">مبلغ التحويل</TableCell>
            <TableCell align="center">الإجراء</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTransfers.map((transfer) => (
            <TableRow key={transfer.id}>
              <TableCell align="center">{transfer.name}</TableCell>
              <TableCell align="center">{transfer.accountManager}</TableCell>
              <TableCell align="center">{transfer.bankAccount}</TableCell>
              <TableCell align="center">{transfer.phone}</TableCell>
              <TableCell align="center">{transfer.date}</TableCell>
              <TableCell align="center">{transfer.amount}</TableCell>
              <TableCell align="center">
                {transfer.status === "pending" ? (
                  <>
                    <Button variant="contained" color="success" onClick={() => handleConfirm(transfer.id, "transferred")}>تم التحويل</Button>
                    <Button variant="contained" color="error" onClick={() => handleConfirm(transfer.id, "not_transferred", prompt("الرجاء إدخال السبب"))}>لم يتم التحويل</Button>
                  </>
                ) : (
                  <span>{transfer.status === "transferred" ? "تم التحويل" : `لم يتم التحويل: ${transfer.reason}`}</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

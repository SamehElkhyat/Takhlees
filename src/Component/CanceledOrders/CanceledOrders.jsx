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
} from "@mui/material";
import axios from "axios";


export default function CanceledOrders() {


  const[customers, setCustomers]= useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  const getCustomers = async ()=>{
   
    try{
    
        const {data}= await axios.get(`https://user.runasp.net/api/Get-All-Refuse-Orders`)
        console.log(data);
        

    }catch(error){

console.log(error);


    }



  }

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
}, [])

  return (
    <Box width="100%" textAlign="center" p={4}>
      <h1 className="text-xl font-bold mb-4" 
      style={{
        fontSize: "40px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "black",
        backgroundColor: "transparent",

      }}
      >خدمة العملاء</h1>
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
                {customer.name}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.accountManager}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.phone}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.date}
              </TableCell>

              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.status === "pending" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConfirm(customer.id)}
                  >
                    تم التواصل
                  </Button>
                ) : (
                  <Select
                    onChange={(e) =>
                      handleExecutionStatus(customer.id, e.target.value)
                    }
                  >
                    <MenuItem value="executed">تم التنفيذ</MenuItem>
                    <MenuItem value="not_executed">لم يتم التنفيذ</MenuItem>
                  </Select>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

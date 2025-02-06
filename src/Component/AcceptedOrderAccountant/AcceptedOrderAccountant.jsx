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


export default function AcceptedOrderAccountant() {


  const[customers, setCustomers]= useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  let [Counter, setCounter] = useState(1)

  const getAllAcceptedOrders =async ()=>{

const {data} = await axios.get(`https://user.runasp.net/api/Get-All-Accept-Orders`,{
 headers:{
  Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
 }
 

})

console.log(data);
setCustomers(data)

}



  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    
    getAllAcceptedOrders()

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
      >قائمه الحوالات للمخلصين</h1>
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
              </TableCell>       <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.location}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.name}
              </TableCell>
       
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.typeOrder}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.phone}
              </TableCell>
              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
                {customer.date}
              </TableCell>

              <TableCell sx={{ backgroundColor: "#f0f0f0" }} align="center">
             <Button className="bg-danger text-white">
لم يتم التحويل
             </Button>

             <Button className="bg-success text-white">
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

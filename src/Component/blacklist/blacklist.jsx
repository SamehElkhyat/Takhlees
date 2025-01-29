import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
export default function Blacklist() {
  const [Clients, setClients] = useState([]);
  const GetBlackList = async () => {
    const response = await axios.get(
      "https://takhleesak.runasp.net/api/Black-List",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
        },
      }
    );
  
    setClients(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    GetBlackList();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Clients.map((clients) => (
              <TableRow
                key={clients.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  console.log(clients.email);
                }}
              >
                <TableCell component="th" scope="row">
                  {clients.fullName}
                </TableCell>
                <TableCell align="right">{clients.email}</TableCell>
                <TableCell align="right">{clients.phoneNumber}</TableCell>
                <Button className="bg-success text-black">فك الحظر</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

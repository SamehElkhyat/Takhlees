import React, { useEffect, useState } from "react";
import "./Clients.css";
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
export default function Clients() {
  const [Clients, setClients] = useState([]);
  const GetClients = async () => {
    const response = await axios.get(
      "https://takhleesak.runasp.net/api/Get-User",
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
    GetClients();
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
                <TableCell align="right">{clients.address}</TableCell>
                <TableCell align="right">{clients.password}</TableCell>
                <Button className="bg-danger text-black">حظر</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

import React, { useEffect, useState } from "react";
import "../Brookers/Brookers.css";
import TotalCancled from "../Brookers/Icon_Order (1).jpg";
import TotalOffres from "../Brookers/Icon_Order (2).jpg";
import TotalClients from "../Brookers/Icon_Order.jpg";
import TotalMoney from "../Brookers/icon Delivered.jpg";
import Client from "../Brookers/One Client/Group 10.png";
import ClientMoney from "../Brookers/One Client/Group 10 (1).png";
import ClientOffers from "../Brookers/One Client/Group 10.png";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

export default function Brookers() {
  const [Clients, setClients] = useState([]);
  const [query, setQuery] = useState("");

  const GetClients = async () => {
    try {
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
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    GetClients();
  }, [query]);
  return (
    <>
      <div id="Brookers-container" className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="Content-Total-Clients col-md-2 d-flex align-item-center justify-content-center">
            <img src={TotalClients} alt="" />
            <p>30</p>
          </div>
          <div className="Total-Offers-Content col-md-2 d-flex align-item-center justify-content-center">
            <img src={TotalOffres} alt="" />
            <p>367$</p>
          </div>
          <div className="Total-Cancled-Order d-flex align-item-center justify-content-center col-md-2">
            <img src={TotalCancled} alt="" />
            <p>367$</p>
          </div>
          <div className="Total-Money col-md-2 d-flex justify-content-center align-item-center">
            <img src={TotalMoney} alt="" />
            <p>367$</p>
          </div>
        </div>

        <div className="row mb-5 mt-5 d-flex justify-content-center align-items-center">
          <div className="Content-Clients col-md-1 d-flex align-item-center justify-content-center">
            <div className="item-clients d-flex align-items-center justify-content-center">
              <img src={Client} alt="" />

              <p>30</p>
            </div>
            <hr className="bg-dark" />
            <div className="item-clients d-flex align-items-center justify-content-center">
              <img src={ClientMoney} alt="" />
              <p>367$</p>
            </div>

            <hr className="bg-dark" />
            <div className="item-clients d-flex align-items-center justify-content-center">
              <img src={ClientOffers} alt="" />
              <p>367$</p>
            </div>
          </div>
        </div>

        <TableContainer component={Paper}>
          <TextField
            onChange={(event) => setQuery(event.target.value)}
            id="searchbar"
            className="outlined "
            label="البحث"
            variant="outlined"
          />
          <Table className="w-100" aria-label="simple table">
            <TableHead>
              <TableRow className="text-center">
                <TableCell>الاسم</TableCell>
                <TableCell align="right">البريد الالكتروني</TableCell>
                <TableCell align="right">رقم الهاتف</TableCell>
                <TableCell align="right">رقم الهويه</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Clients.filter((item) => {              
        if (query === "") {
          return item.fullName;
        } else if (item.fullName.toLowerCase().includes(query.toLowerCase())) {
          return item;
        }
      }).map((client) => (
                <TableRow
                  className="text-center"
                  key={client.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => {
                    console.log(client.email);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {client.fullName}
                  </TableCell>
                  <TableCell align="right">{client.email}</TableCell>
                  <TableCell align="right">{client.phoneNumber}</TableCell>
                  <TableCell align="right">{client.identity}</TableCell>
                  <Button className="bg-danger text-black">حظر</Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const PendingOrders = () => {

  const [orders, setOrder] = useState([]);


  const GetOrder = async () => {
    try {
      const Tokken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImFhMzA3YjJhLTkwYjgtNGU0Ny05MjViLTUxNDIwYTQ4OTUwZSIsIkVtYWlsIjoiVXNlcjEwQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiYWJkdWxsYWggbWFobW91ZCBhYmRlbG1vaHNlbiIsInBob25lTnVtYmVyIjoiKzIwMTExNDUxNDMzNyIsIklkZW50aXR5IjoiNjczMzcwOTg0OCIsInNlY3VyaXR5U3RhbXAiOiIzVlFaT0NHM1VLSjdXU0RSR0oySzJZVTdTNlI3T1BPMyIsImp0aSI6IjU1MzVmODliLWMwZDUtNGIxNi1iOTI5LWJiMDVhMGZhYjljYSIsIlJvbGUiOiJVc2VyIiwiZXhwIjoxNzM5NDUyMjYzLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.-6fLh1uXRsB3wutCYj06ztr5Ys3Tq-VRMkne2Et9RlA";

    const res = await axios.get(
      `https://user.runasp.net/api/Get-Orders`,

      {
        headers: {
          Authorization: `Bearer ${Tokken}`,
        },
      }
    );
console.log(res.data);
    setOrder
    (res.data); 

    } catch (error) {
      console.log(error);
      
    }

  };



  useEffect(() => {
    GetOrder();
  }, []);
  return (
    <div className="container mt-5">
      <h3 className="text-center">الطلبات الجاريه</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
            <th>تحديث الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.id}</td>
              <td>{order.location}</td>
              <td>{order.typeOrder}</td>
              <td>{order.statuOrder}</td>
              <td>
                <Button
                  variant="danger"
                >
                  الغاء
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PendingOrders;

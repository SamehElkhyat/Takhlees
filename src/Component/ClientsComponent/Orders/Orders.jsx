import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const PendingOrders = () => {
  const [orders, setOrder] = useState([]);
  const [id, setid] = useState();
  let [counter, setcounter] = useState(1);
  const [Tokeen, setTokeen] = useState(null);

  const SendId = async () => {
    console.log("iam here");
    if (id == 0) {
      console.log("Id Not Found");
    } else {
      try {
        console.log(id.ID);

        const req = await axios.post(
          `https://user.runasp.net/api/Get-ID`,
          { ID: id },
          {
            headers: {
              Authorization: `Bearer ${Tokeen}`,
            },
          }
        );
        if (req.status == 200) {
          window.location.href = "/OrderDetailsForUser";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const GetOrder = async () => {
    console.log(Tokeen);
    
    try {
      const res = await axios.get(
        `https://user.runasp.net/api/Get-Orders`,

        {
          headers: {
            Authorization: `Bearer ${Tokeen}`,
          },
        }
      );
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeId = (value) => {
    setid(value);
  };

  useEffect(() => {
    const GetTokken = localStorage.getItem("Tokken");
    setTokeen(GetTokken);
    GetOrder();
    SendId();
  }, []);
  return (
    <div className="container mt-5">
      <h3 className="text-center">الطلبات القائمة</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={counter++}
              onClick={() => {
                handleChangeId(order.id);
              }}
            >
              {console.log(order.id)}

              <td>{counter}</td>
              <td>{order.location}</td>
              <td>{order.typeOrder}</td>
              <td>{order.statuOrder}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PendingOrders;

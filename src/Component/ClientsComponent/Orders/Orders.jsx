import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const PendingOrders = () => {
  const [orders, setOrder] = useState([]);
  const [id, setid] = useState();
  let [counter, setcounter] = useState(1);

  const SendId = async () => {
    if (id) {
      try {
        const req = await axios.post(
          `https://user.runasp.net/api/Get-ID`,
          { ID: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
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
    try {
      const res = await axios.get(
        `https://user.runasp.net/api/Get-Orders`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
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
    SendId();
  };

  useEffect(() => {
    GetOrder();
    SendId();
  }, [id]);
  return (
    <div className="container mt-5">
      <h3 className="text-center">الطلبات القائمة</h3>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>

          {!orders.length == 0 ? (
            <>
              {orders.map((order) => (
                <tr
                className="text-center"
                  key={counter++}
                  onClick={() => {
                    handleChangeId(order.id);
                  }}
                >
                  <td>{order.id}</td>
                  <td>{order.location}</td>
                  <td>{order.typeOrder}</td>
                  <td>{order.statuOrder}</td>
                </tr>
              ))}
            </>
          ) : (
            <>
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PendingOrders;

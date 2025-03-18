import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import toast from "react-hot-toast";

const PendingOrders = () => {
  const [orders, setOrder] = useState([]);
  const [id, setid] = useState();
  let [counter, setcounter] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const SendId = async () => {
    if (id) {
      try {
        const req = await axios.post(
          `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-ID`,
          { ID: id },
          {
            withCredentials: true,
          }
        );
        if (req.status == 200) {
          window.location.href = "/OrderDetailsForUser";
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

  };

  const GetOrder = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Orders`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      
      setOrder(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChangeId = (value) => {
    setid(value);
    SendId();
  };

  useEffect(() => {
    GetOrder();
    SendId();
  }, []);
  return (
    <div className="container mt-5">
      <h3 
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            borderBottom: "3px solid #3498db",
            paddingBottom: "10px",
            width: "fit-content",
            margin: "0 auto 2rem auto",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            border: "1px solid #3498db",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            },
          }}
      className="text-center">الطلبات القائمة</h3>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="mt-2" variant="primary">
          بحث
        </Button>
      </Form>
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
              {   orders.filter((order)=>
            {
              return searchTerm === "" || order.id.includes(searchTerm)

            }).map((order) => (
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

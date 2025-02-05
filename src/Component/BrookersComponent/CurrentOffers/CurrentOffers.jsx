import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function CurrentOffers() {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);

  const [orders2, setOrders2] = useState([]);
  const [Tokeen, setTokeen] = useState(null)


  const SendIdSuccses = async (ID) => {
    console.log(ID);

    
    try {
      const req = await axios.post(
        `https://user.runasp.net/api/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "true",
        },
        {
          headers: {
            Authorization: `Bearer ${Tokeen}`,
          },
        }
      );
      console.log(ID);

      console.log(req);

      if (req.status == 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  // sadsssssssssssssssssssssssssss//

  const SendIdCancel = async (ID) => {
    const Tokken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiRFZFQUJNRDU2VlVFSTdONzY2REQ0Q1pPT1NKRTJER0YiLCJqdGkiOiIwZTkwNDc5Ni03YTM3LTQ3MTctYjYwZC03MmU0MDI5ZjJkNTMiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5NDQyODkyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.xlOr-vJB4pEIQgNetGVX7E0yDFUMZqgVR7uRbshqVys";
    try {
      const req = await axios.post(
        `https://user.runasp.net/api/Change-Statu-Broker`,
        {
          ID: ID,
          statuOrder: "false",
        },
        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
          },
        }
      );
      console.log(req);

      console.log(ID);
    } catch (error) {
      console.log(error);
    }
  };
  const GetValueCurrentOffers = async () => {
    try {
      const Tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiVUVPS0VGSFdTVUZFSjZHTldaN0NUNjVHNFU3TkFLU0UiLCJqdGkiOiJkMWEzOGZhYS1lNTkzLTRkZGYtYjE3ZS1iODQxNzY2Zjc0ZGEiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5Nzg2MDE4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.JIXiZiPeqqtdDbvqpYa7enC8mzfZX2_uLymCxcIbN_s";
      const { data } = await axios.get(
        `https://user.runasp.net/api/Order-Requests`,
        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
          },
        }
      );
      console.log(data);
      setOrders2(data);
    } catch (error) {}
  };

  const getValue = async () => {
    try {
      
      const { data } = await axios.get(
        `https://user.runasp.net/api/Current-Offers`,
        {
          headers: {
            Authorization: `Bearer ${Tokeen}`,
          },
        }
      );
      console.log(data);
      setOrders(data);
    } catch (error) {}
  };

  const handleOrderClick = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const GetTokken=localStorage.getItem("Tokken")
    setTokeen(GetTokken)    
    GetValueCurrentOffers();
    getValue();
    const t = moment();
    setDate(t.format("MMM Do YYYY | h:mm"));
  }, []);

  return (
    <>
      <div className="container mt-5   text-center">
        <h1 className="mb-5 font-weight-900 display-4 text-black">
          العروض القائمه
        </h1>

        <h3
          className="mb-4 text-green"
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
        >
          قائمة العروض المقدمة{" "}
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                <td>{order.date}</td>
                <td>{order.location}</td>
                <td>{order.id}</td>
                {order.statuOrder === "تحت الإجراء" && (
                  <button
                    onClick={() => setStatus("تحت الإجراء")}
                    className={`btn bg-primary w-100 ${
                      status === "تحت الإجراء"
                        ? "bg-primary"
                        : "btn-outline-primary"
                    }`}
                  >
                    تحت الإجراء
                  </button>
                )}

                {order.statuOrder === "تم التنفيذ" && (
                  <button
                    onClick={() => setStatus("تم التنفيذ")}
                    className={`btn bg-success w-100 ${
                      status === "تم التنفيذ"
                        ? "bg-success"
                        : "btn-outline-success"
                    }`}
                  >
                    تم التنفيذ
                  </button>
                )}

                {order.statuOrder === "ملغي" && (
                  <button
                    onClick={() => setStatus("ملغي")}
                    className={`btn bg-danger w-100 ${
                      status === "ملغي" ? "bg-danger" : "btn-outline-danger"
                    }`}
                  >
                    ملغي
                  </button>
                )}
              </tr>
            ))}
          </tbody>
        </Table>

        <hr
          style={{
            border: "1px solid #3498db",
            width: "100%",
            marginTop: "100px",
            marginBottom: "100px",
          }}
        />

        <h3
          className="mb-4 text-green"
          style={{
            marginTop: "50px",
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
        >
          قائمة العروض الجاريه{" "}
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>التاريخ</th>
              <th>اسم (الميناء/المطار)</th>
              <th>رقم الطلب</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders2.map((order) => (
              <tr key={order.id} onClick={() => handleOrderClick(order.id)}>
                <td>{order.date}</td>
                <td>{order.location}</td>
                <td>{order.id}</td>
                <button
                  onClick={() => SendIdSuccses(order.id)}
                  className="btn bg-success w-50"
                >
                  تنفيذ
                </button>
                <button
                  onClick={() => SendIdCancel(order.id)}
                  className="btn bg-danger w-50"
                >
                  ألغاء
                </button>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

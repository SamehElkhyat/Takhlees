import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function OrderDetailsForUser() {
  const [data, setdata] = useState();
  const [cost, setcost] = useState();
  const [allOrders, setallOrders] = useState([]);
  const [Tokeen, setTokeen] = useState(null)

  const SendValue = async () => {
    try {
      
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-all-Values`,

        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
          },
        }
      );
      setallOrders(data);
      
    } catch (error) {}
  };
  const SendId = async (OrderId,BrokerId) => {

    
    try {
      const Tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6ImUzMGU3YWYzLWYxNDktNGQ4ZC1iMDA3LWMxNWY0MmMyZGZhOSIsIkVtYWlsIjoiYWJkZWxtb2hzZW5AZ21haWwuY29tIiwiZnVsbE5hbWUiOiJhYmR1bGxhaCBtYWhtb3VkIGFiZGVsbW9oc2VuIiwicGhvbmVOdW1iZXIiOiIrMDU0ODQyMTU0ODU0IiwiSWRlbnRpdHkiOiI2NzMzNzA5ODQ4Iiwic2VjdXJpdHlTdGFtcCI6IjdCNks3U1RIV0QzNkRRSENXT0RJUVVXS01TVEpGTEk3IiwianRpIjoiMmQwYjZjZGItMDZmNy00ZDY5LTgxZmMtMjg5MzgzMWZjNGZkIiwiUm9sZSI6IlVzZXIiLCJleHAiOjE3Mzk3ODI4MzMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNjYiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2In0.bgY_OP6kGdlnXgocunUNQSECx_YwAfHmJWoQq1RPD58";

      const { data } = await axios.post(
        `https://user.runasp.net/api/Change-Satue`,{
          BrokerID: BrokerId,
          ID: OrderId,
        },
        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
          },
        }
     
      );
      
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const Tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiRFZFQUJNRDU2VlVFSTdONzY2REQ0Q1pPT1NKRTJER0YiLCJqdGkiOiIwZTkwNDc5Ni03YTM3LTQ3MTctYjYwZC03MmU0MDI5ZjJkNTMiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5NDQyODkyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.xlOr-vJB4pEIQgNetGVX7E0yDFUMZqgVR7uRbshqVys";

      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-Details`,
        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
          },
        }
      );

      setdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setcost(value.target.value);
  };
  useEffect(() => {
    const GetTokken=localStorage.getItem("Tokken")
    setTokeen(GetTokken)    
    SendValue();
    getOrders();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0 text-center">تفاصيل الطلب</h3>
          </div>
          <div className="card-body">
            {data ? (
              <>
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <h5 className="text-muted mb-3">معلومات الطلب</h5>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th>رقم الطلب</th>
                          
                            <td>{data.id}</td>
                          </tr>
                          <tr>
                            <th>تاريخ الطلب</th>
                            <td>{data.date}</td>
                          </tr>

                          <tr>
                            <th>نوع الشحنة</th>
                            <td>{data.typeOrder}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-md-6">
                      <h5 className="text-muted mb-3">معلومات الشحن</h5>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <th>الميناء/المطار</th>
                            <td>{data.location}</td>
                          </tr>
                          <tr>
                            <th>رقم البوليصة</th>
                            <td>{data.numberOflicense}</td>
                          </tr>
                          <tr>
                            <th>وزن الشحنة</th>
                            <td>{data.size}</td>
                          </tr>
                          <tr>
                            <th>عدد القطع</th>
                            <td>{data.number}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row mt-1">
                    <div className="col-12">
                      <h5 className="text-muted mb-3">ملاحظات إضافية</h5>
                      <div className="p-3 bg-light rounded">
                        <p className="mb-0">
                          يرجى التعامل مع الشحنة بعناية فائقة. تحتوي على مواد
                          قابلة للكسر.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
                ;
              </>
            ) : (
              <>
                <h1>warning</h1>
              </>
            )}

            <div className="row mt-4">
              <div className="col-12">
                <h5 className="text-muted mb-3">العروض المقدمة</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>رقم المعرف</th>
                      <th>التقييم</th>
                      <th>سعر العرض</th>
                      <th>الحاله</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((item) => (
                      <>
                        <tr>
                          <td>{item.id}</td>
                          <td>
                            <span className="text-warning">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                            </span>
                          </td>
                          <td>{item.value}</td>

                          <td>
                            {" "}
                            <Button
                            onClick={()=>{SendId(data.id,item.brokerID)}}
                            className="w-100 m-0" variant="success">
                              قبول
                            </Button>
                          </td>
                        </tr>
                        <tr></tr>
                      </>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

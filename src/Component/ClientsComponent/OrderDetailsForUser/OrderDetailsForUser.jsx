import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function OrderDetailsForUser() {
  const [data, setdata] = useState();
  const [cost, setcost] = useState();
  const [allOrders, setallOrders] = useState([]);

  const [FilesName, setFilesName] = useState(
    {
      commerce: "السجل التجاري",
      id: 0,
    },
    { commerce: "السجل الضريبي", id: 1 },
    { commerce: "البوليصه", id: 2 },
    { commerce: "شهاده المنشأ", id: 3 },
    { commerce: "ملفات اخري", id: 4 },
  );

  const SendValue = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-all-Values`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      console.log(data);

      setallOrders(data);
    } catch (error) {}
  };
  const SendId = async (OrderId, BrokerId) => {
    try {
      const data = await axios.post(
        `https://user.runasp.net/api/Change-Satue`,
        {
          BrokerID: BrokerId,
          ID: OrderId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      if (data.status == 200) {
        toast("تم قبول الطلب بنجاح");
        window.location.href = "/CurrentOrdersForUsers";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-Details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );

      setdata(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setcost(value.target.value);
  };
  useEffect(() => {
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


                  {data.fileName.map((item,i) => (
                    <>                 
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <th> الملفات</th>
                                <td>{item}</td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                  ))}

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
                              onClick={() => {
                                SendId(data.id, item.brokerID);
                              }}
                              className="w-100 m-0"
                              variant="success"
                            >
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

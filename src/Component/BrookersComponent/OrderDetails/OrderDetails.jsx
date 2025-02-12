import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function OrderDetails() {
  const [data, setdata] = useState();
  const [cost, setcost] = useState();
  const [allOrders, setallOrders] = useState([]);


  const [FilesName, setFilesName] = useState({
    commerce1: "السجل التجاري",
    commerce2: "السجل الضريبي",
    commerce3: "البوليصه",
    commerce4: "شهاده المنشأ",
    commerce5: "ملفات اخري",
  });

  let AllFilesHere = [];

  const DownloadFilesApi = async (index, orderId) => {
    try {
      const response = await axios.post(
        `https://user.runasp.net/api/DownloadFiles`,
        {
          newOrderId: orderId,
          Id: index,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
          responseType: "blob", // تحديد نوع الاستجابة كـ Blob
        }
      );

      // استخراج اسم الملف من Content-Disposition (إذا كان متوفرًا)
      console.log(response);

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/['"]/g, "") // استخراج الاسم
        : `${AllFilesHere[index]}.${response.data.type.split("/")[1]}`; // اسم افتراضي

      const blob = response.data; // البيانات كـ Blob
      const url = window.URL.createObjectURL(blob);

      // إنشاء رابط تنزيل تلقائي
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // تعيين اسم الملف
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // تنظيف الرابط المؤقت من الذاكرة
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("حدث خطأ أثناء تحميل الملف:", error);
    }
  };

  const SendValue = async (cost, orderValue) => {
    try {
      const {data}  = await axios.post(
        `https://user.runasp.net/api/Apply-Order`,
        {
          value: cost,
          newOrderId: orderValue,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );

      
    } catch (error) {}
  };

  const getValue = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setcost(value.target.value);
  };
  useEffect(() => {

    getValue();
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

                  {data.fileName.map((item, i) => AllFilesHere.push(item))}

                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>{FilesName.commerce1}</th>
                        <td>{AllFilesHere[0]}</td>
                        <th>
                          <i
                            onClick={() =>
                              DownloadFilesApi(
                                AllFilesHere.indexOf(AllFilesHere[0]),
                                data.id
                              )
                            }
                            className="fa-solid fa-download"
                          ></i>
                        </th>
                      </tr>

                      <tr>
                        <th>{FilesName.commerce2}</th>
                        <td>{AllFilesHere[1]}</td>
                        <th>
                          <i
                            onClick={() =>
                              DownloadFilesApi(
                                AllFilesHere.indexOf(AllFilesHere[1]),
                                data.id
                              )
                            }
                            className="fa-solid fa-download"
                          ></i>
                        </th>
                      </tr>
                      <tr>
                        <th>{FilesName.commerce3}</th>
                        <td>{AllFilesHere[2]}</td>
                        <th>
                          <i
                            onClick={() =>
                              DownloadFilesApi(
                                AllFilesHere.indexOf(AllFilesHere[2]),
                                data.id
                              )
                            }
                            className="fa-solid fa-download"
                          ></i>
                        </th>
                      </tr>

                      <tr>
                        <th>{FilesName.commerce4}</th>
                        <td>{AllFilesHere[3]}</td>
                        <th>
                          <i
                            onClick={() =>
                              DownloadFilesApi(
                                AllFilesHere.indexOf(AllFilesHere[3]),
                                data.id
                              )
                            }
                            className="fa-solid fa-download"
                          ></i>
                        </th>
                      </tr>
                      <tr>
                        <th>{FilesName.commerce5}</th>
                        <td>{AllFilesHere[4]}</td>
                        <th>
                          <i
                            onClick={() =>
                              DownloadFilesApi(
                                AllFilesHere.indexOf(AllFilesHere[4]),
                                data.id
                              )
                            }
                            className="cursor-pointer fa-solid fa-download"
                          ></i>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row mt-1">
                    <div className="col-12">
                      <h5 className="text-muted mb-3">ملاحظات إضافية</h5>
                      <div className="p-3 bg-light rounded">
                        <p className="mb-0">{data.notes}</p>
                      </div>
                    </div>
                  </div>
                </>
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
                      <th>عدد العمليات الناجحه</th>
                      <th>التقييم</th>
                      <th>سعر العرض</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">


                  {allOrders.length == 0 ? <></>:<>
  {allOrders.map((item) => (
                        <>
                          <tr>
                            <td>{item.count}</td>
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

        
                          </tr>
                          <tr></tr>
                        </>
                      ))}</>}
                        <tr></tr>
                  </tbody>
                </Table>

                <div className="mt-4">
                  <h5 className="text-muted mb-3">تقديم عرض جديد</h5>
                  <div className="input-group mb-3">
                    <input
                      onChange={(e) => handleChange(e)}
                      type="number"
                      className="form-control"
                      placeholder="ادخل سعر العرض بالريال"
                      aria-label="سعر العرض"
                    />
                    <button
                      onClick={() => {
                        SendValue(cost, data.id);
                      }}
                      className="btn btn-primary"
                      type="button"
                    >
                      تقديم العرض
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

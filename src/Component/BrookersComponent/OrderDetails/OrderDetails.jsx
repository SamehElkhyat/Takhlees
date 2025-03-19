import { Button } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function OrderDetails() {
  const [data, setdata] = useState([]);
  const [cost, setcost] = useState();
  const [allOrders, setallOrders] = useState([]);
  const [error, seterror] = useState([]);
  const [Rating, setRating] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [DecodedTokken, setDecodedTokken] = useState();


   const navigationToLandingpage = async () => {
      console.log(process.env.REACT_APP_API_URL);
  
      try {
        const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
          withCredentials: true,
        });
        setDecodedTokken(data.data.role);
      } catch (error) {

        console.log(error);
      }
    };

  const FilesName = {
    commerce: [
      "السجل التجاري",
      "السجل الضريبي",
      "البوليصه",
      "شهاده المنشأ",
      "ملفات اخري",
    ],
  };

  let AllFilesHere = [];

  let NewId = [];

  let NewAllfile = [];

  const DownloadFilesApi = async (index) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/DownloadFiles`,
        {
          newOrderId: NewId[0],
          Id: index,
        },
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      // استخراج اسم الملف من Content-Disposition (إذا كان متوفرًا)
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/['"]/g, "") // استخراج الاسم
        : `${index < 4 ? FilesName.commerce[index] : `ملفات إضافيه`}.${
            response.data.type.split("/")[1]
          }`; // اسم افتراضي

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
      toast.success("تم التحميل");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const SendValue = async (cost, orderValue) => {
    console.log(orderValue);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Apply-Order`,
        {
          value: cost,
          newOrderId: orderValue,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("تم تقديم الطلب بنجاح");
      getValue();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const mathmatecis = () => {
    console.log(Rating);
  };

  const getValue = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-all-Values`,
        {
          withCredentials: true,
        }
      );

      if (JSON.stringify(data) !== JSON.stringify(allOrders)) {
        setallOrders(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Details`,
        {
          withCredentials: true,
        }
      );

      setdata(data);
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (value) => {
    setcost(value.target.value);
  };
  useEffect(() => {
    navigationToLandingpage()
    getValue();
    getOrders();

  }, []);

  useEffect(() => {
    mathmatecis();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div
            style={{
              borderRadius: "15px",
              fontSize: "26px",
              fontWeight: "bold",
              backgroundColor: "green", // لون هادئ
              textAlign: "center",
              paddingBottom: "10px",
            }}
            className="card-header text-white"
          >
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: "10px",
              }}
            >
              تفاصيل الطلب
            </h3>
          </div>
          <div className="card-body">
            {data.length === 0 || error === "null" ? (
              <>
                <tr>
                  <td colSpan="5" className="text-center">
                    لا توجد تفاصيل للطلب{" "}
                  </td>
                </tr>
              </>
            ) : (
              <>
                {data.map((data, i) => (
                  <>
                    <p style={{ display: "none" }} className="">
                      {NewId.push(data.id)}
                      {AllFilesHere.push(data)}
                      {NewAllfile.push(AllFilesHere[0].fileName)}
                    </p>

                    <div className="row">
                      <div className="col-md-6">
                        <h5 className="text-black mb-3">معلومات الطلب</h5>
                        <table className="table table-bordered">
                          <tbody>
                            {data.town == null ? (
                              <></>
                            ) : (
                              <>
                                <tr>
                                  <th>طريقه النقل</th>

                                  <td>
                                    <Button className="bg-success text-white">
                                      يوجد نقل
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            )}
                            <tr>
                              <th>رقم الطلب</th>
                              <td>{data.id}</td>
                            </tr>
                            <tr>
                              <th>تاريخ الطلب</th>
                              <td>{data.date}</td>
                            </tr>
                            <tr>
                              <th>الميناء/المطار</th>
                              <td>{data.location}</td>
                            </tr>
                            <tr>
                              <th>رقم البوليصة</th>
                              <td>{data.numberOflicense}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="col-md-6">
                        <h5 className="text-black mb-3">معلومات الشحن</h5>
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <th>نوع الشحنة</th>
                              <td>{data.typeOrder}</td>
                            </tr>

                            {data.size == null ? (
                              <></>
                            ) : (
                              <>
                                {" "}
                                <tr>
                                  <th>وزن الشحنة</th>
                                  <td>{data.size}</td>
                                </tr>
                              </>
                            )}

                            <tr>
                              <th>عدد القطع</th>
                              <td>{data.number}</td>
                            </tr>

                            {data.town == null ? (
                              <></>
                            ) : (
                              <>
                                <h5 className="text-black pt-3 ">
                                  معلومات النقل
                                </h5>

                                <tr>
                                  <th>الحي</th>
                                  <td>{data.town}</td>
                                </tr>
                              </>
                            )}
                            {data.zipCode == null ? (
                              <></>
                            ) : (
                              <>
                                <tr>
                                  <th> الرمز البريدي</th>
                                  <td>{data.zipCode}</td>
                                </tr>
                              </>
                            )}
                            {data.city == null ? (
                              <></>
                            ) : (
                              <>
                                <tr>
                                  <th>المدينه</th>
                                  <td>{data.city}</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr className="h-50" />
                  </>
                ))}

                <table className="table table-bordered">
                  <tbody>
                    {data.length == 0 ? (
                      <>
                        <p>no data</p>
                      </>
                    ) : (
                      <>
                        {NewAllfile[0].map((AllFilesHere, i) => (
                          <>
                            {}
                            <tr
                              style={{
                                textAlign: "center",

                                borderColor: "solid",
                                borderWidth: "1px",
                              }}
                            >
                              <th>
                                {i <= 4 ? (
                                  <>{FilesName.commerce[i]}</>
                                ) : (
                                  <>ملفات اخري</>
                                )}
                              </th>
                              <td>{AllFilesHere}</td>
                              <th>
                                <i
                                  onClick={() => DownloadFilesApi(i, NewId[i])}
                                  className="fa-solid fa-download"
                                  style={{
                                    fontSize: "1.5rem", // حجم الأيقونة
                                    cursor: "pointer",
                                    transition:
                                      "transform 0.3s ease, color 0.3s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform =
                                      "scale(1.2) rotate(-10deg)"; // تكبير مع دوران خفيف
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform =
                                      "scale(1) rotate(0deg)"; // يرجع للحجم الطبيعي
                                  }}
                                ></i>
                              </th>
                            </tr>
                          </>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </>
            )}

            <div className="row mt-4">
              <div className="col-12">
                <h5 className="text-black mb-3">العروض المقدمة</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>رقم المعرف</th>

                      <th>التقييم</th>
                      <th>سعر العرض</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {allOrders.length == 0 ? (
                      <></>
                    ) : (
                      <>
                        {allOrders.map((item, i) => (
                          <>
                            <tr className="text-center">
                              <td>{item.brokerID}</td>
                              <td>
                                <span className="text-warning">
                                  {item.count === 0 && (
                                    <>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                    </>
                                  )}

                                  {item.count > 0 && item.count <= 5 && (
                                    <>
                                      <i className="fas fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                    </>
                                  )}

                                  {item.count > 5 && item.count <= 25 && (
                                    <>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                    </>
                                  )}

                                  {item.count > 25 && item.count <= 50 && (
                                    <>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="far fa-star"></i>
                                      <i className="far fa-star"></i>
                                    </>
                                  )}

                                  {item.count > 50 && item.count <= 100 && (
                                    <>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="far fa-star"></i>
                                    </>
                                  )}

                                  {item.count > 100 && (
                                    <>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                      <i className="fas fa-star"></i>
                                    </>
                                  )}
                                </span>
                              </td>

                              <td>{item.value}</td>
                            </tr>
                            <tr></tr>
                          </>
                        ))}
                      </>
                    )}
                    <tr></tr>
                  </tbody>
                </Table>

                {DecodedTokken ? (
                  <>
                    {DecodedTokken === "Admin" ? (
                      <></>
                    ) : (
                      <>
                        <div className="mt-4">
                          <h5 className="text-black mb-3">تقديم عرض جديد</h5>
                          <div className="input-group mb-3">
                            <input
                              onChange={(e) => handleChange(e)}
                              type="number"
                              className="form-control"
                              placeholder="ادخل سعر العرض بالريال"
                              aria-label="سعر العرض"
                            />
                            <Button
                              onClick={() => {
                                SendValue(cost, NewId[0]);
                              }}
                              variant="contained"
                            >
                              {" "}
                              تقديم العرض
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <Toaster />
    </>
  );
}

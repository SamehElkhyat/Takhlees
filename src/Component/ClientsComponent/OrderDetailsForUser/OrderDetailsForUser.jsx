import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function OrderDetailsForUser() {
  const [data, setdata] = useState([]);
  const [cost, setcost] = useState();
  const [allOrders, setallOrders] = useState([]);


  const FilesName = {
    commerce: ["السجل التجاري", "السجل الضريبي","البوليصه","شهاده المنشأ","ملفات اخري",]
  };

  let AllFilesHere = [];

  let NewId = [];

  let NewAllfile =[];

  const DownloadFilesApi = async (index, orderId) => {
    console.log(index);
    
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
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/['"]/g, "") // استخراج الاسم
        : `${NewAllfile[index][index]}.${response.data.type.split("/")[1]}`; // اسم افتراضي

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
      setallOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  const SendId = async (OrderId, BrokerId,value) => {
    
    try {
      const data = await axios.post(
        `https://user.runasp.net/api/Change-Satue`,
        {
          Value:value,
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

            {data.length == 0 ? <>
            <p key={1}>no data</p>
            
            </>:<>
            
              {data.map((data,i) => (
                  <>
<p style={{display:"none"}} className="">

{NewId.push(data.id)}
                     {AllFilesHere.push(data)}
                     {NewAllfile.push(AllFilesHere[0].fileName)}
</p>
                    <div key={i}  className="row">
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

 {data.size == null ? <></>:<>                           <tr>
                              <th>وزن الشحنة</th>
                              <td>{data.size}</td>
                            </tr></>}
                            <tr>
                              <th>عدد القطع</th>
                              <td>{data.number}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr className="h-50" />
                    
                  </>
                ))}
            

            <table className="table table-bordered">
                    <tbody>
      {data.length == 0 ? <>
      <p>no data</p>
      </>:<>
      
      {NewAllfile[0].map((AllFilesHere,i)=><>
                        

                          {}
                        <tr>
                        <th>{FilesName.commerce[i]}</th>
                        <td>{AllFilesHere}</td>
                        <th>
                          <i
                            onClick={() =>
                              DownloadFilesApi(
                                i,
                                NewId[i],
                              )
                            }
                            className="fa-solid fa-download"
                          ></i>
                        </th>
                      </tr>
                      
                      
                      </>)}
      </>}

                    </tbody>
                  </table>

            </>}


            <div className="row mt-4">
              <div className="col-12">
                <h5 className="text-muted mb-3">العروض المقدمة</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr key={'300'} className="text-center">
                      <th>رقم المعرف</th>
                      <th>التقييم</th>
                      <th>سعر العرض</th>
                      <th>الحاله</th>
                    </tr>
                  </thead>
                    {allOrders.length == 0 ? (
                      <></>
                    ) : (
                      <>
                        {allOrders.map((item,i) => (
                          <>
                        <tbody>

                            <tr key={i}>
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
                                <Button
                                  onClick={() => {
                                    SendId(data.id, item.brokerID,item.value);
                                  }}
                                  className="w-100 m-0"
                                  variant="success"
                                >
                                  قبول
                                </Button>
                              </td>
                            </tr>
                            <tr></tr>
                            </tbody>

                          </>
                          
                        ))}
                        
                      </>
                      
                    )}


                </Table>


              </div>
            </div>
          </div>
        </div>
      </div>

    </>
    
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function OrderDetails() {
  const [data, setdata] = useState();
  const [cost, setcost] = useState();
  const [allOrders ,setallOrders]= useState([]);
  const [Tokeen, setTokeen] = useState(null)


  const SendValue = async (cost, orderValue) => {
    try {
      const Tokken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjZhOTNjYTU5LWQ3MWUtNGVkMC04YzdhLWY5MmZjODY1ZTZmNCIsIkVtYWlsIjoiQnJva2VyQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQnJva2VyIiwicGhvbmVOdW1iZXIiOiI5NjM0LTk5MTk0IiwiSWRlbnRpdHkiOiIzMzMzMzMiLCJzZWN1cml0eVN0YW1wIjoiVUVPS0VGSFdTVUZFSjZHTldaN0NUNjVHNFU3TkFLU0UiLCJqdGkiOiJkMWEzOGZhYS1lNTkzLTRkZGYtYjE3ZS1iODQxNzY2Zjc0ZGEiLCJSb2xlIjoiQnJva2VyIiwiZXhwIjoxNzM5Nzg2MDE4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjY2IiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiJ9.JIXiZiPeqqtdDbvqpYa7enC8mzfZX2_uLymCxcIbN_s";

      const {data} = await axios.post(
        `https://user.runasp.net/api/Apply-Order`,
        {
          value: cost,
          newOrderId: orderValue,
        },

        {
          headers: {
            Authorization: `Bearer ${Tokken}`,
          },
        }
        
      );
      setallOrders(data)

    } catch (error) {}
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `https://user.runasp.net/api/Get-Details`,
        {
          headers: {
            Authorization: `Bearer ${Tokeen}`,
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
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((item)=><>

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
</tr>
<tr>

</tr>



                    </>)}

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

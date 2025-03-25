import * as React from "react";
import { ToggleButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Form, Card, Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Permissions() {
  const [users, setUsers] = useState([]);
  const [premisionsarr, setPremisionsarr] = useState([]);
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [Premetions, setPremetions] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({
    accountant: false,
    CustomerService: false,
    Statestics: false,
    Clients: false,
    Tracing: false,
    BlackList: false,
  });
  const MangerPrimetions = [];

  const handleToggle = (e) => {
    MangerPrimetions.push(e.target.value);
  };
  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);
    setBar(items);
    Premissions();
  };
  const handleCloseBar = () => {
    setBar(null);
    setPremetions(null);
  };
  const HandlePremetions = async (e) => {
    setPremetions(e.target.value);
  };
  const HandlePremetionsManger = async (e) => {
    MangerPrimetions.push(e.target.value);
  };

  const GetId = (index, OrderId) => {
    setOrderId(OrderId);
    setBar(index);
    Premissions(OrderId);
  };

  const Premissions = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-Permissions/${id}`,
        {
          withCredentials: true,
        }
      );

      setPremisionsarr(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changePremetions = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Change-Roles`,
        {
          ID: OrderId,
          roleName: Premetions,
        },
        {
          withCredentials: true,
        }
      );
      toast(data.message);

      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const DeletePremetions = async (value) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Delete-Permissions`,
        {
          ID: OrderId,
          NameOfPermissions: [value.target.value],
        },
        {
          withCredentials: true,
        }
      );
      toast(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const changePremetionsManger = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Set-Permissions`,
        {
          ID: OrderId,
          NameOfPermissions: MangerPrimetions,
        },
        {
          withCredentials: true,
        }
      );

      toast(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const CustomerService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/Get-All-Peaple-Admin`,
        {
          withCredentials: true,
        }
      );

      setIsLoading(false);

      setUsers(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    CustomerService();
  }, []);

  return (
    <Card className="p-4 shadow-lg rounded text-center">
      <h2 className="text-xl font-bold mb-4 text-center">إدارة الصلاحيات</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>رقم الهاتف</th>
            <th>رقم الهويه</th>
            <th>التخصيص</th>
            <th>الصلاحية</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.identity}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => GetId(index, user.id)}
                  className="px-4 py-2 rounded-pill shadow"
                >
                  إداره الصلاحيات
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        className="text-center"
        show={Bar !== null}
        onHide={handleCloseBar}
      >
        {/* رأس المودال مع تصميم مميز */}
        <Modal.Header
          closeButton
          className="bg-light rounded-top shadow-sm text-center"
        >
          <Modal.Title className="fs-3 fw-bold text-primary w-100 text-center d-flex justify-content-center align-items-center">
            إداره الصلاحيات
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4 bg-light rounded-bottom text-center">
          {/* قسم التحميل مع زر مميز */}
          <div className="d-inline-block w-100 text-center">
            <Form.Control onClick={(e) => HandlePremetions(e)} as="select">
              <option value="">اختر نوع الطلب</option>
              <option value="Account">محاسب</option>
              <option value="Manager">مدير</option>
              <option value="CustomerService">خدمه عملاء</option>
              <option value="User">عميل</option>
              <option value="Broker">مخلص</option>
            </Form.Control>
          </div>

          {Premetions == "Manager" ? (
            <>
              <Modal.Title className="fs-3 fw-bold text-success w-100 text-center d-flex justify-content-center align-items-center">
                تخصيص صلاحيات المدير
              </Modal.Title>
              <ToggleButton
                value="accountant"
                selected={selectedPermissions.accountant}
                onChange={(e) => handleToggle(e)}
              >
                اداره المحاسبين
              </ToggleButton>
              <ToggleButton
                value="CustomerService"
                selected={selectedPermissions.CustomerService}
                onChange={(e) => handleToggle(e)}
              >
                اداره خدمه العملاء
              </ToggleButton>
              <ToggleButton
                value="Statestics"
                selected={selectedPermissions.Statestics}
                onChange={(e) => handleToggle(e)}
              >
                الاطلاع علي الاحصائيات
              </ToggleButton>
              <ToggleButton
                value="Clients"
                selected={selectedPermissions.Clients}
                onChange={(e) => handleToggle(e)}
              >
                اداره العملاء
              </ToggleButton>
              <ToggleButton
                value="Tracing"
                selected={selectedPermissions.Tracing}
                onChange={(e) => handleToggle(e)}
              >
                متابعه الطلبات
              </ToggleButton>
              <ToggleButton
                value="BlackList"
                selected={selectedPermissions.BlackList}
                onChange={(e) => handleToggle(e)}
              >
                الاطلاع علي المحظورين
              </ToggleButton>
              <Button
                variant="success"
                onClick={() => changePremetionsManger()}
                className="px-4 py-2 rounded-pill shadow"
              >
                تأكيد لتخصيص صلاحيات المدير
              </Button>
              <Modal.Title className="fs-3 fw-bold text-success w-100 text-center d-flex justify-content-center align-items-center">
                تخصيصات المدير
              </Modal.Title>
              {premisionsarr.map((item) => (
                <>
                  {item.type == "CustomerService" ? (
                    <>
                      <ToggleButton
                        className="position-relative"
                        id="ToggleButtonValue"
                        value="CustomerService"
                        selected={selectedPermissions.CustomerService}
                      >
                        اداره خدمه العملاء
                      </ToggleButton>
                    </>
                  ) : item.type == "Statestics" ? (
                    <>
                      <ToggleButton
                        className="position-relative"
                        id="ToggleButtonValue"
                        value="Statestics"
                        selected={selectedPermissions.Statestics}
                      >
                        الاطلاع علي الاحصائيات
                      </ToggleButton>
                    </>
                  ) : item.type == "Clients" ? (
                    <>
                      <ToggleButton
                        className="position-relative"
                        id="ToggleButtonValue"
                        value="Clients"
                        selected={selectedPermissions.Clients}
                      >
                        اداره العملاء
                      </ToggleButton>
                    </>
                  ) : item.type == "BlackList" ? (
                    <>
                      <ToggleButton
                        className="position-relative"
                        id="ToggleButtonValue"
                        value="BlackList"
                        selected={selectedPermissions.BlackList}
                      >
                        الاطلاع علي المحظورين
                      </ToggleButton>
                    </>
                  ) : item.type == "Tracing" ? (
                    <>
                      <ToggleButton
                        onClick={(e) => DeletePremetions(e)}
                        className="position-relative"
                        id="ToggleButtonValue"
                        value="Tracing"
                        selected={selectedPermissions.Tracing}
                      >
                        متابعه الطلبات
                      </ToggleButton>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </>
          ) : (
            <></>
          )}
        </Modal.Body>

        <Modal.Footer className="bg-light border-0 text-center">
          <Button
            variant="success"
            onClick={() => changePremetions()}
            className="px-4 py-2 rounded-pill shadow"
          >
            تأكيد تغير الصلاحيه
          </Button>
          <Button
            variant="danger"
            onClick={handleCloseBar}
            className="px-4 py-2 rounded-pill shadow"
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </Card>
  );
}

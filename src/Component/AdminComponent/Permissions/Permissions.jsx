import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Form, Card, Modal, Button, Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
export default function Permissions() {
  const [users, setUsers] = useState([]);
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [Premetions, setPremetions] = useState(null);

  const [IsLoading, setIsLoading] = useState(false);

  const handleShowBar = (items, orderId) => {
    setOrderId(orderId);

    setBar(items);
  };
  const handleCloseBar = () => {
    setBar(null);
  };

  const changePremetions = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://takhleesak.runasp.net/api/Change-Roles`,
        {
          email: OrderId,
          roleName: Premetions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      toast(data.message);
      CustomerService()

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const HandlePremetions = async (e) => {
    setPremetions(e.target.value);
  };

  const CustomerService = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://takhleesak.runasp.net/api/Get-All-Peaple-Admin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );

      setIsLoading(false);

      setUsers(data);
    } catch (error) {
      console.log(error);
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
                  onClick={() => handleShowBar(index, user.email)}
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
            </Form.Control>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-light border-0 text-center">
          <Button
            variant="success"
            onClick={changePremetions}
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

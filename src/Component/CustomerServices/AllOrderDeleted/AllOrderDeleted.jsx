import { useEffect, useState } from "react";
import {
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { Modal } from "react-bootstrap";

export default function AllOrderDeleted() {
  const [showNoteField, setShowNoteField] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [showNoteField2, setShowNoteField2] = useState({}); // حالة لإظهار حقل الإدخال عند الحاجة
  const [DecodedTokken, setDecodedTokken] = useState();
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [notes, setNotes] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowDetails = (order, BrokerId) => {
    setSelectedOrder(order);
    getAllInformationBroker(BrokerId);
  };
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
  const navigationToLandingpage = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/Profile`, {
        withCredentials: true,
      });
      setDecodedTokken(data.data.role);
    } catch (error) {
      setIsloading(false);

      console.log(error);
    }
  };

  const getAllDeletedOrders = async (BrokerId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE2}/Get-Deleted-Orders`,
        {
          withCredentials: true,
        }
      );
      console.log(data);

      setCustomers(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleNoteChange = (id, value) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: value }));
  };

  const toggleNoteField = (id) => {
    setShowNoteField((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleNoteField2 = (id) => {
    setShowNoteField2((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedCustomers = [...customers].sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );
  useEffect(() => {
    getAllDeletedOrders();
    navigationToLandingpage();
  }, []);

  return (
    <Box width="100%" textAlign="center" p={4}>
      <h1
        className="text-xl font-bold mb-4"
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          borderBottom: "3px solid #3498db",
          paddingBottom: "10px",
          width: "fit-content",
          margin: "0 auto 2rem auto",
          borderRadius: "10px",
          backgroundColor: "#0A6785",
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
        الطلبات المحذوفه
      </h1>

      <div className="table-responsive mt-3">
        <table className="table table-bordered text-center shadow-sm">
          <thead className="bg-white border">
            <tr>
              <th>رقم الطلب</th>

              <th>الموقع</th>
              <th>الملاحظات</th>
              {DecodedTokken ? (
                <>
                  {DecodedTokken === "Admin" ? (
                    <>
                      <th>خدمه العملاء</th>
                      <th>بريد خدمه العملاء</th>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}

              <th>نوع الطلب</th>
              <th>التاريخ</th>
              <th>حاله الطلب</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map((customer, index) => (
              <tr key={index} className="bg-light">
                <td>{customer.id}</td>
                <td>{customer.location}</td>
                <td>{customer.notes}</td>
                <td>
                  {DecodedTokken ? (
                    <>
                      {DecodedTokken === "Admin" ? (
                        <>
                          <td>{customer.customerServiceEmail}</td>
                          <td>{customer.customerServiceName}</td>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td>{customer.typeOrder}</td>

                <td>{customer.date}</td>
                <td>
                  <Button className="bg-danger text-white p-2">
                    {customer.statuOrder}
                  </Button>
                </td>
              </tr>
            ))}

            <Modal
              className="text-end"
              show={selectedOrder !== null}
              onHide={handleCloseDetails}
            >
              <Modal.Header closeButton>
                <Modal.Title>تفاصيل الطلب</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedOrder && (
                  <>
                    <p>
                      {selectedOrder.email} <strong>:البريد الإكتروني</strong>
                    </p>
                    <p>
                      <strong>الاسم:</strong> {selectedOrder.fullName}
                    </p>
                    <p>
                      <strong>رقم الهويه:</strong> {selectedOrder.identity}
                    </p>
                    <p>
                      <strong>رقم الهاتف:</strong> {selectedOrder.phoneNumber}
                    </p>
                    <p>
                      <strong>رخصه المخلص:</strong> {selectedOrder.license}
                    </p>
                    <p>
                      <strong>الرقم الضريبي:</strong> {selectedOrder.taxRecord}
                    </p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetails}>
                  إغلاق
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </table>
      </div>
    </Box>
  );
}

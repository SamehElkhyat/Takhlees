import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";

const Portfolio = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [balance, setBalance] = useState(1500); // مثال على الرصيد


  const allOrders = async ()=>{
    try {
      const {data}= await axios.get(`https://user.runasp.net/api/Wallet`,{
    
        headers:{
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
    
       }})
       console.log(data.response);
       
       setOrders(data);
    } catch (error) {
      
      console.log(error.response.data.message);
      
    }
  

  }


  // فلترة الطلبات بناءً على البحث


  // فتح تفاصيل الطلب
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  // إغلاق نافذة التفاصيل
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };
useEffect(()=>{
  allOrders()
},[])
  return (
    <div className="container mt-5">
      <h3 className="mb-4">المحفظة</h3>

      {/* الرصيد */}
      <div className="mb-4">
        <h5>الرصيد الحالي: {balance} ريال</h5>
      </div>

      {/* البحث */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="mt-2" variant="primary">
          بحث
        </Button>
      </Form>

      {/* قائمة الطلبات المنجزة */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>موقع الطلب</th>
            <th>نوع الطلب</th>
            <th>الحالة</th>
            <th>المبلغ</th>
            <th>التفاصيل</th>
          </tr>
        </thead>
        <tbody>
          {console.log(filteredOrders)
          }
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.location}</td>
              <td>{order.typeOrder}</td>
              <td>{order.statuOrder}</td>
              <td>{order.value} ريال</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleShowDetails(order)}
                >
                  عرض التفاصيل
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* نافذة تفاصيل الطلب */}
      <Modal show={selectedOrder !== null} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل الطلب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>رقم الطلب:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>موقع الطلب:</strong> {selectedOrder.location}
              </p>
              <p>
                <strong>نوع الطلب:</strong> {selectedOrder.typeOrder}
              </p>
              <p>
                <strong>الحالة:</strong> {selectedOrder.statuOrder}
              </p>
              <p>
                <strong>المبلغ:</strong> {selectedOrder.value} ريال
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
    </div>
  );
};

export default Portfolio;

import React, { useState } from 'react';
import { Table, Form, Button, Modal } from 'react-bootstrap';

const Portfolio = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      location: 'الرياض',
      type: 'طبليه',
      status: 'تم التنفيذ',
      details: 'تم تسليم الطلب بنجاح إلى الموقع المحدد.',
      amount: 500,
    },
    {
      id: 2,
      location: 'جدة',
      type: 'حاويه',
      status: 'تم التنفيذ',
      details: 'تم تحميل الحاوية بنجاح إلى السفينة.',
      amount: 1000,
    },
    { id: 3, location: 'القاهره', type: 'حاويه', status: 'تم التنفيذ', details: 'تم تحميل الحاوية بنجاح إلى السفينة.', amount: 1000 },
    { id: 4, location: 'المدينه المنوره', type: 'طبليه', status: 'تم التنفيذ', details: 'تم تسليم الطلب بنجاح إلى الموقع المحدد.', amount: 500 },
    { id: 5, location: 'الجيزه', type: 'وزن', status: 'تم التنفيذ', details: 'تم تسليم الطلب بنجاح إلى الموقع المحدد.', amount: 200 },
  ]);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [balance, setBalance] = useState(1500); // مثال على الرصيد

  // فلترة الطلبات بناءً على البحث
  const handleSearch = () => {
    const filtered = orders.filter(
      (order) =>
        order.location.includes(searchTerm) ||
        order.type.includes(searchTerm) ||
        order.status.includes(searchTerm)
    );
    setFilteredOrders(filtered);
  };

  // فتح تفاصيل الطلب
  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  // إغلاق نافذة التفاصيل
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

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
        <Button className="mt-2" variant="primary" onClick={handleSearch}>
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
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.location}</td>
              <td>{order.type}</td>
              <td>{order.status}</td>
              <td>{order.amount} ريال</td>
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
              <p><strong>رقم الطلب:</strong> {selectedOrder.id}</p>
              <p><strong>موقع الطلب:</strong> {selectedOrder.location}</p>
              <p><strong>نوع الطلب:</strong> {selectedOrder.type}</p>
              <p><strong>الحالة:</strong> {selectedOrder.status}</p>
              <p><strong>المبلغ:</strong> {selectedOrder.amount} ريال</p>
              <p><strong>التفاصيل:</strong> {selectedOrder.details}</p>
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

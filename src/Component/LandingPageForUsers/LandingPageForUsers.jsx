import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const LandingPageForUsers = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row className="text-center w-100">
        <Col sm={12} md={4}>
          <Card className="shadow-lg p-4 mb-4 bg-white rounded border-0">
            <Card.Body>
              <Card.Title className="fs-3 text-primary fw-bold">🚀 طلب جديد</Card.Title>
              <Card.Text className="text-muted">إنشاء طلب جديد بسهولة وسرعة</Card.Text>
              <Button variant="primary" className="fw-bold px-4 py-2"><Link className='text-decoration-none text-white' to="/NewOrder">ابدأ الآن</Link></Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card className="shadow-lg p-4 mb-4 bg-white rounded border-0">
            <Card.Body>
              <Card.Title className="fs-3 text-success fw-bold">📋 الطلبات القائمة</Card.Title>
              <Card.Text className="text-muted">تحقق من طلباتك الحالية وتتبع تقدمها</Card.Text>
              <Button variant="success" className="fw-bold px-4 py-2"><Link className='text-decoration-none text-white' to='/Orders'>عرض الطلبات</Link></Button>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={4}>
          <Card className="shadow-lg p-4 mb-4 bg-white rounded border-0">
            <Card.Body>
              <Card.Title className="fs-3 text-success fw-bold">📋 الطلبات الجاريه</Card.Title>
              <Card.Text className="text-muted">تحقق من طلباتك الجاريه وتتبع تقدمها</Card.Text>
              <Button variant="success" className="fw-bold px-4 py-2"><Link className='text-decoration-none text-white' to='/Orders'>عرض الطلبات الجاريه</Link></Button>
            </Card.Body>
          </Card>
        </Col>


        <Col sm={12} md={4}>
          <Card className="shadow-lg p-4 mb-4 bg-white rounded border-0">
            <Card.Body>
              <Card.Title className="fs-3 text-warning fw-bold">💰 المحفظة</Card.Title>
              <Card.Text className="text-muted">إدارة رصيدك ومعاملاتك المالية بسهولة</Card.Text>
              <Button variant="warning" className="fw-bold px-4 py-2 text-dark"><Link className='text-decoration-none text-white' to='/cart'>عرض المحفظه</Link></Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default LandingPageForUsers;

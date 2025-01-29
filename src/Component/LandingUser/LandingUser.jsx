import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const HomePage = () => {


  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">مرحباً بك!</h1>
      <h5 className="text-muted mb-4">اختر ما تريد القيام به:</h5>
      <Row className="justify-content-center">
        <Col md={4} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>الطلبات الجديدة</Card.Title>
              <Card.Text>إنشاء طلب جديد بسرعة وسهولة.</Card.Text>
              <Button
                variant="primary"
        
              >
                الذهاب إلى الطلبات الجديدة
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>الطلبات القائمة</Card.Title>
              <Card.Text>عرض وإدارة طلباتك الحالية.</Card.Text>
              <Button
                variant="success"
              >
                الذهاب إلى الطلبات القائمة
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>المحفظة</Card.Title>
              <Card.Text>إدارة الأموال والرصيد الخاص بك.</Card.Text>
              <Button
                variant="warning"
              >
                الذهاب إلى المحفظة
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

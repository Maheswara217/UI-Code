import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { calculatePointsPerCustomer } from '../utils/points-calculation.util';
import { fetchTransactions } from '../http-services/Api';


const RewardPoints = () => {
  const [data, setData] = useState({ transactions: [], loading: true, error: null });

  useEffect(() => {
    fetchTransactions()
      .then((transactions) => {
        const pointsData = calculatePointsPerCustomer(transactions);
        setData({ transactions: pointsData, loading: false, error: null });
      })
      .catch((error) => {
        setData({ transactions: [], loading: false, error: error.message });
      });
  }, []);

  if (data.loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (data.error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{data.error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {Object.keys(data.transactions).map((customerId) => (
        <Card className="mb-3" key={customerId}>
          <Card.Header>Customer {customerId}</Card.Header>
          <Card.Body>
            {Object.keys(data.transactions[customerId].months).map((month) => (
              <Row key={month}>
                <Col>
                  <Card.Text>
                    <strong>{month}:</strong> {data.transactions[customerId]?.months[month]} points
                  </Card.Text>
                </Col>
              </Row>
            ))}
            <Row>
              <Col>
                <Card.Text>
                  <strong>Total Points:</strong> {data.transactions[customerId]?.total}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default RewardPoints;

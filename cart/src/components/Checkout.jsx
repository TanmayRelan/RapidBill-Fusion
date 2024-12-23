import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import './CheckoutPage.css'; // Make sure to add the custom styles.

const CheckoutPage = () => {
  const { state } = useLocation(); // Receives state (e.g., total amount)
  const [timeLeft, setTimeLeft] = useState(30); // Set timer to 30 seconds
  const [checkoutStatus, setCheckoutStatus] = useState("Pending");
  const [paymentReceived, setPaymentReceived] = useState(false); // Track payment status
  const [showModal, setShowModal] = useState(false); // Show payment success modal
  const navigate = useNavigate();

  const db = getDatabase(); // Firebase reference

  // Listen for payment status updates from Firebase
  useEffect(() => {
    const paymentRef = ref(db, "payment/status"); // Firebase path for payment status
    onValue(paymentRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.paymentReceived) {
        setPaymentReceived(true);
        setCheckoutStatus("Payment Received");
      }
    });
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft === 0 && checkoutStatus === "Pending") {
      setCheckoutStatus("Payment Failed");
      navigate("/paymentfailed", { state: { total: state, status: "Failed" } });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, [timeLeft, checkoutStatus, state, navigate]);

  useEffect(() => {
    if (paymentReceived) {
      setTimeout(() => {
        setShowModal(true); // Show success pop-up when payment is received
      }, 1000); // Delay to show modal after updating status
    }
  }, [paymentReceived]);

  const handleCheckout = () => {
    setCheckoutStatus("Checkout complete!");
    setTimeLeft(0); // Stop the timer
    // Navigate to Thank You screen with a 1-second delay
    setTimeout(() => {
      navigate("/thankyou", { state: { total: state, status: "Completed" } });
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/thankyou", { state: { total: state, status: "Completed" } });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="checkout-card">
            <Card.Body className="p-5">
              <h3 className="text-center mb-4">Checkout</h3>
              <p className="text-center fs-5 fw-light">Total: ₹{state || "0.00"}</p>

              <div className="text-center mb-4">
                <h5>Time Remaining: {timeLeft} seconds</h5>
              </div>

              <div className="text-center mb-4">
                <h6>Status: {checkoutStatus}</h6>
              </div>

              {/* Display QR Code until payment is received */}
              {!paymentReceived && (
                <div className="text-center mb-4">
                  <h6>Scan to Pay:</h6>
                  <img
                    src="/images/qr.jpg"
                    alt="QR Code"
                    className="qr-code"
                  />
                </div>
              )}

              {/* Show button only if payment is still pending */}
              <div className="text-center">
                {checkoutStatus === "Pending" && (
                  <Button variant="primary" onClick={handleCheckout} className="checkout-btn">
                    Complete Checkout
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment success modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h2>
            <span role="img" aria-label="checkmark">
              ✅
            </span>
          </h2>
          <p>Your payment has been successfully received!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Continue to Thank You Page
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;

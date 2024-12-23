import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Cart = ({ cartItemsFromPredictions }) => {
  const [cartItems, setCartItems] = useState(cartItemsFromPredictions || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "User");
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    if (cartItems.length > 0) {
      const totals = cartItems.reduce(
        (acc, item) => {
          acc.totalPrice += item.price * item.quantity;
          acc.totalWeight += item.weight * item.quantity;
          return acc;
        },
        { totalPrice: 0, totalWeight: 0 }
      );

      setTotalPrice(totals.totalPrice);
      setTotalWeight(totals.totalWeight);
    }
  }, [cartItems]);

  const handlePayment = () => {
    navigate("/thankuscreen");
  };

  return (
    <Container className="cart-container py-4">
      <Row className="mb-4">
        <Link
          to="/scanneditems"
          className="btn btn-outline-primary mb-3"
          style={{
            textDecoration: "none",
            display: "inline-block",
            borderRadius: "30px",
            padding: "10px 20px",
            borderColor: "#007bff", // Change border color to blue
          }}
        >
          ← Continue Shopping
        </Link>
      </Row>
      <Row>
        <Col md={8}>
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-item d-flex align-items-center p-3 mb-3"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", borderRadius: "8px" }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <p className="mb-1" style={{ fontWeight: "bold", color: "#333" }}>
                      {item.name}
                    </p>
                    <p className="mb-0 text-muted">
                      Weight: {item.weight}g, Price: ₹{item.price.toFixed(2)}
                    </p>
                    <p className="mb-0 text-muted">
                      Quantity: {item.quantity} | Subtotal: ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">Your cart is empty.</p>
            )}
          </div>
        </Col>
        <Col md={4}>
          <div
            className="cart-summary p-4"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#fefefe",
              boxShadow: "0 4px 8px rgba(25, 5, 65, 0.1)",
            }}
          >
            <h5 className="mb-3" style={{ color: "#555" }}>
              Cart Summary
            </h5>
            <div className="summary-item d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item d-flex justify-content-between mb-2">
              <span>GST (18%):</span>
              <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-item d-flex justify-content-between mb-3">
              <span>Total:</span>
              <span>₹{(totalPrice + totalPrice * 0.18).toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary w-100"
              style={{ borderRadius: "30px", padding: "10px 0" }}
              onClick={handlePayment}
            >
              Pay Now →
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

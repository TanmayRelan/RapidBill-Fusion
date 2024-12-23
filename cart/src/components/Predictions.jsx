import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Predictions = ({ setPredictedCartItems, predictedCartItems }) => {
    const navigate = useNavigate()
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);

    // Items with a base weight and price
    const items = [
        { id: 1, name: "Neivia Body Milk Moisturiser 250g", baseWeight: 250, price: 249, image: "/images/moisturiser.png", quantity: 1, label: "moisturiser" },
        { id: 2, name: "Oddy Double Tape 70g", baseWeight: 70, price: 45, image: "/images/tape.png", quantity: 1, label: "tape" },
        { id: 3, name: "Fresh Pomegranate 120g", baseWeight: 120, price: 90, image: "/images/anar.png", quantity: 1, label: "anar" },
        { id: 4, name: "Spectacles", baseWeight: 170, price: 999, image: "/images/spectacles.png", quantity: 1, label: "spectacles" },
        { id: 5, name: "Wipro Smart Bulb 140g", baseWeight: 140, price: 499, image: "/images/wipro_bulb.png", quantity: 1, label: "bulb" },
    ];

    useEffect(() => {
        let interval = setInterval(() => {
            getData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get("http://192.168.18.77/predictions"); // Update with ESP32-CAM IP
            const result = response.data;

            if (result?.detections?.length > 0) {
                const detectedLabel = result.detections[0].label;

                // Find the item that matches the detected label
                let data = items.find((i) => i.label == detectedLabel);

                // Check if the item already exists in the predicted cart
                let productExist = predictedCartItems.some((i) => i.id == data.id);

                // Only add the item if it doesn't already exist
                if (!productExist) {
                    console.log("Adding product:", data);
                    setPredictedCartItems((prev) => {
                        // Ensure the update is based on the latest state
                        if (!prev.some((item) => item.id === data.id)) {
                            return [...prev, data];
                        }
                        return prev; // Prevent adding duplicate
                    });
                } else {
                    console.log("Product already exists in the cart.");
                }
            }

        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative quantity
        setPredictedCartItems((prev) =>
            prev.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Function to simulate the fluctuation of weight for load cell error
    const getFluctuatedWeight = (baseWeight) => {
        // Create 10 weight variations with ±20g error
        const weightVariations = Array.from({ length: 10 }, (_, i) => baseWeight + (Math.random() * 40 - 20)); // ±20g error
        // Randomly select one of the weights
        return weightVariations[Math.floor(Math.random() * weightVariations.length)];
    };

    useEffect(() => {
        // Recalculate totals only when cart items change
        const total = predictedCartItems.reduce(
            (acc, item) => {
                const fluctuatedWeight = getFluctuatedWeight(item.baseWeight); // Get fluctuated weight for each item
                acc.totalPrice += item.price * item.quantity;
                acc.totalWeight += fluctuatedWeight * item.quantity;
                return acc;
            },
            { totalPrice: 0, totalWeight: 0 }
        );
        setTotalPrice(total.totalPrice);
        setTotalWeight(total.totalWeight);
    }, [predictedCartItems]); // Trigger recalculation on cart change

    const phoneNumber = '7380280275'; // Replace with recipient's number
    const message = `Your Bill `; // Replace with your message

    const sendMessage = () => {
        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <Container fluid>
            <div className='py-5'>
                <h1 className='text-center'>Shopping Cart </h1>
            </div>
            <Row>
                <Col md={7}>
                    <div className="item" style={{ height: "relative" }}>
                        {predictedCartItems.length > 0 ? (
                            predictedCartItems.map((item) => (
                                <div key={item.id} className="item-card d-flex justify-content-between my-4">
                                    <div className="item-details d-flex">
                                        <div className="item-image">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        </div>
                                        <div style={{ marginLeft: "10px" }}>
                                            <p className="blueText mb-0">{item.name}</p>
                                            <p className="redText">
                                                {item.baseWeight}g, ${item.price.toFixed(2)} each
                                            </p>
                                            <div className="quantity-control">
                                                <button
                                                    className="less-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="more-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="total">
                                                Total: ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                </Col>

                <Col md={5}>
                    <div className="cart-summary" style={{ height: "350px" }}>
                        <h4 className='text-center'>Cart Summary</h4>
                        <div className="total d-flex justify-content-between">
                            <p>Subtotal</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="total d-flex justify-content-between">
                            <p>GST (18%)</p>
                            <p>${(totalPrice * 0.18).toFixed(2)}</p>
                        </div>
                        <div className="total d-flex justify-content-between">
                            <p>Total</p>
                            <p>${(totalPrice + totalPrice * 0.18).toFixed(2)}</p>
                        </div>
                        <button
                            className="pay-btn"
                            style={{
                                padding: "10px 20px",
                                border: "none",
                                backgroundColor: "green",
                                color: "white",
                                borderRadius: "20px",
                            }}
                            onClick={() => predictedCartItems.length > 0 && navigate("/checkout", { state: totalPrice })}
                        >
                            Pay Now →
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Predictions;

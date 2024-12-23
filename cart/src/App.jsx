import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./components/Cart"; // The updated Cart component
import Predictions from "./components/Predictions"; // Assuming you have a Predictions componentimport ThankYouScreen from "./components/ThankuScreen"; // A screen for confirmation after payment
import './App.css'
import CheckoutPage from './components/Checkout';
import Login from './components/Login';
import Signup from './components/Signup';
import ThankYouScreen from './components/ThankuScreen';
import LandingPage from './components/LandingPage';
import PaymentFailedScreen from './components/PaymentFailedScreen';

const App = () => {
  const [predictedCartItems, setPredictedCartItems] = useState([]);

  console.log(predictedCartItems)

  return (
    <Router>
      <div className="app">
      
        <Routes>
          <Route
            path="/"
            element={<Predictions setPredictedCartItems={setPredictedCartItems} predictedCartItems={predictedCartItems}/>}
          />
          <Route
            path="/cart"
            element={<Cart cartItemsFromPredictions={predictedCartItems} />}
          />
          <Route
            path="/login"
            element={<Login  />}
          />
          <Route
            path="/signup"
            element={<Signup/>}
          />
          <Route path="/thank-you" element={<ThankYouScreen />} />
          <Route path="/paymentfailed" element={<PaymentFailedScreen />} />
          <Route
            path="/landingpage"
            element={<LandingPage  />}
          />
          {/* <Route
            path="/thankuscreen"
            element={<ThankYouScreen />}
          /> */}
         
          <Route path="/checkout" element={<CheckoutPage />} />

          
        </Routes>
        
      </div>
      
    </Router>
  );
};

export default App;

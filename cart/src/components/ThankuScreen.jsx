import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ThankYouScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page after 15 seconds
    const timeout = setTimeout(() => {
      navigate("/"); // Redirect to the landing page
    }, 15000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-4 bg-white rounded shadow">
        <h1 className="text-success mb-3">Thank You!</h1>
        <p className="mb-2">Your transaction has been successfully completed.</p>
        <p className="text-muted">You will be redirected to the home page in 15 seconds...</p>
        <div className="spinner-border text-success mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;

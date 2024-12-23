import React from "react";
import { Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="animated-landing-page">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-animation">
          <h1 className="display-3 text-light fw-bold">RAPID BILL FUSION</h1>
          <p className="text-light mt-4">
            Where speed meets precision. Experience billing like never before.
          </p>
          <Button
            href="/signup"
            className="btn btn-primary btn-lg shadow-lg mt-3"
          >
            Explore Now
          </Button>
        </div>
        <div className="floating-elements">
          <div className="circle"></div>
          <div className="square"></div>
          <div className="triangle"></div>
        </div>
      </section>


      <footer className="py-4 text-center bg-dark text-light">
        &copy; 2024 RAPID BILL FUSION. Innovating Billing Solutions.
      </footer>
    </div>
  );
};

export default LandingPage;

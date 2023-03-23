import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container mx-auto">
      <div className="footer_content ml-2">
        <div className="">
          <h1>CyberMovie</h1>
          <li><a href="">About</a></li>
          <li><a href="">Gift card</a></li>
          <li><a href="">Operating Regulations</a></li>
          <li><a href="">Privacy Policy</a></li>
        </div>
        <div className="">
          <h3>
            Support
          </h3>
          <div>
            <li><a href="">Feedback</a></li>
            <li><a href="">Sale & Service</a></li>
          </div>
        </div>
        <div className="">
          <h3>Customer Care</h3>
          <div>
            <li>Hotline: 1900 0000</li>
            <li>Work time: 8:00 - 22:00</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

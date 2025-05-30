import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  return (
    <div className="payment-result">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      {orderId && <p>Your order ID: {orderId}</p>}
      <button onClick={() => navigate("/my-courses")}>
        Access Your Course
      </button>
    </div>
  );
};

export default PaymentSuccess;

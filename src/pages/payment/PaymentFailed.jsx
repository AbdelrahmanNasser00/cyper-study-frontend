import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-result">
      <h1>Payment Failed</h1>
      <p>We couldn't process your payment. Please try again.</p>
      <div>
        <button onClick={() => navigate(-1)}>Try Again</button>
        <button onClick={() => navigate("/")}>Return Home</button>
      </div>
    </div>
  );
};

export default PaymentFailed;

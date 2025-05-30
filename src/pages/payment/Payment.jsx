import {
  useCreatePaymentOrderMutation,
  useLazyVerifyPaymentQuery,
} from "@/services/enrollmentApi";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Payment = ({ courseId }) => {
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [createPaymentOrder] = useCreatePaymentOrderMutation();
  const [verifyPayment] = useLazyVerifyPaymentQuery();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createPaymentOrder({
        courseId,
        couponCode: couponCode || undefined,
        provider: paymentMethod,
      }).unwrap();

      if (paymentMethod === "paypal" && response.approvalUrl) {
        // For PayPal, redirect to their approval URL
        window.location.href = response.approvalUrl;
      } else if (paymentMethod === "stripe" && response.approvalUrl) {
        // For Stripe, you might handle it differently (e.g., open Stripe checkout)
        handleStripePayment(response.approvalUrl);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      navigate("/payment-failed");
    }
  };

  const handleStripePayment = (sessionUrl) => {
    // This would open Stripe's checkout
    window.location.href = sessionUrl;
  };

  // Check for PayPal return URL parameters
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const orderId = queryParams.get("orderId");
    const paymentSuccess = queryParams.get("success");

    if (token && orderId) {
      verifyPayment({ token, orderId })
        .unwrap()
        .then(() => {
          navigate(
            paymentSuccess === "true" ? "/payment-success" : "/payment-failed"
          );
        })
        .catch(() => {
          navigate("/payment-failed");
        });
    }
  }, [verifyPayment, navigate]);

  return (
    <div>
      <h2>Complete Your Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>

        <div>
          <label>Coupon Code (optional):</label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </div>

        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default Payment;

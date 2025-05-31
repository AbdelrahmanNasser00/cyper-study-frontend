import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useLazyVerifyPaymentQuery } from "@/services/enrollmentApi";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifyPayment, { isLoading }] = useLazyVerifyPaymentQuery();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const sessionId = searchParams.get("session_id"); // Stripe
        const orderId = searchParams.get("order_id");
        const status = searchParams.get("status");

        if (!orderId) {
          setVerificationStatus("error");
          return;
        }

        if (status && orderId) {
          setVerificationStatus("success");
          setOrderDetails({
            status,
            orderId,
          });
          return;
        }

        const verificationToken = sessionId || undefined;

        const result = await verifyPayment({
          token: verificationToken,
          orderId,
        }).unwrap();

        console.log(result);
        if (result.orderDetails?.status === "COMPLETED") {
          setVerificationStatus("success");
          setOrderDetails(result.orderDetails);
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        setVerificationStatus("error");
      }
    };

    verifyOrder();
  }, [searchParams, verifyPayment]);

  if (verificationStatus === "verifying" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Verifying Payment...
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. Please contact support if you were
            charged.
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate("/cart")} className="w-full">
              Return to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/support")}
              className="w-full">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. You have been successfully enrolled in
          your courses.
        </p>

        {orderDetails && (
          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Order Details:</h3>
            <p className="text-sm text-gray-600">
              Payment ID: {orderDetails.paymentIntent || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Status: {orderDetails.status}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/student/dashboard" className="block">
            <Button className="w-full">Go to My Courses</Button>
          </Link>
          <Link to="/courses" className="block">
            <Button variant="outline" className="w-full">
              Browse More Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

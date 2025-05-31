import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <XCircle className="text-red-500" size={48} />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mt-2">
            We couldn't process your payment. Please try again or return to the
            homepage.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium">
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition font-medium">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;

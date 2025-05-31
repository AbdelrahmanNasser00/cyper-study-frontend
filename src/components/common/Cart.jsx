import React, { useState } from "react";
import { useGetCartQuery, useRemoveFromCartMutation } from "@/services/cartApi";
import { useCreatePaymentOrderMutation } from "@/services/enrollmentApi";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCcPaypal, FaCcStripe, FaCreditCard } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const Cart = () => {
  const { data, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [createPaymentOrder] = useCreatePaymentOrderMutation();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [courseCoupons, setCourseCoupons] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else if (Array.isArray(data?.items)) {
    items = data.items;
  }

  const totalOriginalPrice = items.reduce(
    (acc, item) =>
      acc + (Number(item.originalPrice) || 0) * (item.quantity || 1),
    0
  );
  const totalPrice = items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const totalDiscount = totalOriginalPrice - totalPrice;

  const handleCouponChange = (courseId, value) => {
    setCourseCoupons((prev) => ({
      ...prev,
      [courseId]: value,
    }));
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);
    try {
      const paymentData = {
        courseIds: items.map((item) => item.courseId || item.id),
        coupons: {},
        provider: paymentMethod,
      };

      items.forEach((item) => {
        const courseId = item.courseId || item.id;
        if (courseCoupons[courseId]) {
          paymentData.coupons[courseId] = courseCoupons[courseId];
        }
      });

      const response = await createPaymentOrder(paymentData).unwrap();
      console.log("Payment response:", response);

      if (response.approvalUrl) {
        // For both PayPal and Stripe, redirect to the approval/checkout URL
        window.location.href = response.approvalUrl;
      } else if (response.sessionUrl) {
        // Alternative property name for Stripe
        window.location.href = response.sessionUrl;
      } else if (response.checkoutUrl) {
        // Another alternative property name
        window.location.href = response.checkoutUrl;
      } else {
        // If no redirect URL, navigate to success page
        navigate("/payment-success");
      }
    } catch (error) {
      console.error("Checkout failed:", error);

      // Better error handling
      if (error?.data?.message) {
        alert(`Checkout failed: ${error.data.message}`);
      } else if (error?.message) {
        alert(`Checkout failed: ${error.message}`);
      } else {
        alert("Checkout failed. Please try again.");
      }

      // Don't automatically navigate to payment-failed
      // Let user try again or provide more specific error handling
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="p-6 max-w-7xl mx-auto">Loading cart...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-4">
            Looks like you haven't added any courses to your cart yet.
          </p>
          <Link to="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Browse Courses
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const courseId = item.courseId || item.id;
              return (
                <div
                  key={courseId}
                  className="flex items-start gap-4 border rounded-lg p-4 shadow-sm bg-white">
                  <img
                    src={item.thumbnail}
                    alt={item.title || "Course Image"}
                    className="w-32 h-24 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">
                      {item.title || "Untitled Course"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      By {item.instructor || "Unknown"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${(Number(item.price) || 0).toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${(Number(item.originalPrice) || 0).toFixed(2)}
                        </span>
                      )}
                    </div>
                    {/* Course-specific coupon input */}
                    <div className="mt-3">
                      <label
                        htmlFor={`coupon-${courseId}`}
                        className="block text-xs font-medium text-gray-500 mb-1">
                        Coupon Code (optional)
                      </label>
                      <input
                        type="text"
                        id={`coupon-${courseId}`}
                        value={courseCoupons[courseId] || ""}
                        onChange={(e) =>
                          handleCouponChange(courseId, e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter coupon code"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(courseId)}
                    className="text-red-500 cursor-pointer hover:bg-gray-100 p-2 rounded flex items-center gap-1">
                    <Trash2 className="w-5 h-5" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-600">Original Price:</span>
                <span>${totalOriginalPrice.toFixed(2)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between mb-2 text-sm text-green-600">
                  <span>Discounts:</span>
                  <span>- ${totalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </h3>
                <div className="space-y-2">
                  <div
                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                      paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("paypal")}>
                    <FaCcPaypal className="w-6 h-6 mr-3 text-blue-600" />
                    <span>PayPal</span>
                  </div>
                  <div
                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                      paymentMethod === "stripe"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("stripe")}>
                    <FaCcStripe className="w-6 h-6 mr-3 text-purple-600" />
                    <span>Credit/Debit Card (Stripe)</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-2">
                🔒 Secure checkout
              </p>
            </div>

            {/* Accepted Payment Methods */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="font-medium text-center mb-3">We Accept</p>
              <div className="flex justify-center gap-4">
                <FaCcPaypal className="w-12 h-8 text-blue-600" />
                <FaCcStripe className="w-12 h-8 text-purple-600" />
                <FaCreditCard className="w-12 h-8 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

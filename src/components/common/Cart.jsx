import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/Slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link } from "react-router"; 
import { FaCcPaypal } from "react-icons/fa";
import { FaCcStripe } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalOriginalPrice = items.reduce(
    (acc, item) => acc + (item.originalPrice || 0) * (item.quantity || 1),
    0
  );
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const totalDiscount = totalOriginalPrice - totalPrice;

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
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border rounded-lg p-4 shadow-sm bg-white"
              >
                <img
                  src={item.image}
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
                      ${((item.price || 0).toFixed(2))}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${((item.originalPrice || 0).toFixed(2))}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="sr-only">Remove</span>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div >
            <div className="bg-white p-6 rounded-lg shadow-md max-h-[450px]">
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
            <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Checkout
            </Button>
            <p className="text-center text-xs text-gray-400 mt-2">
              🔒 Secure checkout
            </p></div>
            <div className="mt-8 flex flex-col gap-4">
                <p className="font-medium">Accepted Payment Methods</p>
              <div className="flex justify-center gap-4">
              <div><FaCcPaypal  className="w-12 h-8 rounded-md" /></div>
              <div><FaCcStripe  className="w-12 h-8 rounded-md"/></div>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Cart;

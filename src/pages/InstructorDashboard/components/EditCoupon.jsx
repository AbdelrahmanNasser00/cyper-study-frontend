import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { updateCoupon } from "../api/couponApi"; 
import LoadingSpinner from "@/components/common/loadingSpinner";

const EditCoupon = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState(null);
 const navigate = useNavigate();
  // Dummy course data
  const dummyCourses = [
    { id: 11, title: "React Basics" },
    { id: 12, title: "Advanced Node.js" },
    { id: 13, title: "UI/UX Fundamentals" },
  ];

 useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const { data } = await getCoupon(id);
        setFormData(data);
      } catch (err) {
        alert("Failed to fetch coupon data");
      }
    };
    fetchCoupon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCoupon(id, formData);
      alert("Coupon updated!");
      navigate("/instructor/coupons"); 
    } catch (err) {
      alert("Failed to update coupon");
    }
  };

  if (!formData) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Coupon</h2>
    
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter coupon code"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="e.g., 50"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usage Limit</label>
            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              placeholder="e.g., 30"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
            <input
              type="date"
              name="expiresAt"
              value={formData.expiresAt}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Select Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2"
          >
            <option value="">-- Select Course --</option>
            {dummyCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium text-sm"
        >
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default EditCoupon;

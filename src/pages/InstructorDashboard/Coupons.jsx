import { useState } from "react";
import CouponTable from "./components/CouponTable";
import { dummyCoupons } from "./dummyCoupons";
import StatsCard from "./components/StatsCard";
import { Link } from "react-router-dom";
const Coupons = () => {
      const stats = {
    totalStudents: 5,
    totalCourses: 4,
    totalEarnings: 88109.17,
    publishedCourses: 3,
    totalCertificates: 0,
  };
  const [coupons, setCoupons] = useState(dummyCoupons);

  const handleCreateCoupon = () => {
    
    alert("Open coupon creation modal...");
  };

  const handleEdit = (coupon) => {
    alert("Edit coupon: " + coupon.code);
  };

  const handleDelete = (coupon) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      setCoupons((prev) => prev.filter((c) => c.code !== coupon.code));
    }
  };

  return (
 
      <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
       <Link to="/instructor/coupons/new">
        <button
          
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create New Coupon
        </button>
        </Link>
      </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👤"
        />
        <StatsCard title="Total Courses" value={stats.totalCourses} icon="📚" />
        <StatsCard
          title="Total Earnings"
          value={stats.totalEarnings}
          icon="💰"
        />
        <StatsCard
          title="Certificates Issued"
          value={stats.totalCertificates}
          icon="🎖️"
        />
      </div>

      <CouponTable coupons={coupons} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Coupons;

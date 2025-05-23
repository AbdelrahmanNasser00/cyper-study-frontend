import { useState } from "react";
import CouponTable from "./components/CouponTable";
import { dummyCoupons } from "./dummyCoupons";
import StatsCard from "./components/StatsCard";
import { useStats } from "../../context/statsContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/loadingSpinner";
const Coupons = () => {
  const { stats, loading } = useStats();

  if (loading) return <LoadingSpinner />;

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
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            + Create New Coupon
          </button>
        </Link>
      </div>
      <StatsCard stats={stats} />

      <CouponTable
        coupons={coupons}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Coupons;

import { useEffect, useState } from "react";
import CouponTable from "./components/CouponTable";
import StatsCard from "./components/StatsCard";
import { useStats } from "../../context/statsContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/loadingSpinner";
import { getCoupons, createCoupon, updateCoupon, deleteCoupon as deleteCouponApi } from "./api/couponApi";

const Coupons = () => {
  const { stats, loading } = useStats();
  const [coupons, setCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await getCoupons();
        setCoupons(data);
      } catch (e) {
        setCoupons([]);
      } finally {
        setLoadingCoupons(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (couponData) => {
    try {
      const { data } = await createCoupon(couponData);
      setCoupons((prev) => [...prev, data]);
    } catch (e) {
      alert("Failed to create coupon");
    }
  };

  const handleEdit = async (coupon) => {
    // You can open a modal to edit, then call updateCoupon
    const updatedCoupon = { ...coupon, code: prompt("Edit code:", coupon.code) };
    try {
      const { data } = await updateCoupon(coupon.id, updatedCoupon);
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? data : c)));
    } catch (e) {
      alert("Failed to update coupon");
    }
  };

  const handleDelete = async (coupon) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await deleteCouponApi(coupon.id);
        setCoupons((prev) => prev.filter((c) => c.id !== coupon.id));
      } catch (e) {
        alert("Failed to delete coupon");
      }
    }
  };

  if (loading || loadingCoupons) return <LoadingSpinner />;

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

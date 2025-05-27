import { FaTrash, FaEdit } from "react-icons/fa";
import { useGetInstructorCoursesQuery } from "../../../services/coursesApi";
import { Link } from "react-router-dom";
const CouponTable = ({ coupons, onEdit, onDelete }) => {
 
const { data: courses = [], isLoading: coursesLoading } = useGetInstructorCoursesQuery();
const courseMap = courses.reduce((acc, course) => {
  acc[course.id] = course.title;
  return acc;
}, {});
  return (
    <div className="mt-6 bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Coupons</h2>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 uppercase border-b">
          <tr>
            <th className="p-2">Code</th>
            <th className="p-2">Course</th>
            <th className="p-2">Usage Limit</th>
            <th className="p-2">Discount (%)</th>
            <th className="p-2">Expires At</th>
            <th className="p-2">Times Used</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{coupon.code}</td>
              <td className="p-2">{courseMap[coupon.courseId]}</td>
              <td className="p-2">{coupon.usageLimit}</td>
              <td className="p-2">{coupon.discount}</td>
                 
              <td className="p-2">{coupon.expiresAt.slice(0, 10)}</td>
              <td className="p-2">{coupon.timesUsed}</td>    
              <td className="p-2 flex gap-2">
                <Link to={`/instructor/coupon/edit-coupon/${coupon.id}`}>
                <button  className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                </Link>
                <button onClick={() => onDelete(coupon)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;

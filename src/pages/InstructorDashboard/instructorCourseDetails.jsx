import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import StatsCard from "./components/StatsCard";
import LoadingSpinner from "@/components/common/loadingSpinner";
import { useGetCoursePerformanceQuery } from "../../services/dashboardApi";
import CourseVideos from "./components/CourseVideos";
import { UserIcon, DollarSignIcon, AwardIcon, StarIcon } from "lucide-react";

const instructorCourseDetails = () => {
  const { id } = useParams();
  const { data: course, isLoading } = useGetCoursePerformanceQuery(id);

  const coursePerformanceData = {
    totalStudents: course?.totalStudents || 0,
    totalEarnings: course?.totalEarnings || 0,
    totalReviews: course?.totalReviews || 0,
    totalCertificates: course?.totalCertificates || 0,
  };
  if (isLoading) return <LoadingSpinner />;

  const myCustomCardsArray = [
    {
      key: "totalStudents",
      title: "Total Students",
      icon: <UserIcon />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      key: "totalEarnings",
      title: "Total Earnings",
      icon: <DollarSignIcon />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      key: "totalReviews",
      title: "Total Reviews",
      icon: <StarIcon />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      key: "totalCertificates",
      title: "Certificates Issued",
      icon: <AwardIcon />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course performance</h1>
      </div>

      <StatsCard stats={coursePerformanceData} cards={myCustomCardsArray} />

      <CourseVideos courseId={id} />

      {course?.studentsProgress && course.studentsProgress.length > 0 && (
        <div className="p-6 bg-white shadow rounded-lg mt-6">
          <h2 className="text-lg font-bold mb-4">Students Progress</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Progress (%)</th>
                  <th className="p-2">Enrolled At</th>
                </tr>
              </thead>
              <tbody>
                {course.studentsProgress.map((student, idx) => (
                  <tr key={student.studentId || idx} className="border-b">
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2">{student.studentName}</td>
                    <td className="p-2">{student.studentEmail}</td>
                    <td className="p-2">{student.progress ?? 0}</td>
                    <td className="p-2">
                      {student.enrolledAt
                        ? new Date(student.enrolledAt).toLocaleDateString()
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default instructorCourseDetails;

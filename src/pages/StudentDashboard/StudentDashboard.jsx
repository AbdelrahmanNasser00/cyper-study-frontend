import { CreditCard, GraduationCap } from "lucide-react";
import { BookOpen, Clock } from "lucide-react";
import StatsCard from "./components/StatsCard";
import LearnCourseCard from "./components/LearnCourseCard";
import TabsInDashboard from "./components/TabsInDashboard";

function StudentDashboard() {
  return (
    <div className="min-h-dvh container my-10">
      {/* start header */}
      <div>
        <h1 className="text-3xl font-extrabold mb-3">Student Dashboard</h1>
        <p className="text-gray-500">
          Track your progress, certificates, and courses
        </p>
      </div>
      {/* end header */}
      {/* start stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        <StatsCard value={3} title={"Enrolled Courses"}>
          <div className="relative">
            <span className="absolute bg-blue-400/30 w-10 h-10 -z-1 -top-2 -right-2 rounded-full"></span>
            <BookOpen className="text-blue-500" />
          </div>
        </StatsCard>
        <StatsCard value={48.5} title={"Hours Spent"}>
          <div className="relative">
            <span className="absolute bg-green-400/30 w-10 h-10 -z-1 -top-2 -right-2 rounded-full"></span>
            <Clock className="text-green-500" />
          </div>
        </StatsCard>
        <StatsCard value={1} title={"Certificates"}>
          <div className="relative">
            <span className="absolute bg-yellow-400/30 w-10 h-10 -z-1 -top-2 -right-2 rounded-full"></span>
            <GraduationCap className="text-yellow-500" />
          </div>
        </StatsCard>
      </div>
      {/* end stats */}
      {/* start Continue learning */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LearnCourseCard></LearnCourseCard>
        <LearnCourseCard></LearnCourseCard>
        <LearnCourseCard></LearnCourseCard>
      </div>
      {/* end Continue learning */}
      {/* start tabs */}
      <div className="my-10">
        <TabsInDashboard></TabsInDashboard>
      </div>
      {/* end tabs */}
    </div>
  );
}

export default StudentDashboard;

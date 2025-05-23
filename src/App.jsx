import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
import Login from "./pages/Auth/login/Login";
import Register from "./pages/Auth/register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import GuestRoute from "./components/GuestRoute";
import WishList from "./pages/WishList";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Cart from "./components/common/Cart";
import Categoires from "./pages/Categories/Categories";
import Courses from "./pages/courses/Courses";
import AboutUs from "./pages/AboutUs/AboutUs";
import JoinUs from "./pages/JoinUs/JoinUs";
import InstructorLayout from "./pages/InstructorDashboard/InstructorLayout";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import MyCourses from "./pages/InstructorDashboard/MyCourses";
import Earnings from "./pages/InstructorDashboard/Earnings";
import CreateCourse from "./pages/InstructorDashboard/components/CreateCourse";
import AddVideo from "./pages/InstructorDashboard/components/AddVideo";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Coupons from "./pages/InstructorDashboard/Coupons";
import CreateCoupon from "./pages/InstructorDashboard/components/CreateCoupon";
import EditCoupon from "./pages/InstructorDashboard/components/EditCoupon";
import Profile from "./pages/Profile/Profile";
import ProfileSecurity from "./pages/Profile/Components/ProfileSecurity";
import ProfileDetails from "./pages/Profile/Components/ProfileDetails";
import Lesson from "./pages/Lesson/Lesson";
import { StatsProvider } from "./context/statsContext";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/categories/:slug" element={<Courses />} />
        {/* <Route path="/courses" element={<Courses />} /> */}
        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/instructor" element={
          <StatsProvider>
          <InstructorLayout />
          </StatsProvider>}>
          <Route path="dashboard" element={<InstructorDashboard />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="coupons/new" element={<CreateCoupon />} />
          <Route path="coupon/edit-coupon/:id" element={<EditCoupon />} />
          <Route path="courses/new" element={<CreateCourse />} />
          <Route path="courses/:id/add-video" element={<AddVideo />} />
        </Route>

        <Route path="/about" element={<AboutUs />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/lesson" element={<Lesson />} />

        <Route path="/student">
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        <Route path="/profile" element={<Profile />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="security" element={<ProfileSecurity />} />
        </Route>
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

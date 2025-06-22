import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import GuestRoute from "./components/GuestRoute";
import { StatsProvider } from "./context/statsContext";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Auth/login/Login"));
const Register = lazy(() => import("./pages/Auth/register/Register"));
const Home = lazy(() => import("./pages/Home/Home"));
const WishList = lazy(() => import("./pages/WishList"));
const CourseDetails = lazy(() => import("./pages/CourseDetails/CourseDetails"));
const Cart = lazy(() => import("./components/common/Cart"));
const Courses = lazy(() => import("./pages/courses/Courses"));
const AllCourses = lazy(() => import("./pages/courses/AllCourses"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const JoinUs = lazy(() => import("./pages/JoinUs/JoinUs"));
const InstructorLayout = lazy(() =>
  import("./pages/InstructorDashboard/InstructorLayout")
);
const InstructorDashboard = lazy(() =>
  import("./pages/InstructorDashboard/InstructorDashboard")
);
const MyCourses = lazy(() => import("./pages/InstructorDashboard/MyCourses"));
const Earnings = lazy(() => import("./pages/InstructorDashboard/Earnings"));
const CreateCourse = lazy(() =>
  import("./pages/InstructorDashboard/components/CreateCourse")
);
const AddVideo = lazy(() =>
  import("./pages/InstructorDashboard/components/AddVideo")
);
const StudentDashboard = lazy(() =>
  import("./pages/StudentDashboard/StudentDashboard")
);
const Coupons = lazy(() => import("./pages/InstructorDashboard/Coupons"));
const CreateCoupon = lazy(() =>
  import("./pages/InstructorDashboard/components/CreateCoupon")
);
const EditCoupon = lazy(() =>
  import("./pages/InstructorDashboard/components/EditCoupon")
);
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ProfileSecurity = lazy(() =>
  import("./pages/Profile/Components/ProfileSecurity")
);
const ProfileDetails = lazy(() =>
  import("./pages/Profile/Components/ProfileDetails")
);
const Lesson = lazy(() => import("./pages/Lesson/Lesson"));
const EditCourse = lazy(() =>
  import("./pages/InstructorDashboard/components/EditCourse")
);
const InstructorCourseDetails = lazy(() =>
  import("./pages/InstructorDashboard/instructorCourseDetails")
);
const Certificate = lazy(() => import("./pages/certificate/Certificate"));
const EditVideo = lazy(() =>
  import("./pages/InstructorDashboard/components/EditVideo")
);
const PaymentSuccess = lazy(() => import("./pages/payment/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/payment/PaymentFailed"));

const LoadingFallback = () => <div>Loading...</div>; // You can replace this with a better loading component

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories/:categoryId" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/lesson" element={<Lesson />} />

          <Route
            path="/instructor"
            element={
              <StatsProvider>
                <InstructorLayout />
              </StatsProvider>
            }
          >
            <Route path="dashboard" element={<InstructorDashboard />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="coupons/new" element={<CreateCoupon />} />
            <Route path="coupon/edit-coupon/:id" element={<EditCoupon />} />
            <Route path="courses/new" element={<CreateCourse />} />
            <Route path="courses/:id/edit" element={<EditCourse />} />
            <Route path="courses/:id" element={<InstructorCourseDetails />} />
            <Route path="courses/:id/add-video" element={<AddVideo />} />
            <Route
              path="courses/:id/edit-video/:lessonId"
              element={<EditVideo />}
            />
          </Route>

          <Route path="/courses" element={<AllCourses />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/join" element={<JoinUs />} />

          <Route path="/student">
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="certificate/:id" element={<Certificate />} />
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

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

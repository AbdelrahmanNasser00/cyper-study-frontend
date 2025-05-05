import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import GuestRoute from "./components/GuestRoute";
<<<<<<< HEAD
import WishList from "./components/WishList";
=======
import CourseDetails from "./pages/CourseDetails";
>>>>>>> 54de6c3e554697aa1918fbb3dd4565355368e41c

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/wishlist" element={<WishList/>} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Route>
      <Route path="/details" element={<CourseDetails></CourseDetails>}></Route>
    </Routes>
  );
}

export default App;

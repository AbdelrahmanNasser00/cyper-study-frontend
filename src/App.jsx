import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import GuestRoute from "./components/GuestRoute";
import WishList from "./components/WishList";

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
    </Routes>
  );
}

export default App;

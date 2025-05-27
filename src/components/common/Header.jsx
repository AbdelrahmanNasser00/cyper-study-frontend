import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  Menu,
  X,
  Heart,
  BookOpen,
  Award,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/store/Slices/authSlice"; // Updated import path

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); // Use selector to check login status
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container">
        <div className="w-[100%] px-[10px] py-4 mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="font-poppins font-bold text-2xl text-[#3a57e8] flex items-center"
          >
            Cyber Study
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/courses/development">Development</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/courses/business">Business</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/courses/design">Design</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/courses/marketing">Marketing</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Link
              to="/courses"
              className="text-sm font-medium hover:text-[#3a57e8]"
            >
              Explore Courses
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/wishlist" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#3a57e8] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#3a57e8] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto relative">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-2 -right-2 bg-[#3a57e8] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuItem className="py-2 cursor-default">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-sm">
                          New certificate available!
                        </p>
                        <p className="text-xs text-[#8e8e8e]">
                          Web Development Bootcamp
                        </p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2 cursor-default">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-sm">
                          Course progress update
                        </p>
                        <p className="text-xs text-[#8e8e8e]">
                          UX Design Fundamentals - 70% completed
                        </p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-7 w-7 rounded-full overflow-hidden"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                        alt="User profile"
                        className="h-full w-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Link
                        to="/student/dashboard"
                        className="w-full flex items-center"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Student Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/instructor/dashboard"
                        className="w-full flex items-center"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Instructor Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/wishlist" className="w-full flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/certificates"
                        className="w-full flex items-center"
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Certificates
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={handleLoginRedirect}
                className="bg-[#3a57e8] text-white"
              >
                Login
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <div className="flex flex-col space-y-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#8e8e8e]" />
              <Input
                type="search"
                placeholder="Search for courses..."
                className="pl-8 bg-[#f0f0f0] border-none w-full"
              />
            </div>

            <Link
              to="/courses"
              className="text-sm font-medium hover:text-[#3a57e8] py-2"
            >
              Explore Courses
            </Link>

            <div className="py-2">
              <p className="text-sm font-medium mb-2">Categories</p>
              <div className="space-y-2 ml-2">
                <Link
                  to="/courses/development"
                  className="block text-sm hover:text-[#3a57e8]"
                >
                  Development
                </Link>
                <Link
                  to="/courses/business"
                  className="block text-sm hover:text-[#3a57e8]"
                >
                  Business
                </Link>
                <Link
                  to="/courses/design"
                  className="block text-sm hover:text-[#3a57e8]"
                >
                  Design
                </Link>
                <Link
                  to="/courses/marketing"
                  className="block text-sm hover:text-[#3a57e8]"
                >
                  Marketing
                </Link>
              </div>
            </div>

            {isLoggedIn ? (
              <>
                <Link to="/wishlist" className="flex items-center gap-2 py-2">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Wishlist ({wishlistCount})</span>
                </Link>
                <Link to="/cart" className="flex items-center gap-2 py-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-sm">Cart ({cartCount})</span>
                </Link>
                <Link
                  to="/notifications"
                  className="flex items-center gap-2 py-2"
                >
                  <Bell className="h-4 w-4" />
                  <span className="text-sm">Notifications (2)</span>
                </Link>
                <Link
                  to="/student/dashboard"
                  className="flex items-center gap-2 py-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">Student Dashboard</span>
                </Link>
                <Link
                  to="/instructor/dashboard"
                  className="flex items-center gap-2 py-2"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">Instructor Dashboard</span>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 py-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Profile</span>
                </Link>
                <Link
                  to="/certificates"
                  className="flex items-center gap-2 py-2"
                >
                  <Award className="h-4 w-4" />
                  <span className="text-sm">Certificates</span>
                </Link>
                <button className="text-sm text-left py-2 flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-black w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-[#3a57e8] text-white w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

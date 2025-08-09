import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  ShoppingCart,
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
import {
  logout,
  selectIsInstructor,
  selectIsStudent,
} from "@/store/Slices/authSlice";
import { useGetProfileQuery } from "@/services/profileApi";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isInstructor = useSelector(selectIsInstructor);
  const isStudent = useSelector(selectIsStudent);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: profile } = useGetProfileQuery();
  console.log(profile);
  const handleLogout = () => {
    dispatch(logout());
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
            <Link
              to="/courses"
              className="text-sm font-medium hover:text-[#3a57e8]"
            >
              Explore Courses
            </Link>

            {isLoggedIn ? (
              <>
                {isStudent && (
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
                  </>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-7 w-7 rounded-full overflow-hidden"
                    >
                      <img
                        src={profile?.profilePicture}
                        alt="User profile"
                        className="h-full w-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {isStudent && (
                      <DropdownMenuItem>
                        <Link
                          to="/student/dashboard"
                          className="w-full flex items-center"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Student Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isInstructor && (
                      <DropdownMenuItem>
                        <Link
                          to="/instructor/dashboard"
                          className="w-full flex items-center"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Instructor Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {isStudent && (
                      <DropdownMenuItem>
                        <Link
                          to="/wishlist"
                          className="w-full flex items-center"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                    )}
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
              <div className="flex flex-row gap-2">
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
                {isStudent && (
                  <Link to="/wishlist" className="flex items-center gap-2 py-2">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Wishlist ({wishlistCount})</span>
                  </Link>
                )}
                {isStudent && (
                  <Link to="/cart" className="flex items-center gap-2 py-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm">Cart ({cartCount})</span>
                  </Link>
                )}
                {isStudent && (
                  <Link
                    to="/student/dashboard"
                    className="flex items-center gap-2 py-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm">Student Dashboard</span>
                  </Link>
                )}
                {isInstructor && (
                  <Link
                    to="/instructor/dashboard"
                    className="flex items-center gap-2 py-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">Instructor Dashboard</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 py-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Profile</span>
                </Link>
                {isStudent && (
                  <Link
                    to="/certificates"
                    className="flex items-center gap-2 py-2"
                  >
                    <Award className="h-4 w-4" />
                    <span className="text-sm">Certificates</span>
                  </Link>
                )}
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

import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12">
      <div className="container">
        <div className="w-[100%]  mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div>
              <h3 className="font-poppins font-bold text-lg mb-4">
                Cyber Study
              </h3>
              <p className="text-gray-600 mb-4">
                Empowering minds through accessible, quality education. Join
                thousands of students learning on Cyber Study.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-brand-blue transition-colors"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-brand-blue transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-brand-blue transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-brand-blue transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-brand-blue transition-colors"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-poppins font-bold text-lg mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Top Categories */}
            <div>
              <h3 className="font-poppins font-bold text-lg mb-4">
                Top Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/courses/development"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/business"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Business
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/design"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/marketing"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/music"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Music
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-poppins font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/join"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Become an Instructor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report-issue"
                    className="text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    Report an Issue
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t pt-8 text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Cyber Study. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

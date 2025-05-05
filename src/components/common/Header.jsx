// Header.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header = () => {
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <header className="flex justify-between p-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-600">Learnify</Link>
      
      <div className="flex items-center gap-4">
        <Link to="/wishlist" className="relative">
          <Heart className="w-6 h-6 text-red-500" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

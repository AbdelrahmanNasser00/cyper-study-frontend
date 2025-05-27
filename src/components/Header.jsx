import React, { useContext } from "react";
import { WishlistContext } from "@/context/WishlistContext";

const Header = () => {
  const { wishlistCount } = useContext(WishlistContext);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* ...existing code... */}
      <div className="relative">
        <button className="text-xl">❤️</button>
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2">
            {wishlistCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;

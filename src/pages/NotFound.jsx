// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa'; 

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-10">
      <img
        src="/cyber-logo.png"
        alt="Cyber Study Logo"
        className="w-20 h-20 mb-6"
      />
      <h1 className="text-4xl font-bold text-blue-600 mb-2">Cyber Study</h1>
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />
      <h2 className="text-6xl font-bold text-blue-600">404</h2>
      <p className="text-2xl mt-4 text-gray-800 font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
      >
        Back to Cyber Study
      </Link>
    </div>
  );
}

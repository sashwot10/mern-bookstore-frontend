import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg z-50">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-500">
          Bookstore
        </Link>

        {/* Hamburger menu for mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation links for large devices */}
        <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 lg:justify-center">
            <li>
              <Link to="/" className="text-lg text-gray-700 hover:text-blue-500">
                Home
              </Link>
            </li>
            {user && ( // Only show Cart when logged in
              <li>
                <Link to="/cart" className="text-lg text-gray-700 hover:text-blue-500">
                  Cart
                </Link>
              </li>
            )}
            {user ? (
              <>
                {user.isAdmin && (
                  <li>
                    <Link to="/manage-books" className="text-lg text-gray-700 hover:text-blue-500">
                      Manage Books
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-lg text-gray-100 hover:text-gray-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="text-lg text-gray-700 hover:text-blue-500">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes, FaBook, FaHome } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <FaBook className="text-blue-500" /> Bookstore
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link to="/" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1">
            <FaHome /> Home
          </Link>
          {user && (
            <Link to="/cart" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1">
              <FaShoppingCart /> Cart
            </Link>
          )}
          {user?.isAdmin && (
            <Link to="/manage-books" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1">
              📚 Manage Books
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-lg text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <Link to="/login" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1">
              <FaUser /> Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden">
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link to="/" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                  <FaHome /> Home
                </Link>
              </li>
              {user && (
                <li>
                  <Link to="/cart" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                    <FaShoppingCart /> Cart
                  </Link>
                </li>
              )}
              {user?.isAdmin && (
                <li>
                  <Link to="/manage-books" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                    📚 Manage Books
                  </Link>
                </li>
              )}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-lg text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="text-lg text-gray-700 hover:text-blue-500 flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
                    <FaUser /> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
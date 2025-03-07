import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="flex justify-between items-center p-4 max-w-screen-xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-500">
          Bookstore
        </Link>
        <nav>
          <ul className="flex space-x-6">
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
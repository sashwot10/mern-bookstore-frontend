import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa'; // Import email icon

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 text-center py-6 mt-12 w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-4">
        <Link
          to="/contact"
          className="text-blue-600 hover:text-blue-700 text-lg flex items-center space-x-2"
        >
          <FaEnvelope className="text-xl" />
          <span>Contact Us</span>
        </Link>
        <p className="text-gray-600 text-lg">
          &copy; {new Date().getFullYear()} Online Bookstore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
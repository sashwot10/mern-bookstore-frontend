import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://mern-bookstore-backend-e61o.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data); // Log response from server

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        login(data.user); // Update auth state using context
        console.log('Navigating to homepage');
        navigate('/'); // Redirect to homepage
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="p-6 shadow-lg rounded-lg w-full max-w-sm bg-white">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input with Icon */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 pl-10 border rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Password Input with Icon */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 pl-10 border rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-2 text-blue-500  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
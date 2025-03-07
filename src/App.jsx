import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Import the Header
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart'; // Assuming you have a Cart component
import Login from './components/Login'; // Assuming you have a Login component
import RegisterForm from './components/Register'; 
import ManageBooks from './components/ManageBooks'; // Update this import if needed
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap the entire app with CartProvider to manage cart state */}
        <Router>
          <Header /> {/* Add the fixed header here */}
          <div className="pt-20"> {/* Make sure content doesn't overlap */}
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} /> {/* Add login route */}
              <Route path="/register" element={<RegisterForm />} /> 
              <Route path="/manage-books" element={<ManageBooks />} /> {/* Update route for managing books */}
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
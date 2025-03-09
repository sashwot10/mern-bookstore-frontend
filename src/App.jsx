import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import HomePage from './components/HomePage'; // Import the new HomePage component
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; 
import Login from './components/Login';
import RegisterForm from './components/Register';
import ManageBooks from './components/ManageBooks';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from "./contexts/AuthContext";
import ViewAllBooks from './components/ViewAllBooks';
import Contact from './components/Contact';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <div className="pt-20 min-h-screen flex flex-col">
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} /> {/* Use HomePage for the homepage */}
                <Route path="/view-all-books" element={<ViewAllBooks />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/manage-books" element={<ManageBooks />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer /> 
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create Cart Context
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state while fetching cart

  // Fetch cart from backend when user is logged in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]); // Clear cart when user logs out
      setLoading(false);
    }
  }, [user]);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Clear the cart before fetching new items
      setCart([]);

      const response = await axios.get('https://mern-bookstore-backend-e61o.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(response.data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get Authorization Header
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Add to cart
  const addToCart = async (bookId, quantity) => {
    try {
      const response = await axios.post(
        'https://mern-bookstore-backend-e61o.onrender.com/api/cart/add',
        { bookId, quantity },
        { headers: getAuthHeader() }
      );

      // Re-fetch the cart to ensure it's up to date
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove from cart
  const removeFromCart = async (bookId) => {
    try {
      await axios.delete(`https://mern-bookstore-backend-e61o.onrender.com/api/cart/remove/${bookId}`, {
        headers: getAuthHeader(),
      });

      // Re-fetch the cart to get the updated state
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete('https://mern-bookstore-backend-e61o.onrender.com/api/cart/clear', {
        headers: getAuthHeader(),
      });

      setCart([]); // Clear cart locally
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Update quantity
  const updateQuantity = async (bookId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await axios.put(
        'https://mern-bookstore-backend-e61o.onrender.com/api/cart/update',
        { bookId, quantity },
        { headers: getAuthHeader() }
      );

      // Re-fetch the cart to ensure it's up to date
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
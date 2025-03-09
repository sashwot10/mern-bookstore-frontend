import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const updatedCart = await Promise.all(
          cart.map(async (item) => {
            // Ensure bookId is valid before making API request
            if (item.bookId && item.bookId._id) {
              const res = await axios.get(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${item.bookId._id}`);
              return { ...item, book: res.data };
            } else {
              console.error('bookId is missing for item:', item);
              return { ...item, book: null };  // Handle missing bookId gracefully
            }
          })
        );
        setCartItems(updatedCart);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    if (cart.length > 0) {
      fetchBookDetails();
    } else {
      setCartItems([]);
    }
  }, [cart]); // This will re-run whenever the cart changes

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Check if book is available
      if (item.book) {
        return total + item.book.price * item.quantity;
      }
      return total;  // Skip item if book details are missing
    }, 0);
  };

  return (
    <div className="mt-20 ">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.book?._id} className="flex justify-between items-center py-4">
                <div>
                  {item.book ? (
                    <>
                      <h3 className="font-bold">{item.book.title}</h3>
                      <p>Price: ${item.book.price}</p>
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                          className="px-3 py-1 px-3 py-1  text-red-500 rounded hover:text-red-600"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                          className="px-3 py-1 bpx-3 py-1  text-green-500 rounded hover:text-green-600"
                        >
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>Book details not available</p>  // Fallback if book is missing
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(item.book?._id)}
                  className="px-3 py-1  text-red-500 rounded hover:text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-xl font-bold">Total: ${getTotalPrice()}</h3>
            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="mt-3 ml-4 px-4 py-2 px-3 py-1  text-blue-500 rounded hover:text-blue-600"
            >
              Checkout
            </button>
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="mt-3 px-4 py-2  px-3 py-1 ml-32  text-red-500 rounded hover:text-red-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
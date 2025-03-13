import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaShoppingCart, FaPlus, FaMinus, FaCreditCard } from 'react-icons/fa';

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
            if (item.bookId && item.bookId._id) {
              const res = await axios.get(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${item.bookId._id}`);
              return { ...item, book: res.data };
            } else {
              console.error('bookId is missing for item:', item);
              return { ...item, book: null }; // Handle missing bookId gracefully
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
  }, [cart]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (item.book) {
        return total + item.book.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="mt-20 min-h-screen px-5">
      <h2 className="text-2xl font-bold flex items-center">
        <FaShoppingCart className="mr-2 text-blue-500" /> Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="mt-4 text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.book?._id} className="flex justify-between items-center py-4 border-b">
                <div>
                  {item.book ? (
                    <>
                      <h3 className="font-bold text-gray-800">{item.book.title}</h3>
                      <p className="text-gray-600">Price: ${item.book.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                          className="px-3 py-1 text-red-500 rounded hover:text-red-600 flex items-center"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-3 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                          className="px-3 py-1 text-green-500 rounded hover:text-green-600 flex items-center"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-red-500">Book details not available</p>
                  )}
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => removeFromCart(item.book?._id)}
                    className="px-3 py-1 text-red-500 rounded hover:text-red-600 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex  flex-col items-end">
            <h3 className="text-xl mr-55 font-bold text-gray-800">
              Total: <span className="text-blue-500">${getTotalPrice()}</span>
            </h3>

            <div className="flex mt-3">
              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="px-4 py-2 text-blue-500 mr-20 flex items-center"
              >
                <FaCreditCard className="mr-2" /> Checkout
              </button>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="ml-auto px-4 py-2 text-red-500  flex items-center"
              >
                <FaTrash className="mr-2" /> Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
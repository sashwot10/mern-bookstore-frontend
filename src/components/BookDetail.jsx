import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaShoppingCart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="p-8 border rounded-lg shadow-lg bg-white text-gray-900 w-full max-w-xl">
        <h2 className="text-5xl font-bold text-gray-800">{book.title}</h2>
        <p className="text-xl text-gray-600">by {book.author}</p>
        <p className="text-2xl font-semibold text-green-600">${book.price}</p>
        <p className="text-lg text-gray-800">Category: {book.category}</p>
        <p className="py-6 text-lg text-gray-700 leading-relaxed">{book.description}</p>
        
        <div className="flex items-center space-x-2">
          {book.stock > 0 ? (
            <FaCheckCircle className="text-green-500 text-lg" />
          ) : (
            <FaTimesCircle className="text-red-500 text-lg" />
          )}
          <span className={book.stock > 0 ? "text-green-600" : "text-red-600"}>
            {book.stock > 0 ? `In Stock (${book.stock})` : 'Out of Stock'}
          </span>
        </div>
        
        {user && book.stock > 0 && (
          <button
            onClick={() => addToCart(book._id, 1)}
            className="mt-6 px-6 py-3 text-blue-500 flex items-center justify-center space-x-2 w-full"
          >
            <FaShoppingCart className="text-blue text-lg" />
            <span className="font-semibold">Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
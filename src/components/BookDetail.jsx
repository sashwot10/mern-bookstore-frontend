import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'; // Import AuthContext to check if the user is logged in
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart(); // Use addToCart from context
  const { user } = useAuth(); // Get user info from AuthContext

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

  if (!book) return <p>Loading...</p>;

  return ( 
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 border rounded-lg shadow-lg bg-gray-800 text-white w-full max-w-lg">
        <h2 className="text-5xl font-bold text-white">{book.title}</h2>
        <p className="text-lg text-gray-400">by {book.author}</p>
        <p className="text-lg text-yellow-300">${book.price}</p>
        <p className="text-gray-400">{book.category}</p>
        <p className=" py-4 text-lg text-gray-300">{book.description}</p>
        <p className="text-gray-300">Stock: {book.stock}</p>

        {user && (
          <button
            onClick={() => addToCart(book._id, 1)} // Correct way to call addToCart
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
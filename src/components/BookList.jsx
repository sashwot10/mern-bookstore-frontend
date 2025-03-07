import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom'; // Import the Link component for routing
import { useAuth } from '../contexts/AuthContext'; // Import AuthContext to check if the user is logged in
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);
  const { addToCart } = useCart();
  const { user } = useAuth(); // Get user info from AuthContext

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://mern-bookstore-backend-e61o.onrender.com/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <div key={book._id} className="border p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">{book.title}</h3>
          <p className="text-sm text-gray-300">by {book.author}</p>
          <p className="text-gray-100">${book.price}</p>
          <p className="text-gray-200">{book.category}</p>
          <p className="text-gray-400">
            {book.description.length > 55 ? `${book.description.substring(0, 55)}...` : book.description}
          </p>
          <p className="text-gray-10">Stock: {book.stock}</p>
          
          <div className="flex justify-between">
            {user && ( // Only show the "Add to Cart" button if the user is logged in
              <button
                onClick={() => addToCart(book._id, 1)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            )}
            
            {/* Link to the BookDetail page */}
            <Link
              to={`/book/${book._id}`}
              className="mt-3 px-4 py-2 bg-black-500 text-white rounded hover:bg--red700"
            >
              View Detail
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
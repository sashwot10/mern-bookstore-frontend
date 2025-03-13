import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from './Search'; // Import the Search component

function ViewAllBooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Books</h1>
        <p className="text-gray-600">Browse our entire collection of books</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-6">
      <Search onSearch={setSearchQuery} />
      </div>
    

      {/* Books Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="bg-gray-100 shadow-lg rounded-lg p-5 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
              </div>
              <Link
                to={`/book/${book._id}`}
                className="px-4 py-2 mt-4 self-end text-blue-600  rounded"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No books found</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllBooks;
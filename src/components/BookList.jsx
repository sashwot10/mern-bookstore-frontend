import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import Search from './Search';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [addedBooks, setAddedBooks] = useState({})

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
  const handleAddToCart = (bookId) => {
    addToCart(bookId, 1);
    setAddedBooks((prev) => ({ ...prev, [bookId]: true })); // Mark as added
  };


  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate books by availability and category
  const availableBooks = filteredBooks.filter((book) => book.stock > 0);
  const outOfStockBooks = filteredBooks.filter((book) => book.stock === 0);
  const dystopianBooks = filteredBooks.filter((book) => book.category === 'Dystopian');
  const classicBooks = filteredBooks.filter((book) => book.category === 'Classic');
  const fantasyBooks = filteredBooks.filter((book) => book.category === 'Fantasy');
  const popularAuthorBooks = filteredBooks.filter(
    (book) => book.author === 'Nora Roberts' || book.author === 'Stephen King'
  );
  const swiperSettings = {
    navigation: true,
    modules: [Navigation],
    spaceBetween: 20,
    slidesPerView: 4, // Default for large screens
    breakpoints: {
      1024: { slidesPerView: 4 }, // Large screens
      800: { slidesPerView: 3 },  // Tablets
      580: { slidesPerView: 2 },
      0: { slidesPerView: 1 },    // Extra small screens
    },
  
  };

  // Render Book Section
  const renderBookSection = (books, category) => (
    <div className="max-w-6xl mx-auto mb-10">
      <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
      <Swiper className="swiper-container" {...swiperSettings}>
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <div className="bg-gray-100 shadow-lg rounded-lg p-5 text-center relative group transition-all transform hover:scale-105 hover:shadow-2xl h-[350px] flex flex-col justify-between">
  <div>
    <h3 className="text-xl font-semibold text-gray-900 truncate max-w-[90%] mx-auto">{book.title}</h3>
    <p className="text-gray-600">by {book.author}</p>
    <p className="text-gray-800 font-bold">${book.price}</p>
    <p className="text-gray-500">{book.category}</p>
    <p className="text-gray-600 line-clamp-3">{book.description}</p>
  </div>
  <p className="text-gray-700">Stock: {book.stock}</p>
  <div className="mt-2">
                  <Link
                    to={`/book/${book._id}`}
                    className="px-4 py-2  rounded hover:bg-blue-100 flex items-center justify-center"
                  >
                    <FaEye className="mr-2" /> View Details
                  </Link>
                </div>
  <div className="mt-4 flex justify-center space-x-3">
    {user && (
      <button
        onClick={() => handleAddToCart(book._id)}
        className={`px-4 py-2 text-blue-500 flex items-center ${addedBooks[book._id] ? 'text-blue-600' : 'text-blue-500'}`}
        disabled={addedBooks[book._id]}
      >
        {addedBooks[book._id] ? 'Book Added to Cart' : (
          <>
            <FaShoppingCart className="mr-2" /> Add to Cart
          </>
        )}
      </button>
    )}
    
  </div>
</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div className="min-h-screen py-10">
      {/* Search Bar */}
      <Search onSearch={setSearchQuery} />

      {/* Heading */}
      <div className="max-w-5xl py-10 mx-auto text-center mb-8">
        <h1 className="responsive-heading">Explore Our Collection</h1>
        <p className="text-gray-600">Find your next favorite book</p>
      </div>

      {/* Available Books Section */}
      <div className="max-w-6xl mx-auto">
      <Swiper className="swiper-container" {...swiperSettings}>
          {availableBooks.map((book) => (
            <SwiperSlide key={book._id}>
             <div className="bg-gray-100 shadow-lg rounded-lg p-5 text-center relative group transition-all transform hover:scale-105 hover:shadow-2xl h-[350px] flex flex-col justify-between">
  <div>
    <h3 className="text-xl font-semibold text-gray-900 truncate max-w-[90%] mx-auto">{book.title}</h3>
    <p className="text-gray-600">by {book.author}</p>
    <p className="text-gray-800 font-bold">${book.price}</p>
    <p className="text-gray-500">{book.category}</p>
    <p className="text-gray-600 line-clamp-3">{book.description}</p>
  </div>
  <p className="text-gray-700">Stock: {book.stock}</p>
  <div className="mt-2">
                  <Link
                    to={`/book/${book._id}`}
                    className="px-4 py-2  rounded transition-all transform hover:scale-105 hover:bg-blue-100  flex items-center justify-center"
                  >
                    <FaEye className="mr-2" /> View Details
                  </Link>
                </div>
  <div className="mt-4 flex justify-center space-x-3">
    {user && (
      <button
        onClick={() => handleAddToCart(book._id)}
        className={`px-4 py-2 text-blue-500 flex items-center  ${addedBooks[book._id] ? 'text-blue-600' : 'text-blue-500'}`}
        disabled={addedBooks[book._id]}
      >
        {addedBooks[book._id] ? 'Book Added to Cart' : (
          <>
            <FaShoppingCart className="mr-2" /> Add to Cart
          </>
        )}
      </button>
    )}
  </div>
</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View All Books Button */}
      <div className="text-center mt-12">
        <Link
          to="/view-all-books"
          className="px-6 py-3 bg-blue-200 rounded hover:bg-blue-400"
        >
          View All Books
        </Link>
      </div>

      {/* Out of Stock Books Section */}
      {outOfStockBooks.length > 0 && (
        <div className="max-w-5xl mx-auto text-center mt-12 mb-5">
          <h2 className="text-2xl font-bold text-red-600">Out of Stock</h2>
          <p className="text-gray-600">These books are currently unavailable</p>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
      <Swiper className="swiper-container" {...swiperSettings}>
          {outOfStockBooks.map((book) => (
            <SwiperSlide key={book._id}>
              <div className="bg-gray-200 shadow-lg rounded-lg p-5 text-center opacity-80 transition-all transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-gray-500">{book.category}</p>
                <p className="text-gray-600">{book.description.substring(0, 55)}...</p>
                <p className="text-red-600 font-bold">Out of Stock</p>
                <div className="mt-4">
                  <Link
                    to={`/book/${book._id}`}
                    className="px-4 py-2 text-black rounded hover:bg-blue flex items-center justify-center"
                  >
                    <FaEye className="mr-2" /> View Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Popular Categories Section */}
      <div className="max-w-5xl mx-auto mb-8 mt-10 py-2">
      <h1 class="responsive-heading">Popular Categories</h1>
      </div >

      {/* Category Sections */}
      {renderBookSection(dystopianBooks, 'Dystopian')}
      {renderBookSection(classicBooks, 'Classic')}
      {renderBookSection(fantasyBooks, 'Fantasy')}

      {/* Popular Authors Section */}
      <div className="max-w-6xl mx-auto mb-8 py-3">
      <h1 class="responsive-heading">Popular Authors</h1>
      </div>
      {renderBookSection(
        popularAuthorBooks.filter((book) => book.author === 'Stephen King'),
        'Stephen King'
      )}
      
      <div className="max-w-6xl mx-auto mb-8 py-3">
       
      </div>
      {renderBookSection(
        popularAuthorBooks.filter((book) => book.author === 'Nora Roberts'),
        'Nora Roberts'
      )}
    </div>
  );
}

export default BookList;
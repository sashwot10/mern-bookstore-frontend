import { useState, useEffect, useRef } from 'react';
import { FaMagic, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null); // Reference to scroll to the form

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://mern-bookstore-backend-e61o.onrender.com/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBooks(data);
      } else {
        setErrorMessage(data.message);
      }
    };
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('https://mern-bookstore-backend-e61o.onrender.com/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage('Book added successfully!');
      setBooks([...books, data]);
      setNewBook({
        title: '',
        author: '',
        price: '',
        description: '',
        category: '',
        stock: '',
      });
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleDeleteBook = async (bookId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setSuccessMessage('Book deleted successfully!');
      setBooks(books.filter((book) => book._id !== bookId));
    } else {
      setErrorMessage('Failed to delete book');
    }
  };

  const handleUpdateBook = async (bookId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage('Book updated successfully!');
      setBooks(books.map((book) => (book._id === bookId ? { ...book, ...newBook } : book)));
      setNewBook({
        title: '',
        author: '',
        price: '',
        description: '',
        category: '',
        stock: '',
      });
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleAutofillBook = (book) => {
    setNewBook({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description,
      category: book.category,
      stock: book.stock,
    });

    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Manage Books</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      <form onSubmit={handleAddBook} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg" ref={formRef}>
        <h3 className="text-2xl font-medium text-gray-800 mb-4">Add New Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full p-3 text-green-400 flex items-center justify-center space-x-2">
          <FaPlus /> <span>Add Book</span>
        </button>
      </form>

      <div className="space-y-6">
        {books.map((book) => (
          <div key={book._id} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white space-y-4 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Price: ${book.price}</p>
            <p className="text-gray-600">Description: {book.description}</p>
            <p className="text-gray-600">Category: {book.category}</p>
            <p className="text-gray-600">Stock: {book.stock}</p>
            <div className="flex justify-between space-x-4">
              <button onClick={() => handleAutofillBook(book)} className="px-6 py-2 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center space-x-2">
                <FaMagic /> <span>Autofill</span>
              </button>
              <button onClick={() => handleUpdateBook(book._id)} className="px-6 py-2 text-yellow-600 hover:bg-yellow-100 rounded-lg flex items-center space-x-2">
                <FaEdit /> <span>Update</span>
              </button>
              <button onClick={() => handleDeleteBook(book._id)} className="px-6 py-2 text-red-600 hover:bg-red-100 rounded-lg flex items-center space-x-2">
                <FaTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
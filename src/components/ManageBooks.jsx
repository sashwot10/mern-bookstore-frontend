import { useState, useEffect } from 'react';

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

  // Fetch books from the API
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

  // Handle adding a new book
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
      setBooks([...books, data]); // Add new book to the state
    } else {
      setErrorMessage(data.message);
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (bookId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage('Book deleted successfully!');
      setBooks(books.filter((book) => book._id !== bookId)); // Remove book from state
    } else {
      setErrorMessage(data.message);
    }
  };

  // Handle updating a book
  const handleUpdateBook = async (bookId) => {
    const updatedBook = {
      title: newBook.title,
      author: newBook.author,
      price: newBook.price,
      description: newBook.description,
      category: newBook.category,
      stock: newBook.stock,
    };

    const token = localStorage.getItem('token');
    const response = await fetch(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBook),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage('Book updated successfully!');
      setBooks(
        books.map((book) =>
          book._id === bookId ? { ...book, ...updatedBook } : book
        )
      ); // Update book in the state
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-center">Manage Books</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      <form onSubmit={handleAddBook} className="space-y-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Category"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          required
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full p-3 bg-green text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Add Book
        </button>
      </form>

      <div className="space-y-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="p-4 border border-gray-300 rounded-lg shadow-md space-y-4"
          >
            <h3 className="text-xl font-semibold">Title: {book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Description: {book.description}</p>
            <p>Category: {book.category}</p>
            <p>Stock: {book.stock}</p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => handleUpdateBook(book._id)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
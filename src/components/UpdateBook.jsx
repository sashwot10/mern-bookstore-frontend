import { useState, useEffect } from 'react';

const UpdateBook = ({ book, onClose, onUpdate }) => {
  const [updatedBook, setUpdatedBook] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (book) {
      setUpdatedBook(book);
    }
  }, [book]);

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
    setIsModified(true);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
  
    // Destructure to remove both _id and __v fields
    const { _id, __v, ...bookToUpdate } = updatedBook;
  
    const response = await fetch(`https://mern-bookstore-backend-e61o.onrender.com/api/books/${updatedBook._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookToUpdate), // Send the updated book without _id and __v
    });
  
    const data = await response.json();
    if (response.ok) {
      onUpdate(updatedBook); // Update parent component with the updated book
      onClose(); // Close the modal
    } else {
      alert('Update failed: ' + data.message);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0  flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Update Book</h2>
        <input
          type="text"
          name="title"
          value={updatedBook.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="text"
          name="author"
          value={updatedBook.author}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="number"
          name="price"
          value={updatedBook.price}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <textarea
          name="description"
          value={updatedBook.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        ></textarea>
        <input
          type="text"
          name="category"
          value={updatedBook.category}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <input
          type="number"
          name="stock"
          value={updatedBook.stock}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
        />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 text-red-500 rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!isModified}
            className={`px-4 py-2 rounded ${isModified ? ' text-blue-500' : ' text-gray-700'}`}
          >
            Confirm Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
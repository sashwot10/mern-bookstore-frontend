// Search.js
import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // This will update the search query in the parent component
  };

  return (
    <div className="max-w-6xl mx-auto py-4 px-6">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search books..."
        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
};

export default Search;
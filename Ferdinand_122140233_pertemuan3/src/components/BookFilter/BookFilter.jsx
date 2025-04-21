import React from 'react';
import { useBooks, BOOK_STATUS } from '../../context/BookContext';
import './BookFilter.css';

const BookFilter = () => {
  const { filter, setFilter, setSearchTerm, searchTerm } = useBooks();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="book-filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      
      <div className="filter-container">
        <select 
          value={filter} 
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">Semua Buku</option>
          <option value={BOOK_STATUS.OWNED}>Dimiliki</option>
          <option value={BOOK_STATUS.READING}>Sedang Dibaca</option>
          <option value={BOOK_STATUS.WISHLIST}>Ingin Dibeli</option>
        </select>
      </div>
    </div>
  );
};

export default BookFilter;
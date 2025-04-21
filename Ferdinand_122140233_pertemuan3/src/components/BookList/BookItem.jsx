import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useBooks, BOOK_STATUS } from '../../context/BookContext';
import './BookItem.css';

const BookItem = ({ book, onEdit }) => {
  const { deleteBook } = useBooks();
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const statusLabels = {
    [BOOK_STATUS.OWNED]: 'Dimiliki',
    [BOOK_STATUS.READING]: 'Sedang Dibaca',
    [BOOK_STATUS.WISHLIST]: 'Ingin Dibeli'
  };

  const statusClasses = {
    [BOOK_STATUS.OWNED]: 'owned',
    [BOOK_STATUS.READING]: 'reading',
    [BOOK_STATUS.WISHLIST]: 'wishlist'
  };

  const handleDelete = () => {
    if (window.confirm('Anda yakin ingin menghapus buku ini?')) {
      deleteBook(book.id);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="book-item">
      <div className="book-cover">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={`Cover buku ${book.title}`} />
        ) : (
          <div className="book-cover-placeholder">
            {book.title.charAt(0)}
          </div>
        )}
        <div className={`book-status ${statusClasses[book.status]}`}>
          {statusLabels[book.status]}
        </div>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">oleh {book.author}</p>
        {book.description && (
          <div className="description-wrapper">
            <p className={`book-description ${showFullDescription ? 'expanded' : ''}`}>
              {book.description}
            </p>
            <button 
              className="toggle-description" 
              onClick={toggleDescription}
              aria-expanded={showFullDescription}
            >
              {showFullDescription ? 'Sembunyikan' : 'Selengkapnya'}
            </button>
          </div>
        )}
      </div>
      
      <div className="book-actions">
        <button className="btn-edit" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Hapus
        </button>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverUrl: PropTypes.string
  }).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookItem;
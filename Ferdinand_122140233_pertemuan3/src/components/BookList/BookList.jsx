import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookItem from './BookItem';
import BookForm from '../BookForm/BookForm';
import EmptyState from '../EmptyState/EmptyState';
import './BookList.css';

const BookList = () => {
  const { filteredBooks } = useBooks();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  if (filteredBooks.length === 0) {
    return <EmptyState message="Tidak ada buku ditemukan" />;
  }

  return (
    <div className="book-list">
      {editingBook ? (
        <div className="edit-form-overlay">
          <div className="edit-form-container">
            <BookForm 
              bookToEdit={editingBook} 
              onCancel={handleCancelEdit} 
            />
          </div>
        </div>
      ) : null}
      
      <div className="book-grid">
        {filteredBooks.map(book => (
          <BookItem key={book.id} book={book} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
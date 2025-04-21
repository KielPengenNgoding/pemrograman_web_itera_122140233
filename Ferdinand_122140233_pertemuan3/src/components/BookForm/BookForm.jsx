import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBooks, BOOK_STATUS } from '../../context/BookContext';
import './BookForm.css';

const BookForm = ({ bookToEdit, onCancel }) => {
  const { addBook, editBook } = useBooks();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: BOOK_STATUS.OWNED,
    description: '',
    coverUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Jika ada buku yang sedang diedit, isi form dengan data buku tersebut
  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    }
  }, [bookToEdit]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku wajib diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      if (bookToEdit) {
        editBook(formData);
      } else {
        addBook(formData);
        // Reset form
        setFormData({
          title: '',
          author: '',
          status: BOOK_STATUS.OWNED,
          description: '',
          coverUrl: ''
        });
      }
      onCancel && onCancel();
    }
    
    setIsSubmitting(false);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{bookToEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="error-message">{errors.author}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value={BOOK_STATUS.OWNED}>Dimiliki</option>
          <option value={BOOK_STATUS.READING}>Sedang Dibaca</option>
          <option value={BOOK_STATUS.WISHLIST}>Ingin Dibeli</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Deskripsi (Opsional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="coverUrl">URL Cover (Opsional)</label>
        <input
          type="text"
          id="coverUrl"
          name="coverUrl"
          value={formData.coverUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={onCancel}
          >
            Batal
          </button>
        )}
        <button 
          type="submit" 
          className="btn-submit" 
          disabled={isSubmitting}
        >
          {bookToEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
      </div>
    </form>
  );
};

BookForm.propTypes = {
  bookToEdit: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    coverUrl: PropTypes.string
  }),
  onCancel: PropTypes.func
};

export default BookForm;
import React, { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h2>Koleksi Buku Saya</h2>
        <button className="btn-add" onClick={toggleForm}>
          {showForm ? 'Tutup Form' : 'Tambah Buku'}
        </button>
      </div>
      
      {showForm && (
        <div className="form-container">
          <BookForm onCancel={() => setShowForm(false)} />
        </div>
      )}
      
      <div className="filter-section">
        <BookFilter />
      </div>
      
      <div className="list-section">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
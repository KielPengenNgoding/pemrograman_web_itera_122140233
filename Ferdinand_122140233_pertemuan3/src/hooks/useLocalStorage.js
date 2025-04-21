import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Mendapatkan item dari localStorage
      const item = window.localStorage.getItem(key);
      // Parse stored json atau kembalikan initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return fungsi wrapped yang akan memperbarui localStorage dan state
  const setValue = (value) => {
    try {
      // Izinkan value menjadi fungsi
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Simpan state
      setStoredValue(valueToStore);
      // Simpan ke localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// src/hooks/useBookStats.js
import { useMemo } from 'react';
import { useBooks, BOOK_STATUS } from '../context/BookContext';

export const useBookStats = () => {
  const { books } = useBooks();
  
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const ownedBooks = books.filter(book => book.status === BOOK_STATUS.OWNED).length;
    const readingBooks = books.filter(book => book.status === BOOK_STATUS.READING).length;
    const wishlistBooks = books.filter(book => book.status === BOOK_STATUS.WISHLIST).length;
    
    // Penulis paling populer
    const authorCounts = books.reduce((acc, book) => {
      acc[book.author] = (acc[book.author] || 0) + 1;
      return acc;
    }, {});
    
    let topAuthor = { name: 'None', count: 0 };
    Object.entries(authorCounts).forEach(([author, count]) => {
      if (count > topAuthor.count) {
        topAuthor = { name: author, count };
      }
    });
    
    return {
      totalBooks,
      ownedBooks,
      readingBooks,
      wishlistBooks,
      topAuthor
    };
  }, [books]);
  
  return stats;
}
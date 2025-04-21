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
};
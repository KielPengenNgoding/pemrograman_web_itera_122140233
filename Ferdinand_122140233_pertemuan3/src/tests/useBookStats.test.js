import { renderHook } from '@testing-library/react-hooks';
import { useBookStats } from '../hooks/useBookStats';
import { BOOK_STATUS } from '../context/BookContext';

// Mock useBooks hook
jest.mock('../context/BookContext', () => ({
  useBooks: () => ({
    books: [
      { id: '1', title: 'Book 1', author: 'Author A', status: 'owned' },
      { id: '2', title: 'Book 2', author: 'Author B', status: 'reading' },
      { id: '3', title: 'Book 3', author: 'Author A', status: 'wishlist' }
    ]
  }),
  BOOK_STATUS: {
    OWNED: 'owned',
    READING: 'reading',
    WISHLIST: 'wishlist'
  }
}));

describe('useBookStats Hook', () => {
  test('calculates book statistics correctly', () => {
    const { result } = renderHook(() => useBookStats());
    
    expect(result.current.totalBooks).toBe(3);
    expect(result.current.ownedBooks).toBe(1);
    expect(result.current.readingBooks).toBe(1);
    expect(result.current.wishlistBooks).toBe(1);
    expect(result.current.topAuthor.name).toBe('Author A');
    expect(result.current.topAuthor.count).toBe(2);
  });
});

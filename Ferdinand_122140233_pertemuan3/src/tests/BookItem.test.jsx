import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from '../components/BookList/BookItem';
import { BookProvider, BOOK_STATUS } from '../context/BookContext';

// Mock window.confirm
window.confirm = jest.fn();

// Mock useBooks hook
jest.mock('../context/BookContext', () => {
  const originalModule = jest.requireActual('../context/BookContext');
  return {
    ...originalModule,
    useBooks: () => ({
      deleteBook: jest.fn(),
      BOOK_STATUS: originalModule.BOOK_STATUS
    })
  };
});

describe('BookItem Component', () => {
  const mockBook = {
    id: '1',
    title: 'Test Book',
    author: 'Test Author',
    status: BOOK_STATUS.OWNED,
    description: 'Test description'
  };
  
  const mockOnEdit = jest.fn();
  
  test('renders book information correctly', () => {
    render(
      <BookProvider>
        <BookItem book={mockBook} onEdit={mockOnEdit} />
      </BookProvider>
    );
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('oleh Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
  });
  
  test('calls onEdit when edit button is clicked', () => {
    render(
      <BookProvider>
        <BookItem book={mockBook} onEdit={mockOnEdit} />
      </BookProvider>
    );
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockBook);
  });
  
  test('shows confirmation dialog when delete button is clicked', () => {
    window.confirm.mockReturnValueOnce(true);
    
    render(
      <BookProvider>
        <BookItem book={mockBook} onEdit={mockOnEdit} />
      </BookProvider>
    );
    
    fireEvent.click(screen.getByText('Hapus'));
    expect(window.confirm).toHaveBeenCalledWith('Anda yakin ingin menghapus buku ini?');
  });
});
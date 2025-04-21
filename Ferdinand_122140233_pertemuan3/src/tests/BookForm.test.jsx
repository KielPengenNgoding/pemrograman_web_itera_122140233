import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';
import { BookProvider } from '../context/BookContext';

// Mock untuk useBooks hook
jest.mock('../context/BookContext', () => {
  const originalModule = jest.requireActual('../context/BookContext');
  return {
    ...originalModule,
    useBooks: () => ({
      addBook: jest.fn(),
      editBook: jest.fn(),
      BOOK_STATUS: originalModule.BOOK_STATUS
    })
  };
});

describe('BookForm Component', () => {
  test('renders form with correct elements', () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );
    
    expect(screen.getByText('Tambah Buku Baru')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Penulis')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByText('Tambah Buku')).toBeInTheDocument();
  });
  
  test('shows validation errors when form is submitted with empty fields', async () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );
    
    // Submit form without filling required fields
    fireEvent.click(screen.getByText('Tambah Buku'));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
      expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    });
  });
  
  test('clears validation errors when user types in fields', async () => {
    render(
      <BookProvider>
        <BookForm />
      </BookProvider>
    );
    
    // Submit form without filling required fields to trigger validation
    fireEvent.click(screen.getByText('Tambah Buku'));
    
    // Check that validation errors are shown
    await waitFor(() => {
      expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    });
    
    // Type in title field
    fireEvent.change(screen.getByLabelText('Judul Buku'), {
      target: { value: 'Harry Potter' }
    });
    
    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Judul buku wajib diisi')).not.toBeInTheDocument();
    });
  });
});
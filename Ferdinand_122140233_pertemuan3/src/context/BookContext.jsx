import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Status buku yang tersedia
export const BOOK_STATUS = {
  OWNED: 'owned',
  READING: 'reading',
  WISHLIST: 'wishlist'
};

// Initial state
const initialState = {
  books: [],
  filteredBooks: [],
  filter: 'all',
  searchTerm: ''
};

// Action types
const actionTypes = {
  ADD_BOOK: 'ADD_BOOK',
  EDIT_BOOK: 'EDIT_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  LOAD_BOOKS: 'LOAD_BOOKS'
};

// Reducer function
const bookReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, { ...action.payload, id: Date.now().toString() }],
      };
    case actionTypes.EDIT_BOOK:
      return {
        ...state,
        books: state.books.map(book => 
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case actionTypes.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    case actionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case actionTypes.SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case actionTypes.LOAD_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const BookContext = createContext();

// Provider component
export const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useLocalStorage('books', []);
  const [state, dispatch] = useReducer(bookReducer, {
    ...initialState,
    books: storedBooks,
  });

  // Filter and search books
  const getFilteredBooks = () => {
    return state.books.filter(book => {
      const matchesFilter = state.filter === 'all' || book.status === state.filter;
      const matchesSearch = state.searchTerm === '' || 
        book.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(state.searchTerm.toLowerCase());
      
      return matchesFilter && matchesSearch;
    });
  };

  // Save books to localStorage whenever they change
  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  // Actions
  const addBook = (book) => {
    dispatch({ type: actionTypes.ADD_BOOK, payload: book });
  };

  const editBook = (book) => {
    dispatch({ type: actionTypes.EDIT_BOOK, payload: book });
  };

  const deleteBook = (id) => {
    dispatch({ type: actionTypes.DELETE_BOOK, payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: actionTypes.SET_FILTER, payload: filter });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: actionTypes.SET_SEARCH, payload: term });
  };

  const value = {
    books: state.books,
    filteredBooks: getFilteredBooks(),
    filter: state.filter,
    searchTerm: state.searchTerm,
    addBook,
    editBook,
    deleteBook,
    setFilter,
    setSearchTerm
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

BookProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use the book context
export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
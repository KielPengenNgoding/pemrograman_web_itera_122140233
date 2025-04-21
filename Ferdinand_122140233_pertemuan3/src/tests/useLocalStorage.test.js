import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../hooks/useLocalStorage';

describe('useLocalStorage Hook', () => {
  // Mock localStorage
  const mockGetItem = jest.fn();
  const mockSetItem = jest.fn();
  
  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem
      },
      writable: true
    });
  });
  
  test('returns initial value when localStorage is empty', () => {
    mockGetItem.mockReturnValueOnce(null);
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    expect(result.current[0]).toBe('initialValue');
    expect(mockGetItem).toHaveBeenCalledWith('testKey');
  });
  
  test('returns parsed value from localStorage if exists', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify(['savedValue']));
    
    const { result } = renderHook(() => useLocalStorage('testKey', []));
    
    expect(result.current[0]).toEqual(['savedValue']);
    expect(mockGetItem).toHaveBeenCalledWith('testKey');
  });
  
  test('sets value to localStorage', () => {
    mockGetItem.mockReturnValueOnce(null);
    
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    
    act(() => {
      result.current[1]('newValue');
    });
    
    expect(mockSetItem).toHaveBeenCalledWith('testKey', JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });
});
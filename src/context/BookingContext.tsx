import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Booking {
  id: string;
  date: string;
  time: string;
  guests: number;
  seating: 'indoor' | 'outdoor';
  specialRequests: string;
  createdAt: string;
}

interface BookingState {
  bookings: Booking[];
}

type BookingAction =
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'DELETE_BOOKING'; payload: string }
  | { type: 'UPDATE_BOOKING'; payload: Booking };

const BookingContext = createContext<{
  state: BookingState;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  deleteBooking: (id: string) => void;
  updateBooking: (booking: Booking) => void;
} | null>(null);

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return { bookings: action.payload };
    case 'ADD_BOOKING':
      return { bookings: [...state.bookings, action.payload] };
    case 'DELETE_BOOKING':
      return { bookings: state.bookings.filter(booking => booking.id !== action.payload) };
    case 'UPDATE_BOOKING':
      return {
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id ? action.payload : booking
        )
      };
    default:
      return state;
  }
};

// localStorage utilities
const saveToLocalStorage = (bookings: Booking[]) => {
  try {
    localStorage.setItem('littleLemonBookings', JSON.stringify(bookings));
  } catch (error) {
    console.error('Failed to save bookings to localStorage:', error);
  }
};

const loadFromLocalStorage = (): Booking[] => {
  try {
    const saved = localStorage.getItem('littleLemonBookings');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load bookings from localStorage:', error);
    return [];
  }
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, { bookings: [] });

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = loadFromLocalStorage();
    dispatch({ type: 'SET_BOOKINGS', payload: savedBookings });
  }, []);

  // Save to localStorage whenever bookings change
  useEffect(() => {
    if (state.bookings.length >= 0) {
      saveToLocalStorage(state.bookings);
    }
  }, [state.bookings]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_BOOKING', payload: newBooking });
  };

  const deleteBooking = (id: string) => {
    dispatch({ type: 'DELETE_BOOKING', payload: id });
  };

  const updateBooking = (booking: Booking) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: booking });
  };

  return (
    <BookingContext.Provider value={{ state, addBooking, deleteBooking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
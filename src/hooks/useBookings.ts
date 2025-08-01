import { useState } from 'react';
import { Booking, BookingForm } from '../types';
import { getBookingsFromStorage, saveBookingsToStorage } from '../utils/localStorage';
import { getNextId } from '../utils/helpers';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => getBookingsFromStorage());

  const updateBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    saveBookingsToStorage(newBookings);
  };

  const handleBookingRequest = (bookingForm: BookingForm, userId: number) => {
    const newBooking: Booking = {
      id: getNextId(bookings),
      userId,
      componentId: parseInt(bookingForm.componentId),
      quantity: parseInt(bookingForm.quantity),
      requestDate: new Date().toISOString().split('T')[0],
      returnDate: bookingForm.returnDate,
      status: 'pending',
      purpose: bookingForm.purpose
    };
    
    const newBookings = [...bookings, newBooking];
    updateBookings(newBookings);
  };

  const handleBookingAction = (bookingId: number, action: 'approved' | 'rejected') => {
    const newBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: action } : b
    );
    updateBookings(newBookings);
  };

  const handleMarkReturned = (bookingId: number) => {
    const newBookings = bookings.filter(b => b.id !== bookingId);
    updateBookings(newBookings);
  };

  const removeBookingsByComponent = (componentId: number) => {
    const newBookings = bookings.filter(b => b.componentId !== componentId);
    updateBookings(newBookings);
  };

  return {
    bookings,
    handleBookingRequest,
    handleBookingAction,
    handleMarkReturned,
    removeBookingsByComponent
  };
};
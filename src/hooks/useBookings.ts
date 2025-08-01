import { useState } from 'react';
import { Booking, BookingForm } from '../types';
import { initialBookings } from '../data/mockData';
import { getNextId } from '../utils/helpers';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

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
    
    setBookings([...bookings, newBooking]);
  };

  const handleBookingAction = (bookingId: number, action: 'approved' | 'rejected') => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: action } : b
    ));
  };

  const handleMarkReturned = (bookingId: number) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  const removeBookingsByComponent = (componentId: number) => {
    setBookings(bookings.filter(b => b.componentId !== componentId));
  };

  return {
    bookings,
    handleBookingRequest,
    handleBookingAction,
    handleMarkReturned,
    removeBookingsByComponent
  };
};
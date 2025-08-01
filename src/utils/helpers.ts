import { Component, User, Booking } from '../types';

export const getComponentName = (components: Component[], id: number): string => {
  return components.find(c => c.id === id)?.name || 'Unknown';
};

export const getUserName = (users: User[], id: number): string => {
  return users.find(u => u.id === id)?.name || 'Unknown';
};

export const calculateTotalComponents = (components: Component[]): number => {
  return components.reduce((sum, c) => sum + c.total, 0);
};

export const calculateAvailableComponents = (components: Component[]): number => {
  return components.reduce((sum, c) => sum + c.available, 0);
};

export const filterBookingsByStatus = (bookings: Booking[], status: string): Booking[] => {
  return bookings.filter(b => b.status === status);
};

export const filterBookingsByUser = (bookings: Booking[], userId: number): Booking[] => {
  return bookings.filter(b => b.userId === userId);
};

export const isBookingOverdue = (returnDate: string): boolean => {
  return new Date(returnDate) < new Date();
};

export const getNextId = (items: { id: number }[]): number => {
  return Math.max(...items.map(item => item.id)) + 1;
};
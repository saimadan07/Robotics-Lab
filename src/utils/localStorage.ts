// localStorage utility functions for data persistence

const STORAGE_KEYS = {
  USERS: 'robotics_users',
  COMPONENTS: 'robotics_components',
  BOOKINGS: 'robotics_bookings'
};

// Generic localStorage functions
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage for key ${key}:`, error);
  }
};

// Specific data access functions
export const getUsersFromStorage = () => {
  return getFromStorage(STORAGE_KEYS.USERS, []);
};

export const saveUsersToStorage = (users: any[]) => {
  saveToStorage(STORAGE_KEYS.USERS, users);
};

export const getComponentsFromStorage = () => {
  return getFromStorage(STORAGE_KEYS.COMPONENTS, []);
};

export const saveComponentsToStorage = (components: any[]) => {
  saveToStorage(STORAGE_KEYS.COMPONENTS, components);
};

export const getBookingsFromStorage = () => {
  return getFromStorage(STORAGE_KEYS.BOOKINGS, []);
};

export const saveBookingsToStorage = (bookings: any[]) => {
  saveToStorage(STORAGE_KEYS.BOOKINGS, bookings);
};

// Initialize storage with default data if empty
export const initializeStorage = () => {
  const users = getUsersFromStorage();
  const components = getComponentsFromStorage();
  const bookings = getBookingsFromStorage();

  // Import default data
  const { initialUsers, initialComponents, initialBookings } = require('../data/mockData');

  // Initialize with default data if storage is empty
  if (users.length === 0) {
    saveUsersToStorage(initialUsers);
  }
  
  if (components.length === 0) {
    saveComponentsToStorage(initialComponents);
  }
  
  if (bookings.length === 0) {
    saveBookingsToStorage(initialBookings);
  }
};

// Clear all data (useful for development/testing)
export const clearAllStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.COMPONENTS);
  localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
};
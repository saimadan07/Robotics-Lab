import { User, Component, Booking } from '../types';

export const initialUsers: User[] = [
  { id: 1, rollNo: 'ADM001', name: 'Admin User', role: 'admin', password: 'admin123' }
];

export const initialComponents: Component[] = [
  { id: 1, name: 'Arduino Uno R3', category: 'Microcontroller', available: 15, total: 20, description: 'Development board' },
  { id: 2, name: 'Raspberry Pi 4', category: 'Single Board Computer', available: 8, total: 10, description: '8GB RAM model' },
  { id: 3, name: 'Servo Motor SG90', category: 'Actuator', available: 25, total: 30, description: '9g micro servo' },
  { id: 4, name: 'Ultrasonic Sensor HC-SR04', category: 'Sensor', available: 12, total: 15, description: 'Distance sensor' },
  { id: 5, name: 'DC Motor 12V', category: 'Actuator', available: 6, total: 10, description: 'High torque motor' }
];

export const initialBookings: Booking[] = [
  {
    id: 1, 
    userId: 1, 
    componentId: 1, 
    quantity: 2, 
    requestDate: '2025-01-28',
    returnDate: '2025-02-15', 
    status: 'pending', 
    purpose: 'Line following robot project'
  }
];